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
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n": typeof types.CreateMovieDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n  }\n": typeof types.MovieDocument,
    "\n  query Movies($search: String!) {\n    movies(where: { title: { contains: $search } }, sort: [{ title: ASC }]) {\n      title\n      released\n      tagline\n    }\n  }\n": typeof types.MoviesDocument,
};
const documents: Documents = {
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n": types.CreateMovieDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n  }\n": types.MovieDocument,
    "\n  query Movies($search: String!) {\n    movies(where: { title: { contains: $search } }, sort: [{ title: ASC }]) {\n      title\n      released\n      tagline\n    }\n  }\n": types.MoviesDocument,
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
export function graphql(source: "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) {\n      movies { title }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movies($search: String!) {\n    movies(where: { title: { contains: $search } }, sort: [{ title: ASC }]) {\n      title\n      released\n      tagline\n    }\n  }\n"): (typeof documents)["\n  query Movies($search: String!) {\n    movies(where: { title: { contains: $search } }, sort: [{ title: ASC }]) {\n      title\n      released\n      tagline\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;