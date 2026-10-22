// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
// Browser end-to-end checks. Needs the whole stack running (see e2e/README.md).
const B = process.env.BASE_URL ?? "http://localhost:3000";
const GRAPHQL = process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql";
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = process.env.OUT; // optional directory for screenshots
if (OUT) mkdirSync(OUT, { recursive: true });
const shot = async (name) => { if (OUT) await page.screenshot({ path: `${OUT}/${name}.png` }); };
const LAUNCH = () => puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
let browser = await LAUNCH();
let gotos = 0;
const problems = [];
const flaky = [];
let page;
// This environment's headless Chrome dies after about 14 page loads, so relaunch it regularly
async function freshPage(relaunch = false) {
  if (relaunch) { await browser.close().catch(() => {}); browser = await LAUNCH(); gotos = 0; }
  else if (page) await page.close().catch(() => {});
  page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 900 });
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) problems.push(`console.${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => { if (r.failure()?.errorText !== "net::ERR_ABORTED") problems.push(`requestfailed: ${r.failure()?.errorText} ${r.url().slice(0, 60)}`); });
  page.on("error", (e) => flaky.push("PAGE CRASHED " + e.message));
  const raw = page.goto.bind(page);
  page.goto = async (...a) => { if (++gotos > 7) { const url = page.url(); await freshPage(true); return page.goto(...a); } for (let i = 0; i < 3; i++) { try { return await raw(...a); } catch (e) { if (i === 2) throw e; flaky.push(String(e).slice(0, 80) + " " + a[0]); await new Promise((r) => setTimeout(r, 500)); } } };
}
await freshPage();
const results = [];
process.on('uncaughtException', (e) => { console.log(results.join('\n')); console.log('CRASH', e.message, page.url()); console.log('PROBLEMS', [...new Set(problems)].join('\n')); process.exit(1); });
const check = (name, ok, extra = "") => { results.push(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`); };
const text = (sel) => page.$eval(sel, (e) => e.textContent.trim());
const fill = async (el, v) => { await el.evaluate((e) => { e.focus(); e.select(); }); await page.keyboard.press('Backspace'); if (v) await el.type(v); };
// SETTLE_SCALE stretches every fixed pause (CI machines are slower than a laptop; integration.sh sets it)
const SETTLE_SCALE = Number(process.env.SETTLE_SCALE ?? 1);
const settle = (ms = 700) => new Promise((r) => setTimeout(r, ms * SETTLE_SCALE));

await page.goto(B, { waitUntil: "networkidle0" });
check("home shows cards", (await page.$$(".card")).length >= 10);
await page.goto(`${B}/movies`, { waitUntil: "networkidle0" });
check("results total 152", (await text(".results-count")).startsWith("152"), await text(".results-count"));

// genre filter
await page.evaluate(() => [...document.querySelectorAll(".check")].find((l) => l.textContent.startsWith("Drama")).querySelector("input").click());
await settle();
check("genre in URL", page.url().includes("g=Drama"), page.url());
const dramaCount = parseInt(await text(".results-count"));
check("drama count 75", dramaCount === 75, String(dramaCount));
await page.evaluate(() => [...document.querySelectorAll(".check")].find((l) => l.textContent.startsWith("1990s")).querySelector("input").click());
await settle();
const filtered = await text(".results-count");
check("decade narrows results", parseInt(filtered) < 75 && parseInt(filtered) > 0, filtered);
check("chips shown", (await page.$$(".chips .chip")).length >= 2);
const url = page.url();
await page.goto(url, { waitUntil: "networkidle0" });
check("reload keeps results", (await text(".results-count")) === filtered);
// rating slider via keyboard
await page.focus('input[aria-label="Minimum rating"]');
for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight");
await settle();
check("rating filter in URL", /[?&]r=/.test(page.url()), page.url());
// person typeahead
await page.type('input[aria-label="Search for a cast member or director"]', "Hanks");
await page.waitForSelector(".suggest button");
await page.click(".suggest button");
await settle();
check("person filter applied", page.url().includes("p=Tom"), page.url());
// clear all
await page.evaluate(() => [...document.querySelectorAll(".chips button")].find((b) => b.textContent === "Clear all").click());
await settle();
check("clear all resets", (await text(".results-count")).startsWith("152"));

