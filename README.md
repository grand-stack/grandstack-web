# grandstack-web

A movie and people search app for grandstack-server (GraphQL over Neo4j), built to show what a GraphQL-on-Neo4j front end can look like, and to be adapted to your own data. React, Vite and urql, with every operation typed from the schema by GraphQL Code Generator.

- Faceted filters with live counts (genre, decade, rating, runtime, cast or director), kept in the URL so results are shareable
- Grid or list results, sorting, and side-by-side compare of up to 4 movies
- A people browser, and person pages with stats, filmography, frequent collaborators and a career graph
- Movie pages with an interactive graph and graph-powered recommendations
- Create, edit and delete movies and people, including genres, directors and cast with roles (people can be created inline)
- Dark and light themes, responsive down to phone width, posters and avatars generated in the browser (no image files)

> **No authentication yet.** Anyone who can reach the app can create, edit and delete data.

## Run it

The web app needs the server and Neo4j, so the easiest way is the `grandstack` umbrella repo: `docker compose up --build`, then open http://localhost:3000.

For development, with the server already running on port 4000:

```sh
npm ci
npm run dev        # http://localhost:3000
```

Set `VITE_GRAPHQL_URL` to use a different server (it must be reachable from the browser).

## Documentation

| Read | To learn |
| --- | --- |
| [Architecture](docs/architecture.md) | Stack, folder map, routes, how URL state and data flow, build and deploy |
| [Features](docs/features.md) | How each feature works and where the code is |
| [Customising](docs/customising.md) | Theme, posters, what is generic, the Needle licence note |
| [Recipes](docs/recipes.md) | Step-by-step common changes |
| [Testing](docs/testing.md) | Type checks, codegen, unit tests, browser checks |
| [e2e/README.md](e2e/README.md) | Running the browser end-to-end checks |

`npm ci` prints `npm warn install-scripts` notices; they are harmless.

Working with a coding agent? Start with [AGENTS.md](AGENTS.md).

The movie data is sample data with approximate ratings. Last verified: v0.5.1 against grandstack-server v0.7.1.

## Licence

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE). The same licence applies to every GRANDstack repository and to [grandstack.ai](https://grandstack.ai).
