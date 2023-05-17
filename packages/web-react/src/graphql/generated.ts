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
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CivilStatus: CivilStatus;
  CreateFisherfolkInput: CreateFisherfolkInput;
  CreateGearInput: CreateGearInput;
  CreateImageInput: CreateImageInput;
  CreateProgramInput: CreateProgramInput;
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
  OrganizationInput: OrganizationInput;
  Permit: ResolverTypeWrapper<Permit>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<Queue>;
  Salutation: Salutation;
  SourceOfIncome: SourceOfIncome;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateFisherfolkInput: UpdateFisherfolkInput;
  UpdateProgramInput: UpdateProgramInput;
  UpdateVesselInput: UpdateVesselInput;
  User: ResolverTypeWrapper<User>;
  Vessel: ResolverTypeWrapper<Vessel>;
  livelihoodInput: LivelihoodInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  CreateFisherfolkInput: CreateFisherfolkInput;
  CreateGearInput: CreateGearInput;
  CreateImageInput: CreateImageInput;
  CreateProgramInput: CreateProgramInput;
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
  OrganizationInput: OrganizationInput;
  Permit: Permit;
  Query: {};
  Queue: Queue;
  String: Scalars['String'];
  UpdateFisherfolkInput: UpdateFisherfolkInput;
  UpdateProgramInput: UpdateProgramInput;
  UpdateVesselInput: UpdateVesselInput;
  User: User;
  Vessel: Vessel;
  livelihoodInput: LivelihoodInput;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  gears?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  governmentAid?: Resolver<Array<ResolversTypes['Queue']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  livelihoods?: Resolver<Array<ResolversTypes['Livelihood']>, ParentType, ContextType>;
  middleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numOfChildren?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  organizations?: Resolver<Array<ResolversTypes['Member']>, ParentType, ContextType>;
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
  vessels?: Resolver<Array<ResolversTypes['Vessel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GearResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gear'] = ResolversParentTypes['Gear']> = {
  classification?: Resolver<ResolversTypes['GearClassification'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GovernmentAidResolvers<ContextType = any, ParentType extends ResolversParentTypes['GovernmentAid'] = ResolversParentTypes['GovernmentAid']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fisherfolk?: Resolver<Maybe<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  fisherfolkId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  archiveFisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<MutationArchiveFisherfolkArgs, 'id'>>;
  archiveGear?: Resolver<ResolversTypes['Gear'], ParentType, ContextType, RequireFields<MutationArchiveGearArgs, 'id'>>;
  archiveVessel?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationArchiveVesselArgs, 'id'>>;
  createFisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<MutationCreateFisherfolkArgs, 'data'>>;
  createGears?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType, RequireFields<MutationCreateGearsArgs, 'gears'>>;
  createImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType, RequireFields<MutationCreateImageArgs, 'data'>>;
  createMultipleImage?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationCreateMultipleImageArgs, 'images'>>;
  createProgram?: Resolver<ResolversTypes['GovernmentAid'], ParentType, ContextType, RequireFields<MutationCreateProgramArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createVessel?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationCreateVesselArgs, 'vessel'>>;
  createVesselWithGear?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationCreateVesselWithGearArgs, 'gears' | 'vessel'>>;
  loginUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'data'>>;
  restoreGear?: Resolver<ResolversTypes['Gear'], ParentType, ContextType, RequireFields<MutationRestoreGearArgs, 'id'>>;
  restoreVessel?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationRestoreVesselArgs, 'id'>>;
  restreFisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<MutationRestreFisherfolkArgs, 'id'>>;
  updateFisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<MutationUpdateFisherfolkArgs, 'data' | 'fisherfolkId'>>;
  updateFisherfolkImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType, RequireFields<MutationUpdateFisherfolkImageArgs, 'data' | 'id' | 'url'>>;
  updateMfvr?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationUpdateMfvrArgs, 'id' | 'mfvrNum'>>;
  updateProgram?: Resolver<ResolversTypes['GovernmentAid'], ParentType, ContextType, RequireFields<MutationUpdateProgramArgs, 'data' | 'governmentAidId'>>;
  updateVessel?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<MutationUpdateVesselArgs, 'id' | 'vessel'>>;
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
  ArchiveFisherfolk?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  ArchiveGear?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType>;
  ArchiveVessel?: Resolver<Array<ResolversTypes['Vessel']>, ParentType, ContextType>;
  activeFisherFolk?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  barangayCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType, RequireFields<QueryFisherfolkArgs, 'id'>>;
  fisherfolkByRange?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType, RequireFields<QueryFisherfolkByRangeArgs, 'count' | 'start'>>;
  fisherfolkGears?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType, RequireFields<QueryFisherfolkGearsArgs, 'fisherfolkId'>>;
  fisherfolkGender?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryFisherfolkGenderArgs, 'gender'>>;
  fisherfolkPhoto?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<QueryFisherfolkPhotoArgs, 'fisherfolkId'>>;
  fisherfolkVessels?: Resolver<Array<ResolversTypes['Vessel']>, ParentType, ContextType, RequireFields<QueryFisherfolkVesselsArgs, 'fisherfolkId'>>;
  fisherfolks?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  fisherfolksWithUniqueBarangay?: Resolver<Array<ResolversTypes['Fisherfolk']>, ParentType, ContextType>;
  gears?: Resolver<Array<ResolversTypes['Gear']>, ParentType, ContextType>;
  governmentAid?: Resolver<ResolversTypes['GovernmentAid'], ParentType, ContextType, RequireFields<QueryGovernmentAidArgs, 'govtAidId'>>;
  governmentAidPhotos?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<QueryGovernmentAidPhotosArgs, 'govtAidId'>>;
  governmentAids?: Resolver<Array<ResolversTypes['GovernmentAid']>, ParentType, ContextType>;
  livelihoodCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryLivelihoodCountArgs, 'activity'>>;
  totalFisherfolk?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalFisherfolkGears?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryTotalFisherfolkGearsArgs, 'fisherfolkId'>>;
  totalFisherfolkVessels?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryTotalFisherfolkVesselsArgs, 'fisherfolkId'>>;
  totalGears?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPrograms?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVessels?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  vessel?: Resolver<ResolversTypes['Vessel'], ParentType, ContextType, RequireFields<QueryVesselArgs, 'id'>>;
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
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  engineMake?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fisherfolk?: Resolver<ResolversTypes['Fisherfolk'], ParentType, ContextType>;
  grossTonnage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  homeport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  horsepower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isArchive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType>;
  mfvrNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  netTonnage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  placeBuilt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registeredBreadth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  registeredDepth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  registeredLength?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tonnageBreadth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tonnageDepth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tonnageLength?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  yearBuilt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
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
  livelihoods: Array<LivelihoodInput>;
  middleName: Scalars['String'];
  nationality: Scalars['String'];
  numOfChildren: Scalars['Int'];
  organization?: InputMaybe<OrganizationInput>;
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
  photo?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateImageInput = {
  fisherfolkId?: InputMaybe<Scalars['BigInt']>;
  gear_id?: InputMaybe<Scalars['BigInt']>;
  government_aid_id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  text: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  vessel_id?: InputMaybe<Scalars['BigInt']>;
};

export type CreateProgramInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  slot: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateVesselInput = {
  engineMake: Scalars['String'];
  fisherfolkId: Scalars['BigInt'];
  grossTonnage?: InputMaybe<Scalars['Float']>;
  homeport: Scalars['String'];
  horsepower?: InputMaybe<Scalars['Float']>;
  material?: InputMaybe<Material>;
  mfvrNumber: Scalars['String'];
  name: Scalars['String'];
  netTonnage?: InputMaybe<Scalars['Float']>;
  placeBuilt: Scalars['String'];
  registeredBreadth?: InputMaybe<Scalars['Float']>;
  registeredDepth?: InputMaybe<Scalars['Float']>;
  registeredLength?: InputMaybe<Scalars['Float']>;
  serialNumber: Scalars['String'];
  tonnageBreadth?: InputMaybe<Scalars['Float']>;
  tonnageDepth?: InputMaybe<Scalars['Float']>;
  tonnageLength?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
  yearBuilt?: InputMaybe<Scalars['Int']>;
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
  gears: Array<Gear>;
  gender: Gender;
  governmentAid: Array<Queue>;
  id: Scalars['BigInt'];
  images: Array<Image>;
  isArchive: Scalars['Boolean'];
  lastName: Scalars['String'];
  livelihoods: Array<Livelihood>;
  middleName: Scalars['String'];
  nationality: Scalars['String'];
  numOfChildren: Scalars['Int'];
  organizations: Array<Member>;
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
  vessels: Array<Vessel>;
};

export enum FisherfolkStatus {
  Active = 'Active',
  Deceased = 'Deceased',
  Inactive = 'Inactive'
}

export type Gear = {
  __typename?: 'Gear';
  classification: GearClassification;
  createdAt: Scalars['DateTime'];
  fisherfolk: Fisherfolk;
  id: Scalars['BigInt'];
  isArchive: Scalars['Boolean'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  slot: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTime'];
  fisherfolk?: Maybe<Fisherfolk>;
  fisherfolkId: Scalars['BigInt'];
  id: Scalars['String'];
  isArchive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  archiveFisherfolk: Fisherfolk;
  archiveGear: Gear;
  archiveVessel: Vessel;
  createFisherfolk: Fisherfolk;
  createGears: Array<Gear>;
  createImage: Image;
  createMultipleImage: Array<Image>;
  createProgram: GovernmentAid;
  createUser: AuthPayload;
  createVessel: Vessel;
  createVesselWithGear: Vessel;
  loginUser: AuthPayload;
  restoreGear: Gear;
  restoreVessel: Vessel;
  restreFisherfolk: Fisherfolk;
  updateFisherfolk: Fisherfolk;
  updateFisherfolkImage: Image;
  updateMfvr: Vessel;
  updateProgram: GovernmentAid;
  updateVessel: Vessel;
};


export type MutationArchiveFisherfolkArgs = {
  id: Scalars['Int'];
};


export type MutationArchiveGearArgs = {
  id: Scalars['Int'];
};


export type MutationArchiveVesselArgs = {
  id: Scalars['Int'];
};


export type MutationCreateFisherfolkArgs = {
  data: CreateFisherfolkInput;
};


export type MutationCreateGearsArgs = {
  gears: Array<CreateGearInput>;
};


export type MutationCreateImageArgs = {
  data: CreateImageInput;
};


export type MutationCreateMultipleImageArgs = {
  images: Array<CreateImageInput>;
};


export type MutationCreateProgramArgs = {
  data: CreateProgramInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVesselArgs = {
  vessel: CreateVesselInput;
};


export type MutationCreateVesselWithGearArgs = {
  gears: Array<CreateGearInput>;
  vessel: CreateVesselInput;
};


export type MutationLoginUserArgs = {
  data: CreateUserInput;
};


export type MutationRestoreGearArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreVesselArgs = {
  id: Scalars['Int'];
};


export type MutationRestreFisherfolkArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateFisherfolkArgs = {
  data: UpdateFisherfolkInput;
  fisherfolkId: Scalars['Int'];
};


export type MutationUpdateFisherfolkImageArgs = {
  data: CreateImageInput;
  id: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUpdateMfvrArgs = {
  id: Scalars['Int'];
  mfvrNum: Scalars['String'];
};


export type MutationUpdateProgramArgs = {
  data: UpdateProgramInput;
  governmentAidId: Scalars['Int'];
};


export type MutationUpdateVesselArgs = {
  id: Scalars['Int'];
  vessel: UpdateVesselInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  id: Scalars['BigInt'];
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OrganizationInput = {
  name: Scalars['String'];
  position: Scalars['String'];
  yearJoined: Scalars['Int'];
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
  ArchiveFisherfolk: Array<Fisherfolk>;
  ArchiveGear: Array<Gear>;
  ArchiveVessel: Array<Vessel>;
  activeFisherFolk: Scalars['Int'];
  barangayCount: Scalars['Int'];
  fisherfolk: Fisherfolk;
  fisherfolkByRange: Array<Fisherfolk>;
  fisherfolkGears: Array<Gear>;
  fisherfolkGender: Scalars['Int'];
  fisherfolkPhoto: Array<Image>;
  fisherfolkVessels: Array<Vessel>;
  fisherfolks: Array<Fisherfolk>;
  fisherfolksWithUniqueBarangay: Array<Fisherfolk>;
  gears: Array<Gear>;
  governmentAid: GovernmentAid;
  governmentAidPhotos: Array<Image>;
  governmentAids: Array<GovernmentAid>;
  livelihoodCount: Scalars['Int'];
  totalFisherfolk: Scalars['Int'];
  totalFisherfolkGears: Scalars['Int'];
  totalFisherfolkVessels: Scalars['Int'];
  totalGears: Scalars['Int'];
  totalPrograms: Scalars['Int'];
  totalVessels: Scalars['Int'];
  user?: Maybe<User>;
  vessel: Vessel;
  vessels: Array<Vessel>;
};


export type QueryFisherfolkArgs = {
  id: Scalars['BigInt'];
};


export type QueryFisherfolkByRangeArgs = {
  count: Scalars['Int'];
  start: Scalars['Int'];
};


export type QueryFisherfolkGearsArgs = {
  fisherfolkId: Scalars['BigInt'];
};


export type QueryFisherfolkGenderArgs = {
  gender: Gender;
};


export type QueryFisherfolkPhotoArgs = {
  fisherfolkId: Scalars['BigInt'];
};


export type QueryFisherfolkVesselsArgs = {
  fisherfolkId: Scalars['BigInt'];
};


export type QueryGovernmentAidArgs = {
  govtAidId: Scalars['Int'];
};


export type QueryGovernmentAidPhotosArgs = {
  govtAidId: Scalars['Int'];
};


export type QueryLivelihoodCountArgs = {
  activity: SourceOfIncome;
};


export type QueryTotalFisherfolkGearsArgs = {
  fisherfolkId: Scalars['BigInt'];
};


export type QueryTotalFisherfolkVesselsArgs = {
  fisherfolkId: Scalars['BigInt'];
};


export type QueryVesselArgs = {
  id: Scalars['BigInt'];
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

export type UpdateFisherfolkInput = {
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
  livelihoods: Array<LivelihoodInput>;
  middleName: Scalars['String'];
  nationality: Scalars['String'];
  numOfChildren: Scalars['Int'];
  organizations: Array<InputMaybe<OrganizationInput>>;
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

export type UpdateProgramInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  slot: Scalars['Int'];
  title: Scalars['String'];
};

export type UpdateVesselInput = {
  engineMake: Scalars['String'];
  fisherfolkId: Scalars['BigInt'];
  grossTonnage?: InputMaybe<Scalars['Float']>;
  homeport: Scalars['String'];
  horsepower?: InputMaybe<Scalars['Float']>;
  material?: InputMaybe<Material>;
  mfvrNumber: Scalars['String'];
  name: Scalars['String'];
  netTonnage?: InputMaybe<Scalars['Float']>;
  placeBuilt: Scalars['String'];
  registeredBreadth?: InputMaybe<Scalars['Float']>;
  registeredDepth?: InputMaybe<Scalars['Float']>;
  registeredLength?: InputMaybe<Scalars['Float']>;
  serialNumber: Scalars['String'];
  tonnageBreadth?: InputMaybe<Scalars['Float']>;
  tonnageDepth?: InputMaybe<Scalars['Float']>;
  tonnageLength?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
  yearBuilt?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Vessel = {
  __typename?: 'Vessel';
  createdAt: Scalars['DateTime'];
  engineMake: Scalars['String'];
  fisherfolk: Fisherfolk;
  grossTonnage?: Maybe<Scalars['Float']>;
  homeport: Scalars['String'];
  horsepower?: Maybe<Scalars['Float']>;
  id: Scalars['BigInt'];
  isArchive: Scalars['Boolean'];
  material?: Maybe<Material>;
  mfvrNumber: Scalars['String'];
  name: Scalars['String'];
  netTonnage?: Maybe<Scalars['Float']>;
  placeBuilt: Scalars['String'];
  registeredBreadth?: Maybe<Scalars['Float']>;
  registeredDepth?: Maybe<Scalars['Float']>;
  registeredLength?: Maybe<Scalars['Float']>;
  serialNumber: Scalars['String'];
  tonnageBreadth?: Maybe<Scalars['Float']>;
  tonnageDepth?: Maybe<Scalars['Float']>;
  tonnageLength?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  yearBuilt?: Maybe<Scalars['Int']>;
};

export type LivelihoodInput = {
  description: Scalars['String'];
  isMain: Scalars['Boolean'];
  type: SourceOfIncome;
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

export type CreateVesselMutationVariables = Exact<{
  vessel: CreateVesselInput;
}>;


export type CreateVesselMutation = { __typename?: 'Mutation', createVessel: { __typename?: 'Vessel', id: any } };

export type CreateGearsMutationVariables = Exact<{
  gears: Array<CreateGearInput> | CreateGearInput;
}>;


export type CreateGearsMutation = { __typename?: 'Mutation', createGears: Array<{ __typename?: 'Gear', id: any }> };

export type CreateImageMutationVariables = Exact<{
  data: CreateImageInput;
}>;


export type CreateImageMutation = { __typename?: 'Mutation', createImage: { __typename?: 'Image', id: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: number, username: string, password: string } } };

export type LoginUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: number, username: string, password: string } } };

export type UpdateMfvrMutationVariables = Exact<{
  id: Scalars['Int'];
  mfvrNum: Scalars['String'];
}>;


export type UpdateMfvrMutation = { __typename?: 'Mutation', updateMfvr: { __typename?: 'Vessel', id: any, mfvrNumber: string, createdAt: any, name: string, fisherfolk: { __typename?: 'Fisherfolk', lastName: string, firstName: string, middleName: string, appellation: string } } };

export type UpdateFisherfolkMutationVariables = Exact<{
  fisherfolkId: Scalars['Int'];
  data: UpdateFisherfolkInput;
}>;


export type UpdateFisherfolkMutation = { __typename?: 'Mutation', updateFisherfolk: { __typename?: 'Fisherfolk', id: any } };

export type UpdateFisherfolkImageMutationVariables = Exact<{
  data: CreateImageInput;
  updateFisherfolkImageId: Scalars['String'];
  url: Scalars['String'];
}>;


export type UpdateFisherfolkImageMutation = { __typename?: 'Mutation', updateFisherfolkImage: { __typename?: 'Image', id: string, url: string } };

export type UpdateToArchiveFisherfolkMutationVariables = Exact<{
  archiveFisherfolkId: Scalars['Int'];
}>;


export type UpdateToArchiveFisherfolkMutation = { __typename?: 'Mutation', archiveFisherfolk: { __typename?: 'Fisherfolk', id: any } };

export type CreateProgramMutationVariables = Exact<{
  data: CreateProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'GovernmentAid', id: number, title: string } };

export type CreateMultipleProgramImageMutationVariables = Exact<{
  images: Array<CreateImageInput> | CreateImageInput;
}>;


export type CreateMultipleProgramImageMutation = { __typename?: 'Mutation', createMultipleImage: Array<{ __typename?: 'Image', id: string, url: string }> };

export type UpdateProgramMutationVariables = Exact<{
  governmentAidId: Scalars['Int'];
  data: UpdateProgramInput;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: { __typename?: 'GovernmentAid', id: number } };

export type UpdateVesselMutationVariables = Exact<{
  updateVesselId: Scalars['Int'];
  vessel: UpdateVesselInput;
}>;


export type UpdateVesselMutation = { __typename?: 'Mutation', updateVessel: { __typename?: 'Vessel', id: any } };

export type UpdateRestreFisherfolkMutationVariables = Exact<{
  restreFisherfolkId: Scalars['Int'];
}>;


export type UpdateRestreFisherfolkMutation = { __typename?: 'Mutation', restreFisherfolk: { __typename?: 'Fisherfolk', id: any } };

export type UpdateToArchiveGearMutationVariables = Exact<{
  archiveGearId: Scalars['Int'];
}>;


export type UpdateToArchiveGearMutation = { __typename?: 'Mutation', archiveGear: { __typename?: 'Gear', id: any } };

export type UpdateToArchiveVesselMutationVariables = Exact<{
  archiveVesselId: Scalars['Int'];
}>;


export type UpdateToArchiveVesselMutation = { __typename?: 'Mutation', archiveVessel: { __typename?: 'Vessel', id: any } };

export type RestoreGearMutationVariables = Exact<{
  restoreGearId: Scalars['Int'];
}>;


export type RestoreGearMutation = { __typename?: 'Mutation', restoreGear: { __typename?: 'Gear', id: any } };

export type RestoreVesselMutationVariables = Exact<{
  restoreVesselId: Scalars['Int'];
}>;


export type RestoreVesselMutation = { __typename?: 'Mutation', restoreVessel: { __typename?: 'Vessel', id: any } };

export type QueryFisherfolksQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryFisherfolksQuery = { __typename?: 'Query', totalFisherfolk: number, fisherfolks: Array<{ __typename?: 'Fisherfolk', id: any, registrationDate: any, firstName: string, lastName: string, middleName: string, appellation: string, contactNum: string, barangay: string, status: FisherfolkStatus, livelihoods: Array<{ __typename?: 'Livelihood', isMain: boolean, type: SourceOfIncome }> }>, fisherfolksWithUniqueBarangay: Array<{ __typename?: 'Fisherfolk', barangay: string }> };

export type FisherfolkByIdQueryVariables = Exact<{
  fisherfolkId: Scalars['BigInt'];
}>;


export type FisherfolkByIdQuery = { __typename?: 'Query', fisherfolk: { __typename?: 'Fisherfolk', age: number, appellation: string, barangay: string, cityMunicipality: string, civilStatus: CivilStatus, contactNum: string, dateOfBirth: any, educationalBackground: EducationalBackground, firstName: string, gender: Gender, id: any, lastName: string, middleName: string, nationality: string, numOfChildren: number, personToNotify: string, placeOfBirth: string, province: string, ptnAddress: string, ptnContactNum: string, ptnRelationship: string, registrationDate: any, religion: string, residentYear: number, salutation: Salutation, status: FisherfolkStatus, livelihoods: Array<{ __typename?: 'Livelihood', isMain: boolean, type: SourceOfIncome, description: string }>, organizations: Array<{ __typename?: 'Member', yearJoined: number, position: string, organization: { __typename?: 'Organization', name: string } }> }, fisherfolkPhoto: Array<{ __typename?: 'Image', id: string, url: string }> };

export type FisherfolkVesselsQueryVariables = Exact<{
  fisherfolkId: Scalars['BigInt'];
}>;


export type FisherfolkVesselsQuery = { __typename?: 'Query', fisherfolkVessels: Array<{ __typename?: 'Vessel', createdAt: any, engineMake: string, grossTonnage?: number | null, homeport: string, horsepower?: number | null, id: any, material?: Material | null, mfvrNumber: string, name: string, netTonnage?: number | null, placeBuilt: string, registeredBreadth?: number | null, registeredDepth?: number | null, registeredLength?: number | null, serialNumber: string, tonnageBreadth?: number | null, tonnageDepth?: number | null, tonnageLength?: number | null, type: string, yearBuilt?: number | null }> };

export type FisherfolkGearsQueryVariables = Exact<{
  fisherfolkId: Scalars['BigInt'];
}>;


export type FisherfolkGearsQuery = { __typename?: 'Query', fisherfolkGears: Array<{ __typename?: 'Gear', classification: GearClassification, createdAt: any, id: any, type: string }> };

export type VesselQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type VesselQueryQuery = { __typename?: 'Query', vessels: Array<{ __typename?: 'Vessel', id: any, mfvrNumber: string, createdAt: any, name: string, fisherfolk: { __typename?: 'Fisherfolk', lastName: string, firstName: string, middleName: string, appellation: string } }> };

export type GearsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GearsQueryQuery = { __typename?: 'Query', gears: Array<{ __typename?: 'Gear', id: any, classification: GearClassification, createdAt: any, type: string, fisherfolk: { __typename?: 'Fisherfolk', lastName: string, firstName: string, middleName: string, appellation: string } }> };

export type AuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number } | null };

export type LivelihoodCountQueryVariables = Exact<{
  activity: SourceOfIncome;
}>;


export type LivelihoodCountQuery = { __typename?: 'Query', livelihoodCount: number };

export type FisherfolkCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FisherfolkCountQuery = { __typename?: 'Query', totalFisherfolk: number, activeFisherFolk: number, totalGears: number, totalVessels: number, totalPrograms: number, barangayCount: number };

export type FisherfolkGenderCountQueryVariables = Exact<{
  gender: Gender;
}>;


export type FisherfolkGenderCountQuery = { __typename?: 'Query', fisherfolkGender: number };

export type GovernmentAidsQueryVariables = Exact<{ [key: string]: never; }>;


export type GovernmentAidsQuery = { __typename?: 'Query', governmentAids: Array<{ __typename?: 'GovernmentAid', id: number, title: string, slot: number, date: any, description: string }> };

export type GovernmentAidQueryVariables = Exact<{
  govtAidId: Scalars['Int'];
}>;


export type GovernmentAidQuery = { __typename?: 'Query', governmentAid: { __typename?: 'GovernmentAid', id: number, title: string, description: string, date: any, slot: number }, governmentAidPhotos: Array<{ __typename?: 'Image', id: string, url: string }> };

export type ArchiveFisherfolkQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchiveFisherfolkQuery = { __typename?: 'Query', totalFisherfolk: number, ArchiveFisherfolk: Array<{ __typename?: 'Fisherfolk', id: any, registrationDate: any, firstName: string, lastName: string, middleName: string, appellation: string, contactNum: string, barangay: string, status: FisherfolkStatus, livelihoods: Array<{ __typename?: 'Livelihood', isMain: boolean, type: SourceOfIncome }> }>, fisherfolksWithUniqueBarangay: Array<{ __typename?: 'Fisherfolk', barangay: string }> };

export type VesselQueryVariables = Exact<{
  vesselId: Scalars['BigInt'];
}>;


export type VesselQuery = { __typename?: 'Query', vessel: { __typename?: 'Vessel', createdAt: any, engineMake: string, grossTonnage?: number | null, homeport: string, horsepower?: number | null, id: any, material?: Material | null, mfvrNumber: string, name: string, netTonnage?: number | null, placeBuilt: string, registeredBreadth?: number | null, registeredDepth?: number | null, registeredLength?: number | null, serialNumber: string, tonnageBreadth?: number | null, tonnageDepth?: number | null, tonnageLength?: number | null, type: string, yearBuilt?: number | null, fisherfolk: { __typename?: 'Fisherfolk', id: any } } };

export type ArchiveGearQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchiveGearQuery = { __typename?: 'Query', ArchiveGear: Array<{ __typename?: 'Gear', id: any, classification: GearClassification, type: string, createdAt: any, updatedAt: any, isArchive: boolean }> };

export type ArchiveVesselQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchiveVesselQuery = { __typename?: 'Query', ArchiveVessel: Array<{ __typename?: 'Vessel', id: any, mfvrNumber: string, homeport: string, name: string, type: string, placeBuilt: string, yearBuilt?: number | null, material?: Material | null, registeredLength?: number | null, registeredBreadth?: number | null, registeredDepth?: number | null, tonnageLength?: number | null, tonnageBreadth?: number | null, tonnageDepth?: number | null, grossTonnage?: number | null, netTonnage?: number | null, engineMake: string, serialNumber: string, horsepower?: number | null, createdAt: any, updatedAt: any, isArchive: boolean }> };


export const CreateFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFisherfolk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFisherfolkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFisherfolkMutation, CreateFisherfolkMutationVariables>;
export const CreateVessselWithGearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVessselWithGear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVesselInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gears"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGearInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVesselWithGear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vessel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}}},{"kind":"Argument","name":{"kind":"Name","value":"gears"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gears"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVessselWithGearMutation, CreateVessselWithGearMutationVariables>;
export const CreateVesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVessel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVesselInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVessel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vessel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVesselMutation, CreateVesselMutationVariables>;
export const CreateGearsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGears"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gears"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGearInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gears"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gears"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGearsMutation, CreateGearsMutationVariables>;
export const CreateImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateImageMutation, CreateImageMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const UpdateMfvrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMFVR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mfvrNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMfvr"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"mfvrNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mfvrNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mfvrNumber"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMfvrMutation, UpdateMfvrMutationVariables>;
export const UpdateFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFisherfolk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFisherfolkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fisherfolkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateFisherfolkMutation, UpdateFisherfolkMutationVariables>;
export const UpdateFisherfolkImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFisherfolkImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateFisherfolkImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFisherfolkImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateFisherfolkImageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UpdateFisherfolkImageMutation, UpdateFisherfolkImageMutationVariables>;
export const UpdateToArchiveFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateToArchiveFisherfolk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"archiveFisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveFisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"archiveFisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateToArchiveFisherfolkMutation, UpdateToArchiveFisherfolkMutationVariables>;
export const CreateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateProgramMutation, CreateProgramMutationVariables>;
export const CreateMultipleProgramImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleProgramImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImageInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMultipleImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateMultipleProgramImageMutation, CreateMultipleProgramImageMutationVariables>;
export const UpdateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"governmentAidId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"governmentAidId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"governmentAidId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProgramMutation, UpdateProgramMutationVariables>;
export const UpdateVesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVessel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateVesselId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVesselInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVessel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateVesselId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vessel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vessel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVesselMutation, UpdateVesselMutationVariables>;
export const UpdateRestreFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRestreFisherfolk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"restreFisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restreFisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"restreFisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateRestreFisherfolkMutation, UpdateRestreFisherfolkMutationVariables>;
export const UpdateToArchiveGearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateToArchiveGear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"archiveGearId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveGear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"archiveGearId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateToArchiveGearMutation, UpdateToArchiveGearMutationVariables>;
export const UpdateToArchiveVesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateToArchiveVessel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"archiveVesselId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveVessel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"archiveVesselId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateToArchiveVesselMutation, UpdateToArchiveVesselMutationVariables>;
export const RestoreGearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreGear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"restoreGearId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreGear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"restoreGearId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RestoreGearMutation, RestoreGearMutationVariables>;
export const RestoreVesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreVessel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"restoreVesselId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreVessel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"restoreVesselId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RestoreVesselMutation, RestoreVesselMutationVariables>;
export const QueryFisherfolksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryFisherfolks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"registrationDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}},{"kind":"Field","name":{"kind":"Name","value":"contactNum"}},{"kind":"Field","name":{"kind":"Name","value":"livelihoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalFisherfolk"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolksWithUniqueBarangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barangay"}}]}}]}}]} as unknown as DocumentNode<QueryFisherfolksQuery, QueryFisherfolksQueryVariables>;
export const FisherfolkByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"cityMunicipality"}},{"kind":"Field","name":{"kind":"Name","value":"civilStatus"}},{"kind":"Field","name":{"kind":"Name","value":"contactNum"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"educationalBackground"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"numOfChildren"}},{"kind":"Field","name":{"kind":"Name","value":"personToNotify"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"ptnAddress"}},{"kind":"Field","name":{"kind":"Name","value":"ptnContactNum"}},{"kind":"Field","name":{"kind":"Name","value":"ptnRelationship"}},{"kind":"Field","name":{"kind":"Name","value":"registrationDate"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"residentYear"}},{"kind":"Field","name":{"kind":"Name","value":"salutation"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"livelihoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"yearJoined"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolkPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fisherfolkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<FisherfolkByIdQuery, FisherfolkByIdQueryVariables>;
export const FisherfolkVesselsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkVessels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolkVessels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fisherfolkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"engineMake"}},{"kind":"Field","name":{"kind":"Name","value":"grossTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"homeport"}},{"kind":"Field","name":{"kind":"Name","value":"horsepower"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"mfvrNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"netTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"placeBuilt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"registeredDepth"}},{"kind":"Field","name":{"kind":"Name","value":"registeredLength"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageDepth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageLength"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"yearBuilt"}}]}}]}}]} as unknown as DocumentNode<FisherfolkVesselsQuery, FisherfolkVesselsQueryVariables>;
export const FisherfolkGearsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkGears"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolkGears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fisherfolkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fisherfolkId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classification"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<FisherfolkGearsQuery, FisherfolkGearsQueryVariables>;
export const VesselQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VesselQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vessels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mfvrNumber"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}}]}}]}}]}}]} as unknown as DocumentNode<VesselQueryQuery, VesselQueryQueryVariables>;
export const GearsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GearsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classification"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}}]}}]}}]}}]} as unknown as DocumentNode<GearsQueryQuery, GearsQueryQueryVariables>;
export const AuthUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AuthUserQuery, AuthUserQueryVariables>;
export const LivelihoodCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LivelihoodCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SourceOfIncome"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livelihoodCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"activity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activity"}}}]}]}}]} as unknown as DocumentNode<LivelihoodCountQuery, LivelihoodCountQueryVariables>;
export const FisherfolkCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalFisherfolk"}},{"kind":"Field","name":{"kind":"Name","value":"activeFisherFolk"}},{"kind":"Field","name":{"kind":"Name","value":"totalGears"}},{"kind":"Field","name":{"kind":"Name","value":"totalVessels"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrograms"}},{"kind":"Field","name":{"kind":"Name","value":"barangayCount"}}]}}]} as unknown as DocumentNode<FisherfolkCountQuery, FisherfolkCountQueryVariables>;
export const FisherfolkGenderCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FisherfolkGenderCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Gender"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fisherfolkGender"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}}]}]}}]} as unknown as DocumentNode<FisherfolkGenderCountQuery, FisherfolkGenderCountQueryVariables>;
export const GovernmentAidsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GovernmentAids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"governmentAids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slot"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GovernmentAidsQuery, GovernmentAidsQueryVariables>;
export const GovernmentAidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GovernmentAid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"govtAidId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"governmentAid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"govtAidId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"govtAidId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"slot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"governmentAidPhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"govtAidId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"govtAidId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GovernmentAidQuery, GovernmentAidQueryVariables>;
export const ArchiveFisherfolkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArchiveFisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ArchiveFisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"registrationDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"appellation"}},{"kind":"Field","name":{"kind":"Name","value":"contactNum"}},{"kind":"Field","name":{"kind":"Name","value":"livelihoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalFisherfolk"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolksWithUniqueBarangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barangay"}}]}}]}}]} as unknown as DocumentNode<ArchiveFisherfolkQuery, ArchiveFisherfolkQueryVariables>;
export const VesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Vessel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vesselId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vessel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vesselId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"engineMake"}},{"kind":"Field","name":{"kind":"Name","value":"grossTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"homeport"}},{"kind":"Field","name":{"kind":"Name","value":"horsepower"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fisherfolk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"mfvrNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"netTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"placeBuilt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"registeredDepth"}},{"kind":"Field","name":{"kind":"Name","value":"registeredLength"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageDepth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageLength"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"yearBuilt"}}]}}]}}]} as unknown as DocumentNode<VesselQuery, VesselQueryVariables>;
export const ArchiveGearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArchiveGear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ArchiveGear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classification"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isArchive"}}]}}]}}]} as unknown as DocumentNode<ArchiveGearQuery, ArchiveGearQueryVariables>;
export const ArchiveVesselDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArchiveVessel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ArchiveVessel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mfvrNumber"}},{"kind":"Field","name":{"kind":"Name","value":"homeport"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"placeBuilt"}},{"kind":"Field","name":{"kind":"Name","value":"yearBuilt"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"registeredLength"}},{"kind":"Field","name":{"kind":"Name","value":"registeredBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"registeredDepth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageLength"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageBreadth"}},{"kind":"Field","name":{"kind":"Name","value":"tonnageDepth"}},{"kind":"Field","name":{"kind":"Name","value":"grossTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"netTonnage"}},{"kind":"Field","name":{"kind":"Name","value":"engineMake"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"horsepower"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isArchive"}}]}}]}}]} as unknown as DocumentNode<ArchiveVesselQuery, ArchiveVesselQueryVariables>;