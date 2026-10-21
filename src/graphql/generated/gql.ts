/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n": typeof types.CompareDocument,
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n": typeof types.CreateMovieDocument,
    "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n": typeof types.HomeDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n": typeof types.MovieDocument,
    "\n  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {\n    movies(where: $where, sort: $sort, limit: $limit) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n    }\n    moviesConnection(where: $where) { totalCount }\n    genres(sort: [{ name: ASC }]) {\n      name\n      moviesConnection(where: { node: $genreWhere }) { totalCount }\n    }\n    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }\n    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }\n    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }\n    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }\n    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }\n    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }\n    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }\n    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }\n    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }\n  }\n": typeof types.ResultsDocument,
    "\n  query People($search: String!) {\n    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n": typeof types.PeopleDocument,
};
const documents: Documents = {
    "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n": types.CompareDocument,
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n": types.CreateMovieDocument,
    "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n": types.HomeDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n": types.MovieDocument,
    "\n  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {\n    movies(where: $where, sort: $sort, limit: $limit) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n    }\n    moviesConnection(where: $where) { totalCount }\n    genres(sort: [{ name: ASC }]) {\n      name\n      moviesConnection(where: { node: $genreWhere }) { totalCount }\n    }\n    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }\n    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }\n    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }\n    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }\n    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }\n    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }\n    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }\n    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }\n    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }\n  }\n": types.ResultsDocument,
    "\n  query People($search: String!) {\n    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n": types.PeopleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n"): (typeof documents)["\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {\n    movies(where: $where, sort: $sort, limit: $limit) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n    }\n    moviesConnection(where: $where) { totalCount }\n    genres(sort: [{ name: ASC }]) {\n      name\n      moviesConnection(where: { node: $genreWhere }) { totalCount }\n    }\n    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }\n    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }\n    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }\n    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }\n    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }\n    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }\n    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }\n    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }\n    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }\n  }\n"): (typeof documents)["\n  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {\n    movies(where: $where, sort: $sort, limit: $limit) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n    }\n    moviesConnection(where: $where) { totalCount }\n    genres(sort: [{ name: ASC }]) {\n      name\n      moviesConnection(where: { node: $genreWhere }) { totalCount }\n    }\n    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }\n    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }\n    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }\n    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }\n    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }\n    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }\n    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }\n    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }\n    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query People($search: String!) {\n    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query People($search: String!) {\n    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;