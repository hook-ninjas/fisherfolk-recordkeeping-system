/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { ValidateResolver } from "nexus-validate"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateFisherfolkInput: { // input type
    age: number; // Int!
    appellation: string; // String!
    barangay: string; // String!
    cityMunicipality: string; // String!
    civilStatus: NexusGenEnums['CivilStatus']; // CivilStatus!
    contactNum: string; // String!
    dateOfBirth: NexusGenScalars['DateTime']; // DateTime!
    educationalBackground: NexusGenEnums['EducationalBackground']; // EducationalBackground!
    firstName: string; // String!
    gender: NexusGenEnums['Gender']; // Gender!
    lastName: string; // String!
    middleName: string; // String!
    nationality: string; // String!
    numOfChildren: number; // Int!
    personToNotify: string; // String!
    placeOfBirth: string; // String!
    province: string; // String!
    ptnAddress: string; // String!
    ptnContactNum: string; // String!
    ptnRelationship: string; // String!
    registrationDate: NexusGenScalars['DateTime']; // DateTime!
    religion: string; // String!
    residentYear: number; // Int!
    salutation: NexusGenEnums['Salutation']; // Salutation!
    status: NexusGenEnums['FisherfolkStatus']; // FisherfolkStatus!
  }
  CreateGearInput: { // input type
    classification: NexusGenEnums['GearClassification']; // GearClassification!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    type: string; // String!
  }
  CreateUserInput: { // input type
    password: string; // String!
    username: string; // String!
  }
  CreateVesselInput: { // input type
    engineMake: string; // String!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    grossTonnage: number; // Float!
    homeport: string; // String!
    horsepower: number; // Float!
    material: NexusGenEnums['Material']; // Material!
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage: number; // Float!
    placeBuilt: string; // String!
    registeredBreadth: number; // Float!
    registeredDepth: number; // Float!
    registeredLength: number; // Float!
    serialNumber: string; // String!
    tonnageBreadth: number; // Float!
    tonnageDepth: number; // Float!
    tonnageLength: number; // Float!
    type: string; // String!
    yearBuilt: number; // Int!
  }
}

export interface NexusGenEnums {
  CivilStatus: "LegallySeparated" | "Married" | "Single" | "Widowed"
  EducationalBackground: "College" | "Elementary" | "HighSchool" | "PostGraduate" | "Vocational"
  FisherfolkStatus: "Active" | "Deceased" | "Inactive"
  GearClassification: "FallingGear" | "GillNets" | "HookAndLine" | "LiftNets" | "Miscellaneous" | "Others" | "PotsAndTraps" | "ScoopNets" | "SeineNets"
  Gender: "Female" | "Male"
  Material: "Composite" | "Fiberglass" | "Wood"
  Salutation: "Mr" | "Mrs" | "Ms"
  SourceOfIncome: "AquaCulture" | "CaptureFishing" | "FishProcessing" | "FishVending" | "Others"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: any
  DateTime: any
}