// compare
await page.evaluate(() => document.querySelectorAll(".compare-toggle input")[0].click());
await page.evaluate(() => document.querySelectorAll(".compare-toggle input")[1].click());
await page.evaluate(() => document.querySelectorAll(".compare-toggle input")[2].click());
await settle();
check("tray shows 3", (await text(".tray")).includes("3 of 4"), await text(".tray"));
await page.evaluate(() => [...document.querySelectorAll(".tray button")].find((b) => b.textContent === "Compare").click());
await page.waitForSelector(".compare-table");
await settle();
check("compare table 3 columns", (await page.$$(".compare-table thead th")).length === 4);
await shot("compare");

// search to detail
await page.goto(B, { waitUntil: "networkidle0" });
await page.type(".header-search input", "Inception");
await page.keyboard.press("Enter");
await page.waitForSelector(".card");
await settle(1200);
await page.evaluate(() => document.querySelector(".card .card-title").click());
await page.waitForSelector(".detail canvas", { timeout: 8000 }).then(() => check("graph canvas rendered", true), () => check("graph canvas rendered", false));
check("recommendations shown", (await page.$$(".detail .row .card")).length >= 3);

await freshPage();
// ---- CRUD ----
const gql = async (query, variables) => (await (await fetch(GRAPHQL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query, variables }) })).json()).data;
const actedCount = async (n) => (await gql(`{ people(where:{name:{eq:${JSON.stringify(n)}}}){ actedCount directedCount } }`)).people[0];
const pick = async (label, text, optionText) => {
  await page.click(`input[aria-label="${label}"]`);
  await page.type(`input[aria-label="${label}"]`, text);
  await page.waitForFunction((t) => [...document.querySelectorAll('[role="option"]')].some((o) => o.textContent.includes(t)), { timeout: 6000 }, optionText);
  await page.evaluate((t) => [...document.querySelectorAll('[role="option"] button')].find((o) => o.textContent.includes(t)).click(), optionText);
};
const hanksBefore = (await actedCount("Tom Hanks")).actedCount;
const megBefore = (await actedCount("Meg Ryan")).actedCount;
const T1 = "ZZ E2E Film", T2 = "ZZ E2E Film Renamed";

await page.goto(`${B}/movies/new`, { waitUntil: "networkidle0" });
check("public edit banner shown", (await page.$(".banner")) !== null);
// validation
await page.click('button[type="submit"]');
await page.waitForSelector("#err-title");
check("empty title blocked", (await text("#err-title")).includes("required"));
await settle(200);
check("focus moves to invalid field", (await page.evaluate(() => document.activeElement?.getAttribute("aria-invalid"))) === "true");
await page.type('input[aria-invalid="true"]', T1);
await page.type('input[aria-label="Rating (0-10)"], label:has(> input) input', "").catch(() => {});
const inputs = await page.$$(".form-row input");
await inputs[0].type("2024"); await inputs[1].type("11"); await inputs[2].type("100");
await page.click('button[type="submit"]');
await page.waitForSelector("#err-rating");
check("rating over 10 blocked", (await text("#err-rating")).includes("between"));
await fill(inputs[1], "7.5");
await page.type(".form > label:nth-of-type(2) input", "A test tagline");
await page.evaluate(() => [...document.querySelectorAll(".chip-button")].find((c) => c.textContent === "Drama").click());
await page.type('input[aria-label="New genre name"]', "ZZ Genre");
await page.keyboard.press("Enter");
await pick("Add a director", "Nora Eph", "Nora Ephron");
await pick("Add a director", "ZZ Director", "Create new person");
await pick("Add a cast member", "Tom Han", "Tom Hanks");
await page.type('input[aria-label="Role for Tom Hanks"]', "Hero");
await pick("Add a cast member", "ZZ Actor", "Create new person");
await page.type('input[aria-label="Role for ZZ Actor"]', "Villain; Boss");
await page.click('button[type="submit"]');
await page.waitForFunction((t) => location.pathname === `/movies/${encodeURIComponent(t)}`, { timeout: 10000 }, T1).then(() => check("create navigates to new movie", true), async () => check("create navigates to new movie", false, page.url() + " " + JSON.stringify(await page.$$eval(".field-error, .error, .pick-list li", (e) => e.map((x) => x.textContent.slice(0, 60)))) + " VALUES " + JSON.stringify(await page.$$eval(".form input", (e) => e.map((x) => x.value)))));
await settle(800);
const detail = await page.evaluate(() => document.body.innerText);
check("new movie shows genres", detail.includes("Drama") && detail.includes("ZZ Genre"));
check("new movie shows directors", detail.includes("Nora Ephron") && detail.includes("ZZ Director"));
check("new movie shows roles", detail.includes("as Hero") && detail.includes("as Villain, Boss"));
check("existing person count +1 immediately", (await actedCount("Tom Hanks")).actedCount === hanksBefore + 1);
const zz = await actedCount("ZZ Actor");
check("new person counts correct", zz.actedCount === 1 && zz.directedCount === 0, JSON.stringify(zz));
check("new director counts correct", (await actedCount("ZZ Director")).directedCount === 1);

