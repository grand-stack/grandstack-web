/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ActedInCreateInput = {
  roles: Array<string>;
};

export type ActedInUpdateInput = {
  roles?: ListStringMutations | null | undefined;
};

export type ActedInWhere = {
  AND?: Array<ActedInWhere> | null | undefined;
  NOT?: ActedInWhere | null | undefined;
  OR?: Array<ActedInWhere> | null | undefined;
  roles?: StringListFilters | null | undefined;
};

export type ConnectionAggregationCountFilterInput = {
  edges?: IntScalarFilters | null | undefined;
  nodes?: IntScalarFilters | null | undefined;
};

/** Filters for an aggregation of a float field */
export type FloatScalarAggregationFilters = {
  average?: FloatScalarFilters | null | undefined;
  max?: FloatScalarFilters | null | undefined;
  min?: FloatScalarFilters | null | undefined;
  sum?: FloatScalarFilters | null | undefined;
};

/** Float filters */
export type FloatScalarFilters = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
};

/** Float mutations */
export type FloatScalarMutations = {
  add?: number | null | undefined;
  divide?: number | null | undefined;
  multiply?: number | null | undefined;
  set?: number | null | undefined;
  subtract?: number | null | undefined;
};

export type GenreConnectInput = {
  movies?: Array<GenreMoviesConnectFieldInput> | null | undefined;
};

export type GenreConnectWhere = {
  node: GenreWhere;
};

export type GenreCreateInput = {
  movies?: GenreMoviesFieldInput | null | undefined;
  name: string;
};

export type GenreDeleteInput = {
  movies?: Array<GenreMoviesDeleteFieldInput> | null | undefined;
};

export type GenreDisconnectInput = {
  movies?: Array<GenreMoviesDisconnectFieldInput> | null | undefined;
};

export type GenreMoviesConnectFieldInput = {
  connect?: Array<MovieConnectInput> | null | undefined;
  where?: MovieConnectWhere | null | undefined;
};

export type GenreMoviesConnectionAggregateInput = {
  AND?: Array<GenreMoviesConnectionAggregateInput> | null | undefined;
  NOT?: GenreMoviesConnectionAggregateInput | null | undefined;
  OR?: Array<GenreMoviesConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: GenreMoviesNodeAggregationWhereInput | null | undefined;
};

export type GenreMoviesConnectionFilters = {
  /** Filter Genres by aggregating results on related GenreMoviesConnections */
  aggregate?: GenreMoviesConnectionAggregateInput | null | undefined;
  /** Return Genres where all of the related GenreMoviesConnections match this filter */
  all?: GenreMoviesConnectionWhere | null | undefined;
  /** Return Genres where none of the related GenreMoviesConnections match this filter */
  none?: GenreMoviesConnectionWhere | null | undefined;
  /** Return Genres where one of the related GenreMoviesConnections match this filter */
  single?: GenreMoviesConnectionWhere | null | undefined;
  /** Return Genres where some of the related GenreMoviesConnections match this filter */
  some?: GenreMoviesConnectionWhere | null | undefined;
};

export type GenreMoviesConnectionWhere = {
  AND?: Array<GenreMoviesConnectionWhere> | null | undefined;
  NOT?: GenreMoviesConnectionWhere | null | undefined;
  OR?: Array<GenreMoviesConnectionWhere> | null | undefined;
  node?: MovieWhere | null | undefined;
};

export type GenreMoviesCreateFieldInput = {
  node: MovieCreateInput;
};

export type GenreMoviesDeleteFieldInput = {
  delete?: MovieDeleteInput | null | undefined;
  where?: GenreMoviesConnectionWhere | null | undefined;
};

export type GenreMoviesDisconnectFieldInput = {
  disconnect?: MovieDisconnectInput | null | undefined;
  where?: GenreMoviesConnectionWhere | null | undefined;
};

export type GenreMoviesFieldInput = {
  connect?: Array<GenreMoviesConnectFieldInput> | null | undefined;
  create?: Array<GenreMoviesCreateFieldInput> | null | undefined;
};

export type GenreMoviesNodeAggregationWhereInput = {
  AND?: Array<GenreMoviesNodeAggregationWhereInput> | null | undefined;
  NOT?: GenreMoviesNodeAggregationWhereInput | null | undefined;
  OR?: Array<GenreMoviesNodeAggregationWhereInput> | null | undefined;
  rating?: FloatScalarAggregationFilters | null | undefined;
  released?: IntScalarAggregationFilters | null | undefined;
  runtime?: IntScalarAggregationFilters | null | undefined;
  tagline?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
};

export type GenreMoviesUpdateConnectionInput = {
  node?: MovieUpdateInput | null | undefined;
  where?: GenreMoviesConnectionWhere | null | undefined;
};

