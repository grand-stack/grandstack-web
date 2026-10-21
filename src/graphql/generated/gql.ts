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
    "\n  mutation DeleteMovie($title: String!) {\n    deleteMovies(where: { title: { eq: $title } }) { nodesDeleted }\n  }\n": typeof types.DeleteMovieDocument,
    "\n  mutation DeletePerson($name: String!) {\n    deletePeople(where: { name: { eq: $name } }) { nodesDeleted }\n  }\n": typeof types.DeletePersonDocument,
    "\n  query PersonSearch($where: PersonWhere) {\n    people(where: $where, limit: 8, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n": typeof types.PersonSearchDocument,
    "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n": typeof types.CompareDocument,
    "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    prolific: people(sort: [{ actedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    directing: people(sort: [{ directedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n": typeof types.HomeDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n": typeof types.MovieDocument,
    "\n  query MovieForEdit($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      tagline\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n    genres(sort: [{ name: ASC }]) { name }\n  }\n": typeof types.MovieForEditDocument,
    "\n  mutation UpdateMovie($title: String!, $update: MovieUpdateInput) {\n    updateMovies(where: { title: { eq: $title } }, update: $update) { movies { title } }\n  }\n": typeof types.UpdateMovieDocument,
    "\n  query Genres { genres(sort: [{ name: ASC }]) { name } }\n": typeof types.GenresDocument,
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) { movies { title } }\n  }\n": typeof types.CreateMovieDocument,
    "\n  query PeopleBrowse($where: PersonWhere, $roleWhere: PersonWhere!, $sort: [PersonSort!], $limit: Int!) {\n    people(where: $where, sort: $sort, limit: $limit) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n    peopleConnection(where: $where) { totalCount }\n    anyRole: peopleConnection(where: $roleWhere) { totalCount }\n    actors: peopleConnection(where: { AND: [$roleWhere, { actedCount: { gt: 0 } }] }) { totalCount }\n    directors: peopleConnection(where: { AND: [$roleWhere, { directedCount: { gt: 0 } }] }) { totalCount }\n  }\n": typeof types.PeopleBrowseDocument,
    "\n  query Person($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n      actedIn { title released rating runtime genres { name } }\n      directed { title released rating runtime genres { name } }\n      collaborators(limit: 8) { name films }\n    }\n  }\n": typeof types.PersonDocument,
    "\n  query PersonForEdit($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n  }\n": typeof types.PersonForEditDocument,
    "\n  mutation UpdatePerson($name: String!, $update: PersonUpdateInput) {\n    updatePeople(where: { name: { eq: $name } }, update: $update) { people { name } }\n  }\n": typeof types.UpdatePersonDocument,
    "\n  mutation CreatePerson($input: [PersonCreateInput!]!) {\n    createPeople(input: $input) { people { name } }\n  }\n": typeof types.CreatePersonDocument,
    "\n  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {\n    movies(where: $where, sort: $sort, limit: $limit) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n    }\n    moviesConnection(where: $where) { totalCount }\n    genres(sort: [{ name: ASC }]) {\n      name\n      moviesConnection(where: { node: $genreWhere }) { totalCount }\n    }\n    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }\n    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }\n    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }\n    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }\n    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }\n    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }\n    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }\n    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }\n    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }\n  }\n": typeof types.ResultsDocument,
    "\n  query People($search: String!) {\n    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n": typeof types.PeopleDocument,
};
const documents: Documents = {
    "\n  mutation DeleteMovie($title: String!) {\n    deleteMovies(where: { title: { eq: $title } }) { nodesDeleted }\n  }\n": types.DeleteMovieDocument,
    "\n  mutation DeletePerson($name: String!) {\n    deletePeople(where: { name: { eq: $name } }) { nodesDeleted }\n  }\n": types.DeletePersonDocument,
    "\n  query PersonSearch($where: PersonWhere) {\n    people(where: $where, limit: 8, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n": types.PersonSearchDocument,
    "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n": types.CompareDocument,
    "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    prolific: people(sort: [{ actedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    directing: people(sort: [{ directedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n": types.HomeDocument,
    "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n": types.MovieDocument,
    "\n  query MovieForEdit($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      tagline\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n    genres(sort: [{ name: ASC }]) { name }\n  }\n": types.MovieForEditDocument,
    "\n  mutation UpdateMovie($title: String!, $update: MovieUpdateInput) {\n    updateMovies(where: { title: { eq: $title } }, update: $update) { movies { title } }\n  }\n": types.UpdateMovieDocument,
    "\n  query Genres { genres(sort: [{ name: ASC }]) { name } }\n": types.GenresDocument,
    "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) { movies { title } }\n  }\n": types.CreateMovieDocument,
    "\n  query PeopleBrowse($where: PersonWhere, $roleWhere: PersonWhere!, $sort: [PersonSort!], $limit: Int!) {\n    people(where: $where, sort: $sort, limit: $limit) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n    peopleConnection(where: $where) { totalCount }\n    anyRole: peopleConnection(where: $roleWhere) { totalCount }\n    actors: peopleConnection(where: { AND: [$roleWhere, { actedCount: { gt: 0 } }] }) { totalCount }\n    directors: peopleConnection(where: { AND: [$roleWhere, { directedCount: { gt: 0 } }] }) { totalCount }\n  }\n": types.PeopleBrowseDocument,
    "\n  query Person($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n      actedIn { title released rating runtime genres { name } }\n      directed { title released rating runtime genres { name } }\n      collaborators(limit: 8) { name films }\n    }\n  }\n": types.PersonDocument,
    "\n  query PersonForEdit($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n  }\n": types.PersonForEditDocument,
    "\n  mutation UpdatePerson($name: String!, $update: PersonUpdateInput) {\n    updatePeople(where: { name: { eq: $name } }, update: $update) { people { name } }\n  }\n": types.UpdatePersonDocument,
    "\n  mutation CreatePerson($input: [PersonCreateInput!]!) {\n    createPeople(input: $input) { people { name } }\n  }\n": types.CreatePersonDocument,
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
export function graphql(source: "\n  mutation DeleteMovie($title: String!) {\n    deleteMovies(where: { title: { eq: $title } }) { nodesDeleted }\n  }\n"): (typeof documents)["\n  mutation DeleteMovie($title: String!) {\n    deleteMovies(where: { title: { eq: $title } }) { nodesDeleted }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePerson($name: String!) {\n    deletePeople(where: { name: { eq: $name } }) { nodesDeleted }\n  }\n"): (typeof documents)["\n  mutation DeletePerson($name: String!) {\n    deletePeople(where: { name: { eq: $name } }) { nodesDeleted }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PersonSearch($where: PersonWhere) {\n    people(where: $where, limit: 8, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query PersonSearch($where: PersonWhere) {\n    people(where: $where, limit: 8, sort: [{ name: ASC }]) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Compare($titles: [String!]) {\n    movies(where: { title: { in: $titles } }) {\n      title\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection(first: 8) {\n        edges { node { name } }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    prolific: people(sort: [{ actedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    directing: people(sort: [{ directedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n"): (typeof documents)["\n  query Home {\n    total: moviesConnection { totalCount }\n    people: peopleConnection { totalCount }\n    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }\n    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n    prolific: people(sort: [{ actedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    directing: people(sort: [{ directedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }\n    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movie($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      released\n      rating\n      runtime\n      tagline\n      genres { name }\n      directors { name }\n      actorsConnection(first: 12) {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n      similar(limit: 8) {\n        title\n        released\n        rating\n        runtime\n        genres { name }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MovieForEdit($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      tagline\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n    genres(sort: [{ name: ASC }]) { name }\n  }\n"): (typeof documents)["\n  query MovieForEdit($title: String!) {\n    movies(where: { title: { eq: $title } }) {\n      title\n      tagline\n      released\n      rating\n      runtime\n      genres { name }\n      directors { name }\n      actorsConnection {\n        edges {\n          properties { roles }\n          node { name }\n        }\n      }\n    }\n    genres(sort: [{ name: ASC }]) { name }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMovie($title: String!, $update: MovieUpdateInput) {\n    updateMovies(where: { title: { eq: $title } }, update: $update) { movies { title } }\n  }\n"): (typeof documents)["\n  mutation UpdateMovie($title: String!, $update: MovieUpdateInput) {\n    updateMovies(where: { title: { eq: $title } }, update: $update) { movies { title } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Genres { genres(sort: [{ name: ASC }]) { name } }\n"): (typeof documents)["\n  query Genres { genres(sort: [{ name: ASC }]) { name } }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) { movies { title } }\n  }\n"): (typeof documents)["\n  mutation CreateMovie($input: [MovieCreateInput!]!) {\n    createMovies(input: $input) { movies { title } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PeopleBrowse($where: PersonWhere, $roleWhere: PersonWhere!, $sort: [PersonSort!], $limit: Int!) {\n    people(where: $where, sort: $sort, limit: $limit) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n    peopleConnection(where: $where) { totalCount }\n    anyRole: peopleConnection(where: $roleWhere) { totalCount }\n    actors: peopleConnection(where: { AND: [$roleWhere, { actedCount: { gt: 0 } }] }) { totalCount }\n    directors: peopleConnection(where: { AND: [$roleWhere, { directedCount: { gt: 0 } }] }) { totalCount }\n  }\n"): (typeof documents)["\n  query PeopleBrowse($where: PersonWhere, $roleWhere: PersonWhere!, $sort: [PersonSort!], $limit: Int!) {\n    people(where: $where, sort: $sort, limit: $limit) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n    peopleConnection(where: $where) { totalCount }\n    anyRole: peopleConnection(where: $roleWhere) { totalCount }\n    actors: peopleConnection(where: { AND: [$roleWhere, { actedCount: { gt: 0 } }] }) { totalCount }\n    directors: peopleConnection(where: { AND: [$roleWhere, { directedCount: { gt: 0 } }] }) { totalCount }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Person($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n      actedIn { title released rating runtime genres { name } }\n      directed { title released rating runtime genres { name } }\n      collaborators(limit: 8) { name films }\n    }\n  }\n"): (typeof documents)["\n  query Person($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n      actedIn { title released rating runtime genres { name } }\n      directed { title released rating runtime genres { name } }\n      collaborators(limit: 8) { name films }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PersonForEdit($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n  }\n"): (typeof documents)["\n  query PersonForEdit($name: String!) {\n    people(where: { name: { eq: $name } }) {\n      name\n      born\n      actedCount\n      directedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePerson($name: String!, $update: PersonUpdateInput) {\n    updatePeople(where: { name: { eq: $name } }, update: $update) { people { name } }\n  }\n"): (typeof documents)["\n  mutation UpdatePerson($name: String!, $update: PersonUpdateInput) {\n    updatePeople(where: { name: { eq: $name } }, update: $update) { people { name } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePerson($input: [PersonCreateInput!]!) {\n    createPeople(input: $input) { people { name } }\n  }\n"): (typeof documents)["\n  mutation CreatePerson($input: [PersonCreateInput!]!) {\n    createPeople(input: $input) { people { name } }\n  }\n"];
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