// duplicate title
await page.goto(`${B}/movies/new`, { waitUntil: "networkidle0" });
await page.type(".form > label:nth-of-type(1) input", "The Matrix");
await page.click('button[type="submit"]');
await page.waitForSelector(".form .error", { timeout: 8000 }).then(async () => check("duplicate title friendly error", (await text(".form .error")).includes("already exists"), await text(".form .error")), () => check("duplicate title friendly error", false));

// edit
await page.goto(`${B}/movies/${encodeURIComponent(T1)}/edit`, { waitUntil: "networkidle0" });
await page.waitForSelector('input[aria-label="Role for ZZ Actor"]');
check("edit form prefilled", (await page.$eval('input[aria-label="Role for ZZ Actor"]', (e) => e.value)) === "Villain; Boss");
await page.click('button[aria-label="Remove ZZ Actor from cast"]');
await pick("Add a cast member", "Meg Ry", "Meg Ryan");
await page.type('input[aria-label="Role for Meg Ryan"]', "Lead");
await fill(await page.$('input[aria-label="Role for Tom Hanks"]'), "Hero Reborn");
const titleInput = await page.$(".form > label:nth-of-type(1) input"); await fill(titleInput, T2);
await page.click('button[type="submit"]');
await page.waitForFunction((t) => location.pathname === `/movies/${encodeURIComponent(t)}`, { timeout: 10000 }, T2).then(() => check("rename lands on new URL", true), async () => { await page.setViewport({ width: 1300, height: 2200 }); await shot("editfail"); check("rename lands on new URL", false, page.url() + " " + JSON.stringify(await page.$$eval(".field-error, .error", (e) => e.map((x) => x.textContent))) + JSON.stringify(await page.$$eval(".form input", (e) => e.map((x) => x.value)))); });
await settle(800);
const edited = await page.evaluate(() => document.body.innerText);
check("edit applied cast changes", edited.includes("Meg Ryan") && edited.includes("as Hero Reborn") && !edited.includes("ZZ Actor"));
check("removed person count back to 0", (await actedCount("ZZ Actor")).actedCount === 0);
check("added person count +1", (await actedCount("Meg Ryan")).actedCount === megBefore + 1);
check("old title gone", (await gql(`{ movies(where:{title:{eq:${JSON.stringify(T1)}}}){ title } }`)).movies.length === 0);

// delete: Esc cancels, then confirm
await page.goto(`${B}/movies/${encodeURIComponent(T2)}/edit`, { waitUntil: "networkidle0" });
await page.waitForSelector(".form-actions .btn-danger");
await page.click(".form-actions .btn-danger");
await page.waitForSelector("dialog[open]");
await page.keyboard.press("Escape");
await settle(300);
check("Esc cancels delete dialog", (await page.$("dialog[open]")) === null && page.url().includes("/edit"));
await page.click(".form-actions .btn-danger");
await page.waitForSelector("dialog[open]");
await page.evaluate(() => document.querySelector("dialog[open] .btn-danger").click());
await page.waitForFunction(() => location.pathname === "/movies", { timeout: 8000 }).then(() => check("delete navigates to results", true), () => check("delete navigates to results", false, page.url()));
check("deleted movie is gone", (await gql(`{ movies(where:{title:{eq:${JSON.stringify(T2)}}}){ title } }`)).movies.length === 0);
check("counts restored after delete", (await actedCount("Tom Hanks")).actedCount === hanksBefore && (await actedCount("Meg Ryan")).actedCount === megBefore);
await page.goto(`${B}/movies/${encodeURIComponent(T2)}`, { waitUntil: "networkidle0" });
check("old URL shows not found", (await page.evaluate(() => document.body.innerText)).includes("Movie not found"));