export interface NexusGenObjects {
  Fisherfolk: { // root type
    age: number; // Int!
    appellation: string; // String!
    barangay: string; // String!
    cityMunicipality: string; // String!
    civilStatus: NexusGenEnums['CivilStatus']; // CivilStatus!
    contactNum: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateOfBirth: NexusGenScalars['DateTime']; // DateTime!
    educationalBackground: NexusGenEnums['EducationalBackground']; // EducationalBackground!
    firstName: string; // String!
    gender: NexusGenEnums['Gender']; // Gender!
    id: NexusGenScalars['BigInt']; // BigInt!
    isArchive: boolean; // Boolean!
    lastName: string; // String!
    middleName: string; // String!
    nationality: string; // String!
    numOfChildren: number; // Int!
    personToNotify: string; // String!
    placeOfBirth: string; // String!
    province: string; // String!
    ptnAddress: string; // String!
    ptnContactNum: string; // String!
    ptnRelationship: string; // String!
    registrationDate: NexusGenScalars['DateTime']; // DateTime!
    religion: string; // String!
    residentYear: number; // Int!
    salutation: NexusGenEnums['Salutation']; // Salutation!
    status: NexusGenEnums['FisherfolkStatus']; // FisherfolkStatus!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Gear: { // root type
    classification: NexusGenEnums['GearClassification']; // GearClassification!
    id: NexusGenScalars['BigInt']; // BigInt!
    type: string; // String!
  }
  GovernmentAid: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    slot: number; // Int!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Image: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    format: string; // String!
    id: string; // String!
    isArchive: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
    version: string; // String!
  }
  Livelihood: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    id: NexusGenScalars['BigInt']; // BigInt!
    isArchive: boolean; // Boolean!
    isMain: boolean; // Boolean!
    type: NexusGenEnums['SourceOfIncome']; // SourceOfIncome!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Organization: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    position: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearJoined: number; // Int!
  }
  Permit: { // root type
    certificateNumber: string; // String!
    expired: boolean; // Boolean!
    expiresOn?: NexusGenScalars['DateTime'] | null; // DateTime
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    registeredAt: NexusGenScalars['DateTime']; // DateTime!
    renewedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  Queue: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    governmentAidId: number; // Int!
    queueNumber: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    id: number; // Int!
    password: string; // String!
    username: string; // String!
  }
  Vessel: { // root type
    engineMake: string; // String!
    grossTonnage: number; // Float!
    homeport: string; // String!
    horsepower: number; // Float!
    id: NexusGenScalars['BigInt']; // BigInt!
    material: NexusGenEnums['Material']; // Material!
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage: number; // Float!
    placeBuilt: string; // String!
    registeredBreadth: number; // Float!
    registeredDepth: number; // Float!
    registeredLength: number; // Float!
    serialNumber: string; // String!
    tonnageBreadth: number; // Float!
    tonnageDepth: number; // Float!
    tonnageLength: number; // Float!
    type: string; // String!
    yearBuilt: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Fisherfolk: { // field return type
    age: number; // Int!
    appellation: string; // String!
    barangay: string; // String!
    cityMunicipality: string; // String!
    civilStatus: NexusGenEnums['CivilStatus']; // CivilStatus!
    contactNum: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateOfBirth: NexusGenScalars['DateTime']; // DateTime!
    educationalBackground: NexusGenEnums['EducationalBackground']; // EducationalBackground!
    firstName: string; // String!
    gears: Array<NexusGenRootTypes['Gear'] | null> | null; // [Gear]
    gender: NexusGenEnums['Gender']; // Gender!
    governmentAid: Array<NexusGenRootTypes['Queue'] | null> | null; // [Queue]
    id: NexusGenScalars['BigInt']; // BigInt!
    images: Array<NexusGenRootTypes['Image'] | null> | null; // [Image]
    isArchive: boolean; // Boolean!
    lastName: string; // String!
    livelihoods: Array<NexusGenRootTypes['Livelihood'] | null> | null; // [Livelihood]
    middleName: string; // String!
    nationality: string; // String!
    numOfChildren: number; // Int!
    organizations: Array<NexusGenRootTypes['Organization'] | null> | null; // [Organization]
    permit: NexusGenRootTypes['Permit'] | null; // Permit
    personToNotify: string; // String!
    placeOfBirth: string; // String!
    province: string; // String!
    ptnAddress: string; // String!
    ptnContactNum: string; // String!
    ptnRelationship: string; // String!
    registrationDate: NexusGenScalars['DateTime']; // DateTime!
    religion: string; // String!
    residentYear: number; // Int!
    salutation: NexusGenEnums['Salutation']; // Salutation!
    status: NexusGenEnums['FisherfolkStatus']; // FisherfolkStatus!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    vessels: Array<NexusGenRootTypes['Vessel'] | null> | null; // [Vessel]
  }
  Gear: { // field return type
    classification: NexusGenEnums['GearClassification']; // GearClassification!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    id: NexusGenScalars['BigInt']; // BigInt!
    type: string; // String!
  }
  GovernmentAid: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    slot: number; // Int!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Image: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolk: NexusGenRootTypes['Fisherfolk'] | null; // Fisherfolk
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    format: string; // String!
    id: string; // String!
    isArchive: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
    version: string; // String!
  }
  Livelihood: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    id: NexusGenScalars['BigInt']; // BigInt!
    isArchive: boolean; // Boolean!
    isMain: boolean; // Boolean!
    type: NexusGenEnums['SourceOfIncome']; // SourceOfIncome!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    createFisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    createUser: NexusGenRootTypes['User']; // User!
    createVesselWithGear: NexusGenRootTypes['Vessel']; // Vessel!
  }
  Organization: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolks: NexusGenRootTypes['Fisherfolk'][] | null; // [Fisherfolk!]
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    position: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearJoined: number; // Int!
  }
  Permit: { // field return type
    certificateNumber: string; // String!
    expired: boolean; // Boolean!
    expiresOn: NexusGenScalars['DateTime'] | null; // DateTime
    fisherfolk: NexusGenRootTypes['Fisherfolk'] | null; // Fisherfolk
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    registeredAt: NexusGenScalars['DateTime']; // DateTime!
    renewedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    fisherfolks: NexusGenRootTypes['Fisherfolk'][]; // [Fisherfolk!]!
  }
  Queue: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    fisherfolk: NexusGenRootTypes['Fisherfolk'] | null; // Fisherfolk
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    governmentAid: NexusGenRootTypes['GovernmentAid'] | null; // GovernmentAid
    governmentAidId: number; // Int!
    queueNumber: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // field return type
    id: number; // Int!
    password: string; // String!
    username: string; // String!
  }
  Vessel: { // field return type
    engineMake: string; // String!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    grossTonnage: number; // Float!
    homeport: string; // String!
    horsepower: number; // Float!
    id: NexusGenScalars['BigInt']; // BigInt!
    material: NexusGenEnums['Material']; // Material!
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage: number; // Float!
    placeBuilt: string; // String!
    registeredBreadth: number; // Float!
    registeredDepth: number; // Float!
    registeredLength: number; // Float!
    serialNumber: string; // String!
    tonnageBreadth: number; // Float!
    tonnageDepth: number; // Float!
    tonnageLength: number; // Float!
    type: string; // String!
    yearBuilt: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  Fisherfolk: { // field return type name
    age: 'Int'
    appellation: 'String'
    barangay: 'String'
    cityMunicipality: 'String'
    civilStatus: 'CivilStatus'
    contactNum: 'String'
    createdAt: 'DateTime'
    dateOfBirth: 'DateTime'
    educationalBackground: 'EducationalBackground'
    firstName: 'String'
    gears: 'Gear'
    gender: 'Gender'
    governmentAid: 'Queue'
    id: 'BigInt'
    images: 'Image'
    isArchive: 'Boolean'
    lastName: 'String'
    livelihoods: 'Livelihood'
    middleName: 'String'
    nationality: 'String'
    numOfChildren: 'Int'
    organizations: 'Organization'
    permit: 'Permit'
    personToNotify: 'String'
    placeOfBirth: 'String'
    province: 'String'
    ptnAddress: 'String'
    ptnContactNum: 'String'
    ptnRelationship: 'String'
    registrationDate: 'DateTime'
    religion: 'String'
    residentYear: 'Int'
    salutation: 'Salutation'
    status: 'FisherfolkStatus'
    updatedAt: 'DateTime'
    vessels: 'Vessel'
  }
  Gear: { // field return type name
    classification: 'GearClassification'
    fisherfolk: 'Fisherfolk'
    id: 'BigInt'
    type: 'String'
  }
  GovernmentAid: { // field return type name
    createdAt: 'DateTime'
    endDate: 'DateTime'
    id: 'Int'
    slot: 'Int'
    startDate: 'DateTime'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Image: { // field return type name
    createdAt: 'DateTime'
    fisherfolk: 'Fisherfolk'
    fisherfolkId: 'BigInt'
    format: 'String'
    id: 'String'
    isArchive: 'Boolean'
    name: 'String'
    updatedAt: 'DateTime'
    url: 'String'
    version: 'String'
  }
  Livelihood: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    fisherfolk: 'Fisherfolk'
    fisherfolkId: 'BigInt'
    id: 'BigInt'
    isArchive: 'Boolean'
    isMain: 'Boolean'
    type: 'SourceOfIncome'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    createFisherfolk: 'Fisherfolk'
    createUser: 'User'
    createVesselWithGear: 'Vessel'
  }
  Organization: { // field return type name
    createdAt: 'DateTime'
    fisherfolks: 'Fisherfolk'
    id: 'BigInt'
    name: 'String'
    position: 'String'
    updatedAt: 'DateTime'
    yearJoined: 'Int'
  }
  Permit: { // field return type name
    certificateNumber: 'String'
    expired: 'Boolean'
    expiresOn: 'DateTime'
    fisherfolk: 'Fisherfolk'
    fisherfolkId: 'BigInt'
    registeredAt: 'DateTime'
    renewedAt: 'DateTime'
  }
  Query: { // field return type name
    fisherfolks: 'Fisherfolk'
  }
  Queue: { // field return type name
    createdAt: 'DateTime'
    date: 'DateTime'
    fisherfolk: 'Fisherfolk'
    fisherfolkId: 'BigInt'
    governmentAid: 'GovernmentAid'
    governmentAidId: 'Int'
    queueNumber: 'Int'
    updatedAt: 'DateTime'
  }
  User: { // field return type name
    id: 'Int'
    password: 'String'
    username: 'String'
  }
  Vessel: { // field return type name
    engineMake: 'String'
    fisherfolk: 'Fisherfolk'
    grossTonnage: 'Float'
    homeport: 'String'
    horsepower: 'Float'
    id: 'BigInt'
    material: 'Material'
    mfvrNumber: 'String'
    name: 'String'
    netTonnage: 'Float'
    placeBuilt: 'String'
    registeredBreadth: 'Float'
    registeredDepth: 'Float'
    registeredLength: 'Float'
    serialNumber: 'String'
    tonnageBreadth: 'Float'
    tonnageDepth: 'Float'
    tonnageLength: 'Float'
    type: 'String'
    yearBuilt: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createFisherfolk: { // args
      data: NexusGenInputs['CreateFisherfolkInput']; // CreateFisherfolkInput!
    }
    createUser: { // args
      data: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    createVesselWithGear: { // args
      gears: NexusGenInputs['CreateGearInput'][]; // [CreateGearInput!]!
      vessel: NexusGenInputs['CreateVesselInput']; // CreateVesselInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}