export type GenreMoviesUpdateFieldInput = {
  connect?: Array<GenreMoviesConnectFieldInput> | null | undefined;
  create?: Array<GenreMoviesCreateFieldInput> | null | undefined;
  delete?: Array<GenreMoviesDeleteFieldInput> | null | undefined;
  disconnect?: Array<GenreMoviesDisconnectFieldInput> | null | undefined;
  update?: GenreMoviesUpdateConnectionInput | null | undefined;
};

export type GenreRelationshipFilters = {
  /** Filter type where all of the related Genres match this filter */
  all?: GenreWhere | null | undefined;
  /** Filter type where none of the related Genres match this filter */
  none?: GenreWhere | null | undefined;
  /** Filter type where one of the related Genres match this filter */
  single?: GenreWhere | null | undefined;
  /** Filter type where some of the related Genres match this filter */
  some?: GenreWhere | null | undefined;
};

export type GenreUpdateInput = {
  movies?: Array<GenreMoviesUpdateFieldInput> | null | undefined;
  name?: StringScalarMutations | null | undefined;
};

export type GenreWhere = {
  AND?: Array<GenreWhere> | null | undefined;
  NOT?: GenreWhere | null | undefined;
  OR?: Array<GenreWhere> | null | undefined;
  movies?: MovieRelationshipFilters | null | undefined;
  moviesConnection?: GenreMoviesConnectionFilters | null | undefined;
  name?: StringScalarFilters | null | undefined;
};

/** Filters for an aggregation of an int field */
export type IntScalarAggregationFilters = {
  average?: FloatScalarFilters | null | undefined;
  max?: IntScalarFilters | null | undefined;
  min?: IntScalarFilters | null | undefined;
  sum?: IntScalarFilters | null | undefined;
};

/** Int filters */
export type IntScalarFilters = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
};

/** Int mutations */
export type IntScalarMutations = {
  add?: number | null | undefined;
  set?: number | null | undefined;
  subtract?: number | null | undefined;
};

/** Mutations for a list for String */
export type ListStringMutations = {
  pop?: number | null | undefined;
  push?: Array<string> | null | undefined;
  set?: Array<string> | null | undefined;
};

export type MovieActorsConnectFieldInput = {
  connect?: Array<PersonConnectInput> | null | undefined;
  edge: ActedInCreateInput;
  where?: PersonConnectWhere | null | undefined;
};

export type MovieActorsConnectionAggregateInput = {
  AND?: Array<MovieActorsConnectionAggregateInput> | null | undefined;
  NOT?: MovieActorsConnectionAggregateInput | null | undefined;
  OR?: Array<MovieActorsConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: MovieActorsNodeAggregationWhereInput | null | undefined;
};

export type MovieActorsConnectionFilters = {
  /** Filter Movies by aggregating results on related MovieActorsConnections */
  aggregate?: MovieActorsConnectionAggregateInput | null | undefined;
  /** Return Movies where all of the related MovieActorsConnections match this filter */
  all?: MovieActorsConnectionWhere | null | undefined;
  /** Return Movies where none of the related MovieActorsConnections match this filter */
  none?: MovieActorsConnectionWhere | null | undefined;
  /** Return Movies where one of the related MovieActorsConnections match this filter */
  single?: MovieActorsConnectionWhere | null | undefined;
  /** Return Movies where some of the related MovieActorsConnections match this filter */
  some?: MovieActorsConnectionWhere | null | undefined;
};

export type MovieActorsConnectionWhere = {
  AND?: Array<MovieActorsConnectionWhere> | null | undefined;
  NOT?: MovieActorsConnectionWhere | null | undefined;
  OR?: Array<MovieActorsConnectionWhere> | null | undefined;
  edge?: ActedInWhere | null | undefined;
  node?: PersonWhere | null | undefined;
};

export type MovieActorsCreateFieldInput = {
  edge: ActedInCreateInput;
  node: PersonCreateInput;
};

export type MovieActorsDeleteFieldInput = {
  delete?: PersonDeleteInput | null | undefined;
  where?: MovieActorsConnectionWhere | null | undefined;
};

export type MovieActorsDisconnectFieldInput = {
  disconnect?: PersonDisconnectInput | null | undefined;
  where?: MovieActorsConnectionWhere | null | undefined;
};

export type MovieActorsFieldInput = {
  connect?: Array<MovieActorsConnectFieldInput> | null | undefined;
  create?: Array<MovieActorsCreateFieldInput> | null | undefined;
};