// person CRUD
await page.goto(`${B}/people/new`, { waitUntil: "networkidle0" });
await page.type(".form label:nth-of-type(1) input", "ZZ Person");
await page.type(".form label:nth-of-type(2) input", "1980");
await page.click('button[type="submit"]');
await page.waitForFunction(() => location.pathname === "/people/ZZ%20Person", { timeout: 8000 }).then(() => check("create person", true), () => check("create person", false, page.url()));
// wait for the page to load the new person (a fixed pause was too short on a slow CI machine)
await page.waitForFunction(() => document.body.innerText.includes("Born 1980"), { timeout: 8000 }).catch(() => {});
check("new person shows born", (await page.evaluate(() => document.body.innerText)).includes("Born 1980"));
await page.goto(`${B}/people/ZZ%20Person/edit`, { waitUntil: "networkidle0" });
await page.waitForSelector(".form input");
const nameInput = await page.$(".form label:nth-of-type(1) input"); await fill(nameInput, "ZZ Person Renamed");
const bornInput = await page.$(".form label:nth-of-type(2) input"); await fill(bornInput, "1700");
await page.click('button[type="submit"]');
await page.waitForSelector("#err-born");
check("bad birth year blocked", true);
await fill(bornInput, "1981");
await page.click('button[type="submit"]');
await page.waitForFunction(() => location.pathname === "/people/ZZ%20Person%20Renamed", { timeout: 8000 }).then(() => check("rename person", true), () => check("rename person", false, page.url()));
await page.goto(`${B}/people/new`, { waitUntil: "networkidle0" });
await page.type(".form label:nth-of-type(1) input", "ZZ Person Renamed");
await page.click('button[type="submit"]');
await page.waitForSelector(".form .error", { timeout: 8000 }).then(async () => check("duplicate person friendly error", (await text(".form .error")).includes("already exists")), () => check("duplicate person friendly error", false));
await page.goto(`${B}/people/ZZ%20Person%20Renamed/edit`, { waitUntil: "networkidle0" });
await page.waitForSelector(".form-actions .btn-danger");
await page.click(".form-actions .btn-danger");
await page.waitForSelector("dialog[open]");
await page.evaluate(() => document.querySelector("dialog[open] .btn-danger").click());
await page.waitForFunction(() => location.pathname === "/people", { timeout: 8000 }).then(() => check("delete person navigates", true), () => check("delete person navigates", false, page.url()));
check("person deleted", (await gql(`{ people(where:{name:{eq:"ZZ Person Renamed"}}){ name } }`)).people.length === 0);
// add menu
await page.goto(B, { waitUntil: "networkidle0" });
await page.click(".menu-button");
check("add menu lists both options", (await page.$$(".menu-list a")).length === 2);
await page.evaluate(() => [...document.querySelectorAll(".menu-list a")].find((a) => a.textContent === "Add person").click());
await page.waitForFunction(() => location.pathname === "/people/new");
check("add person via menu", true);
check("legacy /new redirects", await page.goto(`${B}/new`, { waitUntil: "networkidle0" }).then(() => page.url().endsWith("/movies/new")));

// cleanup test leftovers
await gql(`mutation { deletePeople(where:{name:{startsWith:"ZZ "}}){ nodesDeleted } deleteGenres(where:{name:{startsWith:"ZZ "}}){ nodesDeleted } deleteMovies(where:{title:{startsWith:"ZZ "}}){ nodesDeleted } }`);

// direct deep link (nginx SPA fallback)
const r = await page.goto(`${B}/movies/The%20Matrix`, { waitUntil: "networkidle0" });
check("deep link served", r.status() === 200 && (await text("h1")) === "The Matrix");

// theme toggle
await page.click(".theme-toggle");
check("light theme applies", (await page.evaluate(() => document.documentElement.dataset.theme)) === "light");
await page.goto(`${B}/movies?g=Sci-Fi`, { waitUntil: "networkidle0" });
await shot("light");

// narrow viewport overflow
await page.setViewport({ width: 390, height: 800, isMobile: true });
for (const p of ["/", "/movies", "/movies/Inception", "/compare"]) {
  await page.goto(B + p, { waitUntil: "networkidle0" });
  const w = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  check(`no horizontal overflow at 390px ${p}`, w[0] <= w[1], JSON.stringify(w));
}
await page.goto(`${B}/movies?g=Sci-Fi`, { waitUntil: "networkidle0" });
await shot("phone");

