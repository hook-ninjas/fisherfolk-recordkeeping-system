import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CivilStatus: CivilStatus;
  CreateFisherfolkInput: CreateFisherfolkInput;
  CreateGearInput: CreateGearInput;
  CreateUserInput: CreateUserInput;
  CreateVesselInput: CreateVesselInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EducationalBackground: EducationalBackground;
  Fisherfolk: ResolverTypeWrapper<Fisherfolk>;
  FisherfolkStatus: FisherfolkStatus;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gear: ResolverTypeWrapper<Gear>;
  GearClassification: GearClassification;
  Gender: Gender;
  GovernmentAid: ResolverTypeWrapper<GovernmentAid>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Livelihood: ResolverTypeWrapper<Livelihood>;
  Material: Material;
  Member: ResolverTypeWrapper<Member>;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  Permit: ResolverTypeWrapper<Permit>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<Queue>;
  Salutation: Salutation;
  SourceOfIncome: SourceOfIncome;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Vessel: ResolverTypeWrapper<Vessel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  CreateFisherfolkInput: CreateFisherfolkInput;
  CreateGearInput: CreateGearInput;
  CreateUserInput: CreateUserInput;
  CreateVesselInput: CreateVesselInput;
  DateTime: Scalars['DateTime'];
  Fisherfolk: Fisherfolk;
  Float: Scalars['Float'];
  Gear: Gear;
  GovernmentAid: GovernmentAid;
  Image: Image;
  Int: Scalars['Int'];
  Livelihood: Livelihood;
  Member: Member;
  Mutation: {};
  Organization: Organization;
  Permit: Permit;
  Query: {};
  Queue: Queue;
  String: Scalars['String'];
  User: User;
  Vessel: Vessel;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FisherfolkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fisherfolk'] = ResolversParentTypes['Fisherfolk']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  appellation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  barangay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityMunicipality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  civilStatus?: Resolver<ResolversTypes['CivilStatus'], ParentType, ContextType>;
  contactNum?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  educationalBackground?: Resolver<ResolversTypes['EducationalBackground'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gears?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gear']>>>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  governmentAid?: Resolver<Maybe<Array<Maybe<ResolversTypes['Queue']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  livelihoods?: Resolver<Maybe<Array<Maybe<ResolversTypes['Livelihood']>>>, ParentType, ContextType>;
  middleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numOfChildren?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  organizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  permit?: Resolver<Maybe<ResolversTypes['Permit']>, ParentType, ContextType>;
  personToNotify?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeOfBirth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  province?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ptnAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ptnContactNum?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ptnRelationship?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registrationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  religion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  residentYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salutation?: Resolver<ResolversTypes['Salutation'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FisherfolkStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vessels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vessel']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GearResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gear'] = ResolversParentTypes['Gear']> = {
  classification?: Resolver<ResolversTypes['GearClassification'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GovernmentAidResolvers<ContextType = any, ParentType extends ResolversParentTypes['GovernmentAid'] = ResolversParentTypes['GovernmentAid']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fisherfolk?: Resolver<Maybe<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LivelihoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Livelihood'] = ResolversParentTypes['Livelihood']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SourceOfIncome'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fisherfolks?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  yearJoined?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<MutationCreateFisherfolkArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createVesselWithGear?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationCreateVesselWithGearArgs, 'gears' | 'vessel'>>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permit'] = ResolversParentTypes['Permit']> = {
  certificateNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expiresOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fisherfolk?: Resolver<Maybe<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gears?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gear']>>>, ParentType, ContextType>;
  registeredAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  renewedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vessels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vessel']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<QueryFisherfolkArgs, 'id'>>;
  fisherfolkByRange?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType, RequireFields<QueryFisherfolkByRangeArgs, 'count' | 'start'>>;
  fisherfolks?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  gears?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType>;
  totalFisherfolk?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  vessels?: Resolver<Array<ResolversTypes['Vessel']>, ParentType, ContextType>;
};

export type QueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Queue'] = ResolversParentTypes['Queue']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  governmentAid?: Resolver<ResolversTypes['GovernmentAid'], ParentType, ContextType>;
  governmentAidId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queueNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VesselResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vessel'] = ResolversParentTypes['Vessel']> = {
  engineMake?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  grossTonnage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  homeport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  horsepower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  material?: Resolver<ResolversTypes['Material'], ParentType, ContextType>;
  mfvrNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  netTonnage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  placeBuilt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registeredBreadth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  registeredDepth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  registeredLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tonnageBreadth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tonnageDepth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tonnageLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearBuilt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Fisherfolk?: FisherfolkResolvers<ContextType>;
  Gear?: GearResolvers<ContextType>;
  GovernmentAid?: GovernmentAidResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Livelihood?: LivelihoodResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Permit?: PermitResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Queue?: QueueResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vessel?: VesselResolvers<ContextType>;
};


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  DateTime: any;
};