export type MovieActorsNodeAggregationWhereInput = {
  AND?: Array<MovieActorsNodeAggregationWhereInput> | null | undefined;
  NOT?: MovieActorsNodeAggregationWhereInput | null | undefined;
  OR?: Array<MovieActorsNodeAggregationWhereInput> | null | undefined;
  actedCount?: IntScalarAggregationFilters | null | undefined;
  born?: IntScalarAggregationFilters | null | undefined;
  directedCount?: IntScalarAggregationFilters | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type MovieActorsUpdateConnectionInput = {
  edge?: ActedInUpdateInput | null | undefined;
  node?: PersonUpdateInput | null | undefined;
  where?: MovieActorsConnectionWhere | null | undefined;
};

export type MovieActorsUpdateFieldInput = {
  connect?: Array<MovieActorsConnectFieldInput> | null | undefined;
  create?: Array<MovieActorsCreateFieldInput> | null | undefined;
  delete?: Array<MovieActorsDeleteFieldInput> | null | undefined;
  disconnect?: Array<MovieActorsDisconnectFieldInput> | null | undefined;
  update?: MovieActorsUpdateConnectionInput | null | undefined;
};

export type MovieConnectInput = {
  actors?: Array<MovieActorsConnectFieldInput> | null | undefined;
  directors?: Array<MovieDirectorsConnectFieldInput> | null | undefined;
  genres?: Array<MovieGenresConnectFieldInput> | null | undefined;
};

export type MovieConnectWhere = {
  node: MovieWhere;
};

export type MovieCreateInput = {
  actors?: MovieActorsFieldInput | null | undefined;
  directors?: MovieDirectorsFieldInput | null | undefined;
  genres?: MovieGenresFieldInput | null | undefined;
  rating?: number | null | undefined;
  released?: number | null | undefined;
  runtime?: number | null | undefined;
  tagline?: string | null | undefined;
  title: string;
};

export type MovieDeleteInput = {
  actors?: Array<MovieActorsDeleteFieldInput> | null | undefined;
  directors?: Array<MovieDirectorsDeleteFieldInput> | null | undefined;
  genres?: Array<MovieGenresDeleteFieldInput> | null | undefined;
};

export type MovieDirectorsConnectFieldInput = {
  connect?: Array<PersonConnectInput> | null | undefined;
  where?: PersonConnectWhere | null | undefined;
};

export type MovieDirectorsConnectionAggregateInput = {
  AND?: Array<MovieDirectorsConnectionAggregateInput> | null | undefined;
  NOT?: MovieDirectorsConnectionAggregateInput | null | undefined;
  OR?: Array<MovieDirectorsConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: MovieDirectorsNodeAggregationWhereInput | null | undefined;
};

export type MovieDirectorsConnectionFilters = {
  /** Filter Movies by aggregating results on related MovieDirectorsConnections */
  aggregate?: MovieDirectorsConnectionAggregateInput | null | undefined;
  /** Return Movies where all of the related MovieDirectorsConnections match this filter */
  all?: MovieDirectorsConnectionWhere | null | undefined;
  /** Return Movies where none of the related MovieDirectorsConnections match this filter */
  none?: MovieDirectorsConnectionWhere | null | undefined;
  /** Return Movies where one of the related MovieDirectorsConnections match this filter */
  single?: MovieDirectorsConnectionWhere | null | undefined;
  /** Return Movies where some of the related MovieDirectorsConnections match this filter */
  some?: MovieDirectorsConnectionWhere | null | undefined;
};

export type MovieDirectorsConnectionWhere = {
  AND?: Array<MovieDirectorsConnectionWhere> | null | undefined;
  NOT?: MovieDirectorsConnectionWhere | null | undefined;
  OR?: Array<MovieDirectorsConnectionWhere> | null | undefined;
  node?: PersonWhere | null | undefined;
};

export type MovieDirectorsCreateFieldInput = {
  node: PersonCreateInput;
};

export type MovieDirectorsDeleteFieldInput = {
  delete?: PersonDeleteInput | null | undefined;
  where?: MovieDirectorsConnectionWhere | null | undefined;
};

export type MovieDirectorsDisconnectFieldInput = {
  disconnect?: PersonDisconnectInput | null | undefined;
  where?: MovieDirectorsConnectionWhere | null | undefined;
};

export type MovieDirectorsFieldInput = {
  connect?: Array<MovieDirectorsConnectFieldInput> | null | undefined;
  create?: Array<MovieDirectorsCreateFieldInput> | null | undefined;
};

export type MovieDirectorsNodeAggregationWhereInput = {
  AND?: Array<MovieDirectorsNodeAggregationWhereInput> | null | undefined;
  NOT?: MovieDirectorsNodeAggregationWhereInput | null | undefined;
  OR?: Array<MovieDirectorsNodeAggregationWhereInput> | null | undefined;
  actedCount?: IntScalarAggregationFilters | null | undefined;
  born?: IntScalarAggregationFilters | null | undefined;
  directedCount?: IntScalarAggregationFilters | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type MovieDirectorsUpdateConnectionInput = {
  node?: PersonUpdateInput | null | undefined;
  where?: MovieDirectorsConnectionWhere | null | undefined;
};

export type MovieDirectorsUpdateFieldInput = {
  connect?: Array<MovieDirectorsConnectFieldInput> | null | undefined;
  create?: Array<MovieDirectorsCreateFieldInput> | null | undefined;
  delete?: Array<MovieDirectorsDeleteFieldInput> | null | undefined;
  disconnect?: Array<MovieDirectorsDisconnectFieldInput> | null | undefined;
  update?: MovieDirectorsUpdateConnectionInput | null | undefined;
};

export type MovieDisconnectInput = {
  actors?: Array<MovieActorsDisconnectFieldInput> | null | undefined;
  directors?: Array<MovieDirectorsDisconnectFieldInput> | null | undefined;
  genres?: Array<MovieGenresDisconnectFieldInput> | null | undefined;
};

export type MovieGenresConnectFieldInput = {
  connect?: Array<GenreConnectInput> | null | undefined;
  where?: GenreConnectWhere | null | undefined;
};

export type MovieGenresConnectionAggregateInput = {
  AND?: Array<MovieGenresConnectionAggregateInput> | null | undefined;
  NOT?: MovieGenresConnectionAggregateInput | null | undefined;
  OR?: Array<MovieGenresConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: MovieGenresNodeAggregationWhereInput | null | undefined;
};

export type MovieGenresConnectionFilters = {
  /** Filter Movies by aggregating results on related MovieGenresConnections */
  aggregate?: MovieGenresConnectionAggregateInput | null | undefined;
  /** Return Movies where all of the related MovieGenresConnections match this filter */
  all?: MovieGenresConnectionWhere | null | undefined;
  /** Return Movies where none of the related MovieGenresConnections match this filter */
  none?: MovieGenresConnectionWhere | null | undefined;
  /** Return Movies where one of the related MovieGenresConnections match this filter */
  single?: MovieGenresConnectionWhere | null | undefined;
  /** Return Movies where some of the related MovieGenresConnections match this filter */
  some?: MovieGenresConnectionWhere | null | undefined;
};

export type MovieGenresConnectionWhere = {
  AND?: Array<MovieGenresConnectionWhere> | null | undefined;
  NOT?: MovieGenresConnectionWhere | null | undefined;
  OR?: Array<MovieGenresConnectionWhere> | null | undefined;
  node?: GenreWhere | null | undefined;
};

export type MovieGenresCreateFieldInput = {
  node: GenreCreateInput;
};

export type MovieGenresDeleteFieldInput = {
  delete?: GenreDeleteInput | null | undefined;
  where?: MovieGenresConnectionWhere | null | undefined;
};

export type MovieGenresDisconnectFieldInput = {
  disconnect?: GenreDisconnectInput | null | undefined;
  where?: MovieGenresConnectionWhere | null | undefined;
};

export type MovieGenresFieldInput = {
  connect?: Array<MovieGenresConnectFieldInput> | null | undefined;
  create?: Array<MovieGenresCreateFieldInput> | null | undefined;
};

export type MovieGenresNodeAggregationWhereInput = {
  AND?: Array<MovieGenresNodeAggregationWhereInput> | null | undefined;
  NOT?: MovieGenresNodeAggregationWhereInput | null | undefined;
  OR?: Array<MovieGenresNodeAggregationWhereInput> | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type MovieGenresUpdateConnectionInput = {
  node?: GenreUpdateInput | null | undefined;
  where?: MovieGenresConnectionWhere | null | undefined;
};

export type MovieGenresUpdateFieldInput = {
  connect?: Array<MovieGenresConnectFieldInput> | null | undefined;
  create?: Array<MovieGenresCreateFieldInput> | null | undefined;
  delete?: Array<MovieGenresDeleteFieldInput> | null | undefined;
  disconnect?: Array<MovieGenresDisconnectFieldInput> | null | undefined;
  update?: MovieGenresUpdateConnectionInput | null | undefined;
};

export type MovieRelationshipFilters = {
  /** Filter type where all of the related Movies match this filter */
  all?: MovieWhere | null | undefined;
  /** Filter type where none of the related Movies match this filter */
  none?: MovieWhere | null | undefined;
  /** Filter type where one of the related Movies match this filter */
  single?: MovieWhere | null | undefined;
  /** Filter type where some of the related Movies match this filter */
  some?: MovieWhere | null | undefined;
};

/** Fields to sort Movies by. The order in which sorts are applied is not guaranteed when specifying many fields in one MovieSort object. */
export type MovieSort = {
  rating?: SortDirection | null | undefined;
  released?: SortDirection | null | undefined;
  runtime?: SortDirection | null | undefined;
  tagline?: SortDirection | null | undefined;
  title?: SortDirection | null | undefined;
};

export type MovieUpdateInput = {
  actors?: Array<MovieActorsUpdateFieldInput> | null | undefined;
  directors?: Array<MovieDirectorsUpdateFieldInput> | null | undefined;
  genres?: Array<MovieGenresUpdateFieldInput> | null | undefined;
  rating?: FloatScalarMutations | null | undefined;
  released?: IntScalarMutations | null | undefined;
  runtime?: IntScalarMutations | null | undefined;
  tagline?: StringScalarMutations | null | undefined;
  title?: StringScalarMutations | null | undefined;
};

export type MovieWhere = {
  AND?: Array<MovieWhere> | null | undefined;
  NOT?: MovieWhere | null | undefined;
  OR?: Array<MovieWhere> | null | undefined;
  actors?: PersonRelationshipFilters | null | undefined;
  actorsConnection?: MovieActorsConnectionFilters | null | undefined;
  directors?: PersonRelationshipFilters | null | undefined;
  directorsConnection?: MovieDirectorsConnectionFilters | null | undefined;
  genres?: GenreRelationshipFilters | null | undefined;
  genresConnection?: MovieGenresConnectionFilters | null | undefined;
  rating?: FloatScalarFilters | null | undefined;
  released?: IntScalarFilters | null | undefined;
  runtime?: IntScalarFilters | null | undefined;
  tagline?: StringScalarFilters | null | undefined;
  title?: StringScalarFilters | null | undefined;
};

export type PersonActedInConnectFieldInput = {
  connect?: Array<MovieConnectInput> | null | undefined;
  edge: ActedInCreateInput;
  where?: MovieConnectWhere | null | undefined;
};

export type PersonActedInConnectionAggregateInput = {
  AND?: Array<PersonActedInConnectionAggregateInput> | null | undefined;
  NOT?: PersonActedInConnectionAggregateInput | null | undefined;
  OR?: Array<PersonActedInConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: PersonActedInNodeAggregationWhereInput | null | undefined;
};

export type PersonActedInConnectionFilters = {
  /** Filter People by aggregating results on related PersonActedInConnections */
  aggregate?: PersonActedInConnectionAggregateInput | null | undefined;
  /** Return People where all of the related PersonActedInConnections match this filter */
  all?: PersonActedInConnectionWhere | null | undefined;
  /** Return People where none of the related PersonActedInConnections match this filter */
  none?: PersonActedInConnectionWhere | null | undefined;
  /** Return People where one of the related PersonActedInConnections match this filter */
  single?: PersonActedInConnectionWhere | null | undefined;
  /** Return People where some of the related PersonActedInConnections match this filter */
  some?: PersonActedInConnectionWhere | null | undefined;
};

export type PersonActedInConnectionWhere = {
  AND?: Array<PersonActedInConnectionWhere> | null | undefined;
  NOT?: PersonActedInConnectionWhere | null | undefined;
  OR?: Array<PersonActedInConnectionWhere> | null | undefined;
  edge?: ActedInWhere | null | undefined;
  node?: MovieWhere | null | undefined;
};

export type PersonActedInCreateFieldInput = {
  edge: ActedInCreateInput;
  node: MovieCreateInput;
};

export type PersonActedInDeleteFieldInput = {
  delete?: MovieDeleteInput | null | undefined;
  where?: PersonActedInConnectionWhere | null | undefined;
};

export type PersonActedInDisconnectFieldInput = {
  disconnect?: MovieDisconnectInput | null | undefined;
  where?: PersonActedInConnectionWhere | null | undefined;
};

export type PersonActedInFieldInput = {
  connect?: Array<PersonActedInConnectFieldInput> | null | undefined;
  create?: Array<PersonActedInCreateFieldInput> | null | undefined;
};

export type PersonActedInNodeAggregationWhereInput = {
  AND?: Array<PersonActedInNodeAggregationWhereInput> | null | undefined;
  NOT?: PersonActedInNodeAggregationWhereInput | null | undefined;
  OR?: Array<PersonActedInNodeAggregationWhereInput> | null | undefined;
  rating?: FloatScalarAggregationFilters | null | undefined;
  released?: IntScalarAggregationFilters | null | undefined;
  runtime?: IntScalarAggregationFilters | null | undefined;
  tagline?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
};

export type PersonActedInUpdateConnectionInput = {
  edge?: ActedInUpdateInput | null | undefined;
  node?: MovieUpdateInput | null | undefined;
  where?: PersonActedInConnectionWhere | null | undefined;
};

export type PersonActedInUpdateFieldInput = {
  connect?: Array<PersonActedInConnectFieldInput> | null | undefined;
  create?: Array<PersonActedInCreateFieldInput> | null | undefined;
  delete?: Array<PersonActedInDeleteFieldInput> | null | undefined;
  disconnect?: Array<PersonActedInDisconnectFieldInput> | null | undefined;
  update?: PersonActedInUpdateConnectionInput | null | undefined;
};

export type PersonConnectInput = {
  actedIn?: Array<PersonActedInConnectFieldInput> | null | undefined;
  directed?: Array<PersonDirectedConnectFieldInput> | null | undefined;
};

export type PersonConnectWhere = {
  node: PersonWhere;
};

export type PersonCreateInput = {
  actedCount?: number | null | undefined;
  actedIn?: PersonActedInFieldInput | null | undefined;
  born?: number | null | undefined;
  directed?: PersonDirectedFieldInput | null | undefined;
  directedCount?: number | null | undefined;
  name: string;
};

export type PersonDeleteInput = {
  actedIn?: Array<PersonActedInDeleteFieldInput> | null | undefined;
  directed?: Array<PersonDirectedDeleteFieldInput> | null | undefined;
};

export type PersonDirectedConnectFieldInput = {
  connect?: Array<MovieConnectInput> | null | undefined;
  where?: MovieConnectWhere | null | undefined;
};

export type PersonDirectedConnectionAggregateInput = {
  AND?: Array<PersonDirectedConnectionAggregateInput> | null | undefined;
  NOT?: PersonDirectedConnectionAggregateInput | null | undefined;
  OR?: Array<PersonDirectedConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: PersonDirectedNodeAggregationWhereInput | null | undefined;
};

export type PersonDirectedConnectionFilters = {
  /** Filter People by aggregating results on related PersonDirectedConnections */
  aggregate?: PersonDirectedConnectionAggregateInput | null | undefined;
  /** Return People where all of the related PersonDirectedConnections match this filter */
  all?: PersonDirectedConnectionWhere | null | undefined;
  /** Return People where none of the related PersonDirectedConnections match this filter */
  none?: PersonDirectedConnectionWhere | null | undefined;
  /** Return People where one of the related PersonDirectedConnections match this filter */
  single?: PersonDirectedConnectionWhere | null | undefined;
  /** Return People where some of the related PersonDirectedConnections match this filter */
  some?: PersonDirectedConnectionWhere | null | undefined;
};

export type PersonDirectedConnectionWhere = {
  AND?: Array<PersonDirectedConnectionWhere> | null | undefined;
  NOT?: PersonDirectedConnectionWhere | null | undefined;
  OR?: Array<PersonDirectedConnectionWhere> | null | undefined;
  node?: MovieWhere | null | undefined;
};

export type PersonDirectedCreateFieldInput = {
  node: MovieCreateInput;
};

export type PersonDirectedDeleteFieldInput = {
  delete?: MovieDeleteInput | null | undefined;
  where?: PersonDirectedConnectionWhere | null | undefined;
};

export type PersonDirectedDisconnectFieldInput = {
  disconnect?: MovieDisconnectInput | null | undefined;
  where?: PersonDirectedConnectionWhere | null | undefined;
};

export type PersonDirectedFieldInput = {
  connect?: Array<PersonDirectedConnectFieldInput> | null | undefined;
  create?: Array<PersonDirectedCreateFieldInput> | null | undefined;
};

export type PersonDirectedNodeAggregationWhereInput = {
  AND?: Array<PersonDirectedNodeAggregationWhereInput> | null | undefined;
  NOT?: PersonDirectedNodeAggregationWhereInput | null | undefined;
  OR?: Array<PersonDirectedNodeAggregationWhereInput> | null | undefined;
  rating?: FloatScalarAggregationFilters | null | undefined;
  released?: IntScalarAggregationFilters | null | undefined;
  runtime?: IntScalarAggregationFilters | null | undefined;
  tagline?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
};

export type PersonDirectedUpdateConnectionInput = {
  node?: MovieUpdateInput | null | undefined;
  where?: PersonDirectedConnectionWhere | null | undefined;
};

export type PersonDirectedUpdateFieldInput = {
  connect?: Array<PersonDirectedConnectFieldInput> | null | undefined;
  create?: Array<PersonDirectedCreateFieldInput> | null | undefined;
  delete?: Array<PersonDirectedDeleteFieldInput> | null | undefined;
  disconnect?: Array<PersonDirectedDisconnectFieldInput> | null | undefined;
  update?: PersonDirectedUpdateConnectionInput | null | undefined;
};

export type PersonDisconnectInput = {
  actedIn?: Array<PersonActedInDisconnectFieldInput> | null | undefined;
  directed?: Array<PersonDirectedDisconnectFieldInput> | null | undefined;
};

export type PersonRelationshipFilters = {
  /** Filter type where all of the related People match this filter */
  all?: PersonWhere | null | undefined;
  /** Filter type where none of the related People match this filter */
  none?: PersonWhere | null | undefined;
  /** Filter type where one of the related People match this filter */
  single?: PersonWhere | null | undefined;
  /** Filter type where some of the related People match this filter */
  some?: PersonWhere | null | undefined;
};

/** Fields to sort People by. The order in which sorts are applied is not guaranteed when specifying many fields in one PersonSort object. */
export type PersonSort = {
  actedCount?: SortDirection | null | undefined;
  born?: SortDirection | null | undefined;
  directedCount?: SortDirection | null | undefined;
  name?: SortDirection | null | undefined;
};

export type PersonUpdateInput = {
  actedCount?: IntScalarMutations | null | undefined;
  actedIn?: Array<PersonActedInUpdateFieldInput> | null | undefined;
  born?: IntScalarMutations | null | undefined;
  directed?: Array<PersonDirectedUpdateFieldInput> | null | undefined;
  directedCount?: IntScalarMutations | null | undefined;
  name?: StringScalarMutations | null | undefined;
};

export type PersonWhere = {
  AND?: Array<PersonWhere> | null | undefined;
  NOT?: PersonWhere | null | undefined;
  OR?: Array<PersonWhere> | null | undefined;
  actedCount?: IntScalarFilters | null | undefined;
  actedIn?: MovieRelationshipFilters | null | undefined;
  actedInConnection?: PersonActedInConnectionFilters | null | undefined;
  born?: IntScalarFilters | null | undefined;
  directed?: MovieRelationshipFilters | null | undefined;
  directedConnection?: PersonDirectedConnectionFilters | null | undefined;
  directedCount?: IntScalarFilters | null | undefined;
  name?: StringScalarFilters | null | undefined;
};

/** An enum for sorting in either ascending or descending order. */
export type SortDirection =
  /** Sort by field values in ascending order. */
  | 'ASC'
  /** Sort by field values in descending order. */
  | 'DESC';

/** String list filters */
export type StringListFilters = {
  eq?: Array<string> | null | undefined;
  includes?: string | null | undefined;
};

/** Filters for an aggregation of a string field */
export type StringScalarAggregationFilters = {
  averageLength?: FloatScalarFilters | null | undefined;
  longestLength?: IntScalarFilters | null | undefined;
  shortestLength?: IntScalarFilters | null | undefined;
};

/** String filters */
export type StringScalarFilters = {
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: Array<string> | null | undefined;
  startsWith?: string | null | undefined;
};

/** String mutations */
export type StringScalarMutations = {
  set?: string | null | undefined;
};

export type DeleteMovieMutationVariables = Exact<{
  title: string;
}>;


export type DeleteMovieMutation = { deleteMovies: { nodesDeleted: number } };

export type DeletePersonMutationVariables = Exact<{
  name: string;
}>;


export type DeletePersonMutation = { deletePeople: { nodesDeleted: number } };

export type PersonSearchQueryVariables = Exact<{
  where?: PersonWhere | null | undefined;
}>;


export type PersonSearchQuery = { people: Array<{ name: string }> };

export type CompareQueryVariables = Exact<{
  titles?: Array<string> | string | null | undefined;
}>;


export type CompareQuery = { movies: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }>, directors: Array<{ name: string }>, actorsConnection: { edges: Array<{ node: { name: string } }> } }> };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { total: { totalCount: number }, people: { totalCount: number }, genres: Array<{ name: string, moviesConnection: { totalCount: number } }>, top: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }>, prolific: Array<{ name: string, born: number | null, actedCount: number | null, directedCount: number | null }>, directing: Array<{ name: string, born: number | null, actedCount: number | null, directedCount: number | null }>, recent: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }> };