await freshPage();
// ---- people ----
await page.goto(`${B}/people`, { waitUntil: "networkidle0" });
check("people total 464", (await text(".results-count")).startsWith("464"), await text(".results-count"));
check("most films first (Tom Hanks)", (await text(".person-card .person-name")) === "Tom Hanks");
await page.evaluate(() => [...document.querySelectorAll(".chip-button")].find((b) => b.textContent.startsWith("Directors")).click());
await settle();
check("director filter in URL", page.url().includes("role=director"), page.url());
check("directors only", (await page.$$eval(".person-card .role-director", (e) => e.length)) === (await page.$$(".person-card")).length);
const dirCount = parseInt(await text(".results-count"));
check("87 directors", dirCount === 87, String(dirCount));
await page.type('input[aria-label="Search people by name"]', "nolan");
await settle(1000);
check("name search matches case-insensitively", (await text(".person-card .person-name")) === "Christopher Nolan");
await page.goto(`${B}/people?role=actor&mf=5`, { waitUntil: "networkidle0" });
const many = await page.$$eval(".person-card .role-actor", (els) => els.map((e) => Number(e.textContent.split("·")[1])));
check("min films honoured", many.length > 0 && many.every((n) => n >= 5), JSON.stringify(many));

await page.goto(`${B}/people/Tom%20Hanks`, { waitUntil: "networkidle0" });
check("Hanks stats films 13", (await page.$eval(".stats dd", (e) => e.textContent)) === "13");
check("Hanks filmography cards 13", (await page.$$(".person-detail .grid .card")).length === 13);
check("collaborators shown", (await page.$$(".collab")).length >= 3);
await page.waitForSelector(".person-detail canvas", { timeout: 8000 }).then(() => check("person graph canvas", true), () => check("person graph canvas", false));
await page.goto(`${B}/people/Christopher%20Nolan`, { waitUntil: "networkidle0" });
check("Nolan has no acted section", !(await page.$$eval(".section-title", (e) => e.map((x) => x.textContent))).some((t) => t.startsWith("Acted")));
check("Nolan directed 8", (await page.$$(".person-detail .grid .card")).length === 8);
// accents and apostrophes in URLs
for (const n of ["Mélanie Laurent", "Renée Zellweger", "Timothée Chalamet", "Lupita Nyong'o", "Rosie O'Donnell", "Carrie-Anne Moss", "Alejandro G. Iñárritu"]) {
  let got = "";
  for (let attempt = 0; attempt < 3 && got !== n; attempt++) {
    try {
      await page.goto(`${B}/people/${encodeURIComponent(n)}`, { waitUntil: "networkidle0" });
      await page.waitForSelector("h1", { timeout: 5000 });
      got = await page.$eval("h1", (e) => e.textContent);
    } catch (e) { flaky.push(`${n}: ${String(e).slice(0, 60)}`); await settle(500); }
  }
  check(`person page for ${n}`, got === n, got === n ? "" : got);
}
await freshPage();
// movie page -> person page -> movie page
await page.goto(`${B}/movies/Inception`, { waitUntil: "networkidle0" });
await page.evaluate(() => [...document.querySelectorAll(".cast a")].find((a) => a.textContent === "Tom Hardy").click());
await page.waitForFunction(() => location.pathname === "/people/Tom%20Hardy");
await settle(800);
check("cast link opens person page", (await text("h1")) === "Tom Hardy");
await page.evaluate(() => [...document.querySelectorAll(".person-detail .card-title")].find((a) => a.textContent === "Inception").click());
await page.waitForFunction(() => location.pathname === "/movies/Inception");
check("film link returns to movie", true);
await page.goto(B, { waitUntil: "networkidle0" });
check("home has people rows", (await page.$$(".home .person-card")).length >= 10);

await freshPage();
// people at phone width
await page.setViewport({ width: 390, height: 800, isMobile: true });
for (const p of ["/people", "/people/Tom%20Hanks"]) {
  await page.goto(B + p, { waitUntil: "networkidle0" });
  const w = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  check(`no horizontal overflow at 390px ${p}`, w[0] <= w[1], JSON.stringify(w));
}
await shot("person-phone");

console.log(results.join("\n"));
console.log("NAV RETRIES:", flaky.length, flaky.join(" | "));
console.log("PROBLEMS:", problems.length ? "\n" + [...new Set(problems)].join("\n") : "none");
await browser.close();
if (results.some((r) => r.startsWith("FAIL"))) process.exitCode = 1;