export enum CivilStatus {
  LegallySeparated = 'LegallySeparated',
  Married = 'Married',
  Single = 'Single',
  Widowed = 'Widowed'
}

export type CreateFisherfolkInput = {
  age: Scalars['Int'];
  appellation: Scalars['String'];
  barangay: Scalars['String'];
  cityMunicipality: Scalars['String'];
  civilStatus: CivilStatus;
  contactNum: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  educationalBackground: EducationalBackground;
  firstName: Scalars['String'];
  gender: Gender;
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  nationality: Scalars['String'];
  numOfChildren: Scalars['Int'];
  personToNotify: Scalars['String'];
  placeOfBirth: Scalars['String'];
  province: Scalars['String'];
  ptnAddress: Scalars['String'];
  ptnContactNum: Scalars['String'];
  ptnRelationship: Scalars['String'];
  religion: Scalars['String'];
  residentYear: Scalars['Int'];
  salutation: Salutation;
};

export type CreateGearInput = {
  classification: GearClassification;
  fisherfolkId: Scalars['BigInt'];
  type: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateVesselInput = {
  engineMake: Scalars['String'];
  fisherfolkId: Scalars['BigInt'];
  grossTonnage: Scalars['Float'];
  homeport: Scalars['String'];
  horsepower: Scalars['Float'];
  material: Material;
  mfvrNumber: Scalars['String'];
  name: Scalars['String'];
  netTonnage: Scalars['Float'];
  placeBuilt: Scalars['String'];
  registeredBreadth: Scalars['Float'];
  registeredDepth: Scalars['Float'];
  registeredLength: Scalars['Float'];
  serialNumber: Scalars['String'];
  tonnageBreadth: Scalars['Float'];
  tonnageDepth: Scalars['Float'];
  tonnageLength: Scalars['Float'];
  type: Scalars['String'];
  yearBuilt: Scalars['Int'];
};

export enum EducationalBackground {
  College = 'College',
  Elementary = 'Elementary',
  HighSchool = 'HighSchool',
  PostGraduate = 'PostGraduate',
  Vocational = 'Vocational'
}

export type Fisherfolk = {
  __typename?: 'Fisherfolk';
  age: Scalars['Int'];
  appellation: Scalars['String'];
  barangay: Scalars['String'];
  cityMunicipality: Scalars['String'];
  civilStatus: CivilStatus;
  contactNum: Scalars['String'];
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  educationalBackground: EducationalBackground;
  firstName: Scalars['String'];
  gears?: Maybe<Array<Maybe<Gear>>>;
  gender: Gender;
  governmentAid?: Maybe<Array<Maybe<Queue>>>;
  id: Scalars['BigInt'];
  images?: Maybe<Array<Maybe<Image>>>;
  isArchive: Scalars['Boolean'];
  lastName: Scalars['String'];
  livelihoods?: Maybe<Array<Maybe<Livelihood>>>;
  middleName: Scalars['String'];
  nationality: Scalars['String'];
  numOfChildren: Scalars['Int'];
  organizations?: Maybe<Array<Maybe<Member>>>;
  permit?: Maybe<Permit>;
  personToNotify: Scalars['String'];
  placeOfBirth: Scalars['String'];
  province: Scalars['String'];
  ptnAddress: Scalars['String'];
  ptnContactNum: Scalars['String'];
  ptnRelationship: Scalars['String'];
  registrationDate: Scalars['DateTime'];
  religion: Scalars['String'];
  residentYear: Scalars['Int'];
  salutation: Salutation;
  status: FisherfolkStatus;
  updatedAt: Scalars['DateTime'];
  vessels?: Maybe<Array<Maybe<Vessel>>>;
};

export enum FisherfolkStatus {
  Active = 'Active',
  Deceased = 'Deceased',
  Inactive = 'Inactive'
}

export type Gear = {
  __typename?: 'Gear';
  classification: GearClassification;
  fisherfolk: Fisherfolk;
  id: Scalars['BigInt'];
  type: Scalars['String'];
};

export enum GearClassification {
  FallingGear = 'FallingGear',
  GillNets = 'GillNets',
  HookAndLine = 'HookAndLine',
  LiftNets = 'LiftNets',
  Miscellaneous = 'Miscellaneous',
  Others = 'Others',
  PotsAndTraps = 'PotsAndTraps',
  ScoopNets = 'ScoopNets',
  SeineNets = 'SeineNets'
}

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type GovernmentAid = {
  __typename?: 'GovernmentAid';
  createdAt: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  id: Scalars['Int'];
  slot: Scalars['Int'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTime'];
  fisherfolk?: Maybe<Fisherfolk>;
  fisherfolkId: Scalars['BigInt'];
  format: Scalars['String'];
  id: Scalars['String'];
  isArchive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  version: Scalars['String'];
};

export type Livelihood = {
  __typename?: 'Livelihood';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  fisherfolk: Fisherfolk;
  fisherfolkId: Scalars['BigInt'];
  id: Scalars['BigInt'];
  isArchive: Scalars['Boolean'];
  isMain: Scalars['Boolean'];
  type: SourceOfIncome;
  updatedAt: Scalars['DateTime'];
};

export enum Material {
  Composite = 'Composite',
  Fiberglass = 'Fiberglass',
  Wood = 'Wood'
}

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['DateTime'];
  fisherfolkId: Scalars['BigInt'];
  fisherfolks: Fisherfolk;
  organization: Organization;
  organizationId: Scalars['Int'];
  position: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  yearJoined: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFisherfolk: Fisherfolk;
  createUser: User;
  createVesselWithGear: Vessel;
};


export type MutationCreateFisherfolkArgs = {
  data: CreateFisherfolkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVesselWithGearArgs = {
  gears: Array<CreateGearInput>;
  vessel: CreateVesselInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  id: Scalars['BigInt'];
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Permit = {
  __typename?: 'Permit';
  certificateNumber: Scalars['String'];
  expired: Scalars['Boolean'];
  expiresOn?: Maybe<Scalars['DateTime']>;
  fisherfolk?: Maybe<Fisherfolk>;
  fisherfolkId: Scalars['BigInt'];
  gears?: Maybe<Array<Maybe<Gear>>>;
  registeredAt: Scalars['DateTime'];
  renewedAt: Scalars['DateTime'];
  vessels?: Maybe<Array<Maybe<Vessel>>>;
};

export type Query = {
  __typename?: 'Query';
  fisherfolk: Fisherfolk;
  fisherfolkByRange: Array<Fisherfolk>;
  fisherfolks: Array<Fisherfolk>;
  gears: Array<Gear>;
  totalFisherfolk: Scalars['Int'];
  vessels: Array<Vessel>;
};


export type QueryFisherfolkArgs = {
  id: Scalars['BigInt'];
};


export type QueryFisherfolkByRangeArgs = {
  count: Scalars['Int'];
  start: Scalars['Int'];
};

export type Queue = {
  __typename?: 'Queue';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  fisherfolk: Fisherfolk;
  fisherfolkId: Scalars['BigInt'];
  governmentAid: GovernmentAid;
  governmentAidId: Scalars['Int'];
  queueNumber: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export enum Salutation {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Ms = 'Ms'
}

export enum SourceOfIncome {
  Aquaculture = 'Aquaculture',
  CaptureFishing = 'CaptureFishing',
  FishProcessing = 'FishProcessing',
  FishVending = 'FishVending',
  Others = 'Others'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Vessel = {
  __typename?: 'Vessel';
  engineMake: Scalars['String'];
  fisherfolk: Fisherfolk;
  grossTonnage: Scalars['Float'];
  homeport: Scalars['String'];
  horsepower: Scalars['Float'];
  id: Scalars['BigInt'];
  material: Material;
  mfvrNumber: Scalars['String'];
  name: Scalars['String'];
  netTonnage: Scalars['Float'];
  placeBuilt: Scalars['String'];
  registeredBreadth: Scalars['Float'];
  registeredDepth: Scalars['Float'];
  registeredLength: Scalars['Float'];
  serialNumber: Scalars['String'];
  tonnageBreadth: Scalars['Float'];
  tonnageDepth: Scalars['Float'];
  tonnageLength: Scalars['Float'];
  type: Scalars['String'];
  yearBuilt: Scalars['Int'];
};

export type CreateFisherfolkMutationVariables = Exact<{
  data: CreateFisherfolkInput;
}>;


export type CreateFisherfolkMutation = { __typename?: 'Mutation', createFisherfolk: { __typename?: 'Fisherfolk', id: any } };

export type CreateVessselWithGearMutationVariables = Exact<{
  vessel: CreateVesselInput;
  gears: Array<CreateGearInput> | CreateGearInput;
}>;


export type CreateVessselWithGearMutation = { __typename?: 'Mutation', createVesselWithGear: { __typename?: 'Vessel', id: any } };

export type QueryFisherfolkByRangeQueryVariables = Exact<{
  start: Scalars['Int'];
  count: Scalars['Int'];
}>;


export type QueryFisherfolkByRangeQuery = { __typename?: 'Query', totalFisherfolk: number, fisherfolkByRange: Array<{ __typename?: 'Fisherfolk', id: any, registrationDate: any, firstName: string, lastName: string, middleName: string, appellation: string, contactNum: string, barangay: string, status: FisherfolkStatus, livelihoods?: Array<{ __typename?: 'Livelihood', isMain: boolean, type: SourceOfIncome } | null> | null }> };

export type FisherfolkByIdQueryVariables = Exact<{
  fisherfolkId: Scalars['BigInt'];
}>;


export type FisherfolkByIdQuery = { __typename?: 'Query', fisherfolk: { __typename?: 'Fisherfolk', age: number, appellation: string, barangay: string, cityMunicipality: string, civilStatus: CivilStatus, contactNum: string, dateOfBirth: any, educationalBackground: EducationalBackground, firstName: string, gender: Gender, id: any, lastName: string, middleName: string, nationality: string, numOfChildren: number, personToNotify: string, placeOfBirth: string, province: string, ptnAddress: string, ptnContactNum: string, ptnRelationship: string, registrationDate: any, religion: string, residentYear: number, salutation: Salutation, status: FisherfolkStatus, livelihoods?: Array<{ __typename?: 'Livelihood', isMain: boolean, type: SourceOfIncome, description: string } | null> | null, organizations?: Array<{ __typename?: 'Member', yearJoined: number, position: string, organization: { __typename?: 'Organization', name: string } } | null> | null } };

export type VesselQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type VesselQueryQuery = { __typename?: 'Query', vessels: Array<{ __typename?: 'Vessel', id: any, name: string, serialNumber: string, type: string, yearBuilt: number, fisherfolk: { __typename?: 'Fisherfolk', lastName: string, firstName: string, middleName: string } }> };

export type GearsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GearsQueryQuery = { __typename?: 'Query', gears: Array<{ __typename?: 'Gear', id: any, classification: GearClassification, type: string, fisherfolk: { __typename?: 'Fisherfolk', lastName: string, firstName: string, middleName: string } }> };


export const CreateFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFisherfolk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFisherfolkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFisherfolkMutation, CreateFisherfolkMutationVariables>;
export const CreateVessselWithGearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVessselWithGear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVesselInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gears"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGearInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVesselWithGear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vessel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}}},{"kind":"Argument","name":{"kind":"Name","value":"gears"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gears"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVessselWithGearMutation, CreateVessselWithGearMutationVariables>;
export const QueryFisherfolkByRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryFisherfolkByRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolkByRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"registrationDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}},{"kind":"Field","name":{"kind":"Name","value":"contactNum"}},{"kind":"Field","name":{"kind":"Name","value":"livelihoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalFisherfolk"}}]}}]} as unknown as DocumentNode<QueryFisherfolkByRangeQuery, QueryFisherfolkByRangeQueryVariables>;
export const FisherfolkByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"cityMunicipality"}},{"kind":"Field","name":{"kind":"Name","value":"civilStatus"}},{"kind":"Field","name":{"kind":"Name","value":"contactNum"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"educationalBackground"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"numOfChildren"}},{"kind":"Field","name":{"kind":"Name","value":"personToNotify"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"ptnAddress"}},{"kind":"Field","name":{"kind":"Name","value":"ptnContactNum"}},{"kind":"Field","name":{"kind":"Name","value":"ptnRelationship"}},{"kind":"Field","name":{"kind":"Name","value":"registrationDate"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"residentYear"}},{"kind":"Field","name":{"kind":"Name","value":"salutation"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"livelihoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"yearJoined"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<FisherfolkByIdQuery, FisherfolkByIdQueryVariables>;
export const VesselQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VesselQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vessels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"yearBuilt"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}}]}}]}}]} as unknown as DocumentNode<VesselQueryQuery, VesselQueryQueryVariables>;
export const GearsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GearsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classification"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}}]}}]}}]} as unknown as DocumentNode<GearsQueryQuery, GearsQueryQueryVariables>;