export type MovieQueryVariables = Exact<{
  title: string;
}>;


export type MovieQuery = { movies: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, tagline: string | null, genres: Array<{ name: string }>, directors: Array<{ name: string }>, actorsConnection: { edges: Array<{ properties: { roles: Array<string> }, node: { name: string } }> }, similar: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }> }> };

export type MovieForEditQueryVariables = Exact<{
  title: string;
}>;


export type MovieForEditQuery = { movies: Array<{ title: string, tagline: string | null, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }>, directors: Array<{ name: string }>, actorsConnection: { edges: Array<{ properties: { roles: Array<string> }, node: { name: string } }> } }>, genres: Array<{ name: string }> };

export type UpdateMovieMutationVariables = Exact<{
  title: string;
  update?: MovieUpdateInput | null | undefined;
}>;


export type UpdateMovieMutation = { updateMovies: { movies: Array<{ title: string }> } };

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = { genres: Array<{ name: string }> };

export type CreateMovieMutationVariables = Exact<{
  input: Array<MovieCreateInput> | MovieCreateInput;
}>;


export type CreateMovieMutation = { createMovies: { movies: Array<{ title: string }> } };

export type PeopleBrowseQueryVariables = Exact<{
  where?: PersonWhere | null | undefined;
  roleWhere: PersonWhere;
  sort?: Array<PersonSort> | PersonSort | null | undefined;
  limit: number;
}>;


