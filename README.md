# grandstack-web

A movie search, filter and compare app for [grandstack-server](../grandstack-server), built to show GraphQL on Neo4j.

- Faceted filters with live counts (genre, decade, rating, runtime, cast or director), URL-synced so results are shareable
- Grid or list results, sorting, and side-by-side compare of up to 4 movies
- A People browser (search, role filter, min films) and person pages with stats, filmography, frequent collaborators and a career graph
- Movie pages with an interactive graph of cast, director and genres, and graph-powered recommendations
- Create, edit and delete movies and people, including genres, directors and cast with roles (people can be created inline). There is no authentication yet, so anyone can change the data
- Dark and light themes, responsive down to phone width
- Operations are typed end to end by GraphQL Code Generator; the poster art is generated, so there are no image assets

Run it with the rest of the stack from the [grandstack](../grandstack) repo (`docker compose up --build`, then open http://localhost:3000). See [AGENTS.md](AGENTS.md) for development, codegen and the design-system licence note. The movie data is sample data with approximate ratings.
