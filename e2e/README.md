# Browser end-to-end checks

`run.mjs` drives a real Chrome (via `puppeteer-core`) against the running stack and prints `PASS`/`FAIL` lines. It covers filtering and facet counts, URL state, compare, graph pages, the people browser, create/edit/delete of movies and people (including that stored film counts follow each change), validation messages, deep links, themes, and horizontal overflow at 390px wide.

## Run it

1. Start the stack: in the `grandstack` repo, `docker compose up --build`, and wait for the web app at http://localhost:3000.
2. Install dependencies once: `npm ci` in this repo.
3. `npm run e2e`

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_URL` | `http://localhost:3000` | Web app URL |
| `GRAPHQL_URL` | `http://localhost:4000/graphql` | Used to read counts and clean up test data |
| `CHROME_PATH` | macOS Google Chrome path | Chrome or Chromium executable (set it on Linux, for example `/usr/bin/chromium`) |
| `OUT` | unset | Directory to write screenshots to |

The script exits non-zero if a check fails or the run crashes.

## Things to know

- **It is tied to the bundled sample data** (152 movies, 464 people, specific people such as Tom Hanks). Run it against a freshly seeded database. It creates records whose names start with `ZZ` and deletes them at the end; if a run is interrupted, delete anything starting with `ZZ` with a GraphQL `deleteMovies`/`deletePeople`/`deleteGenres` mutation.
- **It relaunches Chrome every few navigations.** In the environment this was built in, headless Chrome died after about 14 page loads even with a tiny JavaScript heap (so not an application leak). Each page load beyond a handful starts a fresh browser to avoid it. If your Chrome is stable you can raise the limit near the top of `run.mjs`.
- **It writes data.** There is no authentication, so it works, but do not point it at a database you care about.

`SETTLE_SCALE` (default 1) multiplies every fixed pause in the script; set it higher on a slow machine (the integration workflow uses 3 on CI).