export type PeopleBrowseQuery = { people: Array<{ name: string, born: number | null, actedCount: number | null, directedCount: number | null }>, peopleConnection: { totalCount: number }, anyRole: { totalCount: number }, actors: { totalCount: number }, directors: { totalCount: number } };

export type PersonQueryVariables = Exact<{
  name: string;
}>;


export type PersonQuery = { people: Array<{ name: string, born: number | null, actedCount: number | null, directedCount: number | null, actedIn: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }>, directed: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }>, collaborators: Array<{ name: string, films: number }> }> };

export type PersonForEditQueryVariables = Exact<{
  name: string;
}>;


export type PersonForEditQuery = { people: Array<{ name: string, born: number | null, actedCount: number | null, directedCount: number | null }> };

export type UpdatePersonMutationVariables = Exact<{
  name: string;
  update?: PersonUpdateInput | null | undefined;
}>;


export type UpdatePersonMutation = { updatePeople: { people: Array<{ name: string }> } };

export type CreatePersonMutationVariables = Exact<{
  input: Array<PersonCreateInput> | PersonCreateInput;
}>;


export type CreatePersonMutation = { createPeople: { people: Array<{ name: string }> } };

export type ResultsQueryVariables = Exact<{
  where?: MovieWhere | null | undefined;
  genreWhere?: MovieWhere | null | undefined;
  decadeWhere: MovieWhere;
  sort?: Array<MovieSort> | MovieSort | null | undefined;
  limit: number;
}>;


