import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CivilStatus: CivilStatus;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EducationalBackground: EducationalBackground;
  Fisherfolk: ResolverTypeWrapper<Fisherfolk>;
  FisherfolkStatus: FisherfolkStatus;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Nationality: Nationality;
  Query: ResolverTypeWrapper<{}>;
  RegistrationType: RegistrationType;
  Salutation: Salutation;
  SourceOfIncome: SourceOfIncome;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Fisherfolk: Fisherfolk;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FisherfolkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fisherfolk'] = ResolversParentTypes['Fisherfolk']> = {
  barangay?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cityMunicipality?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  civilStatus?: Resolver<Maybe<ResolversTypes['CivilStatus']>, ParentType, ContextType>;
  contactNum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  educationalBackground?: Resolver<Maybe<ResolversTypes['EducationalBackground']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fisherfolkStatus?: Resolver<Maybe<ResolversTypes['FisherfolkStatus']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainSrcGear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainSrcMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainSrcOfIncome?: Resolver<Maybe<ResolversTypes['SourceOfIncome']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nationality?: Resolver<Maybe<ResolversTypes['Nationality']>, ParentType, ContextType>;
  numOfChildren?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orgPosition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orgYearMember?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  otherSrcGear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otherSrcMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otherSrcOfIncome?: Resolver<Maybe<ResolversTypes['SourceOfIncome']>, ParentType, ContextType>;
  personToNotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ptnAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ptnContactNum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ptnRelationship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registrationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  registrationNum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  registrationType?: Resolver<Maybe<ResolversTypes['RegistrationType']>, ParentType, ContextType>;
  religion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  residentYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  salutation?: Resolver<Maybe<ResolversTypes['Salutation']>, ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fisherfolks?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Fisherfolk?: FisherfolkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum CivilStatus {
  LegallySeparated = 'LEGALLY_SEPARATED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum EducationalBackground {
  College = 'COLLEGE',
  Elementary = 'ELEMENTARY',
  HighSchool = 'HIGH_SCHOOL',
  PostGraduate = 'POST_GRADUATE',
  Vocational = 'VOCATIONAL'
}

export type Fisherfolk = {
  __typename?: 'Fisherfolk';
  barangay?: Maybe<Scalars['String']>;
  cityMunicipality?: Maybe<Scalars['String']>;
  civilStatus?: Maybe<CivilStatus>;
  contactNum?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  educationalBackground?: Maybe<EducationalBackground>;
  firstName?: Maybe<Scalars['String']>;
  fisherfolkStatus?: Maybe<FisherfolkStatus>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mainSrcGear?: Maybe<Scalars['String']>;
  mainSrcMethod?: Maybe<Scalars['String']>;
  mainSrcOfIncome?: Maybe<SourceOfIncome>;
  middleName?: Maybe<Scalars['String']>;
  nationality?: Maybe<Nationality>;
  numOfChildren?: Maybe<Scalars['Int']>;
  orgName?: Maybe<Scalars['String']>;
  orgPosition?: Maybe<Scalars['String']>;
  orgYearMember?: Maybe<Scalars['Int']>;
  otherSrcGear?: Maybe<Scalars['String']>;
  otherSrcMethod?: Maybe<Scalars['String']>;
  otherSrcOfIncome?: Maybe<SourceOfIncome>;
  personToNotify?: Maybe<Scalars['String']>;
  placeOfBirth?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  ptnAddress?: Maybe<Scalars['String']>;
  ptnContactNum?: Maybe<Scalars['String']>;
  ptnRelationship?: Maybe<Scalars['String']>;
  registrationDate?: Maybe<Scalars['DateTime']>;
  registrationNum?: Maybe<Scalars['Int']>;
  registrationType?: Maybe<RegistrationType>;
  religion?: Maybe<Scalars['String']>;
  residentYear?: Maybe<Scalars['Int']>;
  salutation?: Maybe<Salutation>;
  signature?: Maybe<Scalars['String']>;
};

export enum FisherfolkStatus {
  Active = 'ACTIVE',
  Deceased = 'DECEASED',
  Inactive = 'INACTIVE'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export enum Nationality {
  Filipino = 'FILIPINO'
}

export type Query = {
  __typename?: 'Query';
  fisherfolks: Array<Fisherfolk>;
};

export enum RegistrationType {
  NewRegistration = 'NEW_REGISTRATION',
  Renewal = 'RENEWAL'
}

export enum Salutation {
  Mr = 'MR',
  Mrs = 'MRS',
  Ms = 'MS'
}

export enum SourceOfIncome {
  Aquaculture = 'AQUACULTURE',
  CaptureFishing = 'CAPTURE_FISHING',
  FishProcessing = 'FISH_PROCESSING',
  FishVending = 'FISH_VENDING'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SampleFisherfolkQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SampleFisherfolkQueryQuery = { __typename?: 'Query', fisherfolks: Array<{ __typename?: 'Fisherfolk', id: number, fullName?: string | null, barangay?: string | null, registrationDate?: any | null }> };