export type ResultsQuery = { movies: Array<{ title: string, released: number | null, rating: number | null, runtime: number | null, genres: Array<{ name: string }> }>, moviesConnection: { totalCount: number }, genres: Array<{ name: string, moviesConnection: { totalCount: number } }>, d1940: { totalCount: number }, d1950: { totalCount: number }, d1960: { totalCount: number }, d1970: { totalCount: number }, d1980: { totalCount: number }, d1990: { totalCount: number }, d2000: { totalCount: number }, d2010: { totalCount: number }, d2020: { totalCount: number } };

export type PeopleQueryVariables = Exact<{
  search: string;
}>;


export type PeopleQuery = { people: Array<{ name: string }> };


export const DeleteMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodesDeleted"}}]}}]}}]} as unknown as DocumentNode<DeleteMovieMutation, DeleteMovieMutationVariables>;
export const DeletePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePeople"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodesDeleted"}}]}}]}}]} as unknown as DocumentNode<DeletePersonMutation, DeletePersonMutationVariables>;
export const PersonSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PersonSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"8"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PersonSearchQuery, PersonSearchQueryVariables>;
export const CompareDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Compare"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"titles"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"titles"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actorsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompareQuery, CompareQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"moviesConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"people"},"name":{"kind":"Name","value":"peopleConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"moviesConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"top"},"name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"prolific"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"actedCount"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"born"}},{"kind":"Field","name":{"kind":"Name","value":"actedCount"}},{"kind":"Field","name":{"kind":"Name","value":"directedCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"directing"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"directedCount"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"born"}},{"kind":"Field","name":{"kind":"Name","value":"actedCount"}},{"kind":"Field","name":{"kind":"Name","value":"directedCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"recent"},"name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"EnumValue","value":"DESC"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const MovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actorsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"12"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"similar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MovieQuery, MovieQueryVariables>;
export const MovieForEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieForEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actorsConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MovieForEditQuery, MovieForEditQueryVariables>;
export const UpdateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieUpdateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const GenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GenresQuery, GenresQueryVariables>;
export const CreateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieCreateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMovieMutation, CreateMovieMutationVariables>;
export const PeopleBrowseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PeopleBrowse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleWhere"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonWhere"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"born"}},{"kind":"Field","name":{"kind":"Name","value":"actedCount"}},{"kind":"Field","name":{"kind":"Name","value":"directedCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"anyRole"},"name":{"kind":"Name","value":"peopleConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"actors"},"name":{"kind":"Name","value":"peopleConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"roleWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"actedCount"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gt"},"value":{"kind":"IntValue","value":"0"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"directors"},"name":{"kind":"Name","value":"peopleConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"roleWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"directedCount"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gt"},"value":{"kind":"IntValue","value":"0"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PeopleBrowseQuery, PeopleBrowseQueryVariables>;
export const PersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Person"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"born"}},{"kind":"Field","name":{"kind":"Name","value":"actedCount"}},{"kind":"Field","name":{"kind":"Name","value":"directedCount"}},{"kind":"Field","name":{"kind":"Name","value":"actedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"directed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"films"}}]}}]}}]}}]} as unknown as DocumentNode<PersonQuery, PersonQueryVariables>;
export const PersonForEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PersonForEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"born"}},{"kind":"Field","name":{"kind":"Name","value":"actedCount"}},{"kind":"Field","name":{"kind":"Name","value":"directedCount"}}]}}]}}]} as unknown as DocumentNode<PersonForEditQuery, PersonForEditQueryVariables>;
export const UpdatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonUpdateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePeople"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const CreatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonCreateInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPeople"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePersonMutation, CreatePersonMutationVariables>;
export const ResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Results"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieWhere"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieWhere"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"released"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"node"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreWhere"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1940"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1940"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"1950"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1950"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1950"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"1960"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1960"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1960"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"1970"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1970"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1970"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"1980"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1980"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1980"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"1990"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d1990"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"1990"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"2000"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d2000"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"2000"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"2010"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d2010"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"2010"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"2020"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"d2020"},"name":{"kind":"Name","value":"moviesConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"decadeWhere"}},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"released"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"IntValue","value":"2020"}},{"kind":"ObjectField","name":{"kind":"Name","value":"lt"},"value":{"kind":"IntValue","value":"2030"}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ResultsQuery, ResultsQueryVariables>;
export const PeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"People"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"6"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PeopleQuery, PeopleQueryVariables>;