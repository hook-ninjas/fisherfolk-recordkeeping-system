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
    livelihoods: NexusGenInputs['livelihoodInput'][]; // [livelihoodInput!]!
    middleName: string; // String!
    nationality: string; // String!
    numOfChildren: number; // Int!
    organization?: NexusGenInputs['OrganizationInput'] | null; // OrganizationInput
    personToNotify: string; // String!
    placeOfBirth: string; // String!
    province: string; // String!
    ptnAddress: string; // String!
    ptnContactNum: string; // String!
    ptnRelationship: string; // String!
    religion: string; // String!
    residentYear: number; // Int!
    salutation: NexusGenEnums['Salutation']; // Salutation!
  }
  CreateGearInput: { // input type
    classification: NexusGenEnums['GearClassification']; // GearClassification!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    photo?: string | null; // String
    type: string; // String!
  }
  CreateImageInput: { // input type
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    gear_id?: NexusGenScalars['BigInt'] | null; // BigInt
    name: string; // String!
    text: string; // String!
    updated_at: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
    vessel_id?: NexusGenScalars['BigInt'] | null; // BigInt
  }
  CreateUserInput: { // input type
    password: string; // String!
    username: string; // String!
  }
  CreateVesselInput: { // input type
    engineMake: string; // String!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    grossTonnage?: number | null; // Float
    homeport: string; // String!
    horsepower?: number | null; // Float
    material?: NexusGenEnums['Material'] | null; // Material
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage?: number | null; // Float
    placeBuilt: string; // String!
    registeredBreadth?: number | null; // Float
    registeredDepth?: number | null; // Float
    registeredLength?: number | null; // Float
    serialNumber: string; // String!
    tonnageBreadth?: number | null; // Float
    tonnageDepth?: number | null; // Float
    tonnageLength?: number | null; // Float
    type: string; // String!
    yearBuilt?: number | null; // Int
  }
  OrganizationInput: { // input type
    name: string; // String!
    position: string; // String!
    yearJoined: number; // Int!
  }
  livelihoodInput: { // input type
    description: string; // String!
    isMain: boolean; // Boolean!
    type: NexusGenEnums['SourceOfIncome']; // SourceOfIncome!
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
  SourceOfIncome: "Aquaculture" | "CaptureFishing" | "FishProcessing" | "FishVending" | "Others"
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
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
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
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: NexusGenScalars['BigInt']; // BigInt!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
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
    id: string; // String!
    isArchive: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
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
  Member: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    organizationId: number; // Int!
    position: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearJoined: number; // Int!
  }
  Mutation: {};
  Organization: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
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
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    engineMake: string; // String!
    grossTonnage?: number | null; // Float
    homeport: string; // String!
    horsepower?: number | null; // Float
    id: NexusGenScalars['BigInt']; // BigInt!
    material?: NexusGenEnums['Material'] | null; // Material
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage?: number | null; // Float
    placeBuilt: string; // String!
    registeredBreadth?: number | null; // Float
    registeredDepth?: number | null; // Float
    registeredLength?: number | null; // Float
    serialNumber: string; // String!
    tonnageBreadth?: number | null; // Float
    tonnageDepth?: number | null; // Float
    tonnageLength?: number | null; // Float
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearBuilt?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
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
    gears: NexusGenRootTypes['Gear'][]; // [Gear!]!
    gender: NexusGenEnums['Gender']; // Gender!
    governmentAid: NexusGenRootTypes['Queue'][]; // [Queue!]!
    id: NexusGenScalars['BigInt']; // BigInt!
    images: NexusGenRootTypes['Image'][]; // [Image!]!
    isArchive: boolean; // Boolean!
    lastName: string; // String!
    livelihoods: NexusGenRootTypes['Livelihood'][]; // [Livelihood!]!
    middleName: string; // String!
    nationality: string; // String!
    numOfChildren: number; // Int!
    organizations: NexusGenRootTypes['Member'][]; // [Member!]!
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
    vessels: NexusGenRootTypes['Vessel'][]; // [Vessel!]!
  }
  Gear: { // field return type
    classification: NexusGenEnums['GearClassification']; // GearClassification!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    id: NexusGenScalars['BigInt']; // BigInt!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
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
    id: string; // String!
    isArchive: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
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
  Member: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    fisherfolks: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    organization: NexusGenRootTypes['Organization']; // Organization!
    organizationId: number; // Int!
    position: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearJoined: number; // Int!
  }
  Mutation: { // field return type
    createFisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    createGears: NexusGenRootTypes['Gear'][]; // [Gear!]!
    createImage: NexusGenRootTypes['Image']; // Image!
    createUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    createVessel: NexusGenRootTypes['Vessel']; // Vessel!
    createVesselWithGear: NexusGenRootTypes['Vessel']; // Vessel!
    loginUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateFisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    updateMfvr: NexusGenRootTypes['Vessel']; // Vessel!
  }
  Organization: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: NexusGenScalars['BigInt']; // BigInt!
    members: Array<NexusGenRootTypes['Member'] | null> | null; // [Member]
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Permit: { // field return type
    certificateNumber: string; // String!
    expired: boolean; // Boolean!
    expiresOn: NexusGenScalars['DateTime'] | null; // DateTime
    fisherfolk: NexusGenRootTypes['Fisherfolk'] | null; // Fisherfolk
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    gears: Array<NexusGenRootTypes['Gear'] | null> | null; // [Gear]
    registeredAt: NexusGenScalars['DateTime']; // DateTime!
    renewedAt: NexusGenScalars['DateTime']; // DateTime!
    vessels: Array<NexusGenRootTypes['Vessel'] | null> | null; // [Vessel]
  }
  Query: { // field return type
    activeFisherFolk: number; // Int!
    barangayCount: number; // Int!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    fisherfolkByRange: NexusGenRootTypes['Fisherfolk'][]; // [Fisherfolk!]!
    fisherfolkGears: NexusGenRootTypes['Gear'][]; // [Gear!]!
    fisherfolkGender: number; // Int!
    fisherfolkVessels: NexusGenRootTypes['Vessel'][]; // [Vessel!]!
    fisherfolks: NexusGenRootTypes['Fisherfolk'][]; // [Fisherfolk!]!
    fisherfolksWithUniqueBarangay: NexusGenRootTypes['Fisherfolk'][]; // [Fisherfolk!]!
    gears: NexusGenRootTypes['Gear'][]; // [Gear!]!
    livelihoodCount: number; // Int!
    totalFisherfolk: number; // Int!
    totalFisherfolkGears: number; // Int!
    totalFisherfolkVessels: number; // Int!
    totalGears: number; // Int!
    totalVessels: number; // Int!
    user: NexusGenRootTypes['User'] | null; // User
    vessels: NexusGenRootTypes['Vessel'][]; // [Vessel!]!
  }
  Queue: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    governmentAid: NexusGenRootTypes['GovernmentAid']; // GovernmentAid!
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
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    engineMake: string; // String!
    fisherfolk: NexusGenRootTypes['Fisherfolk']; // Fisherfolk!
    grossTonnage: number | null; // Float
    homeport: string; // String!
    horsepower: number | null; // Float
    id: NexusGenScalars['BigInt']; // BigInt!
    material: NexusGenEnums['Material'] | null; // Material
    mfvrNumber: string; // String!
    name: string; // String!
    netTonnage: number | null; // Float
    placeBuilt: string; // String!
    registeredBreadth: number | null; // Float
    registeredDepth: number | null; // Float
    registeredLength: number | null; // Float
    serialNumber: string; // String!
    tonnageBreadth: number | null; // Float
    tonnageDepth: number | null; // Float
    tonnageLength: number | null; // Float
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    yearBuilt: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
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
    organizations: 'Member'
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
    createdAt: 'DateTime'
    fisherfolk: 'Fisherfolk'
    id: 'BigInt'
    type: 'String'
    updatedAt: 'DateTime'
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
    id: 'String'
    isArchive: 'Boolean'
    name: 'String'
    updatedAt: 'DateTime'
    url: 'String'
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
  Member: { // field return type name
    createdAt: 'DateTime'
    fisherfolkId: 'BigInt'
    fisherfolks: 'Fisherfolk'
    organization: 'Organization'
    organizationId: 'Int'
    position: 'String'
    updatedAt: 'DateTime'
    yearJoined: 'Int'
  }
  Mutation: { // field return type name
    createFisherfolk: 'Fisherfolk'
    createGears: 'Gear'
    createImage: 'Image'
    createUser: 'AuthPayload'
    createVessel: 'Vessel'
    createVesselWithGear: 'Vessel'
    loginUser: 'AuthPayload'
    updateFisherfolk: 'Fisherfolk'
    updateMfvr: 'Vessel'
  }
  Organization: { // field return type name
    createdAt: 'DateTime'
    id: 'BigInt'
    members: 'Member'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Permit: { // field return type name
    certificateNumber: 'String'
    expired: 'Boolean'
    expiresOn: 'DateTime'
    fisherfolk: 'Fisherfolk'
    fisherfolkId: 'BigInt'
    gears: 'Gear'
    registeredAt: 'DateTime'
    renewedAt: 'DateTime'
    vessels: 'Vessel'
  }
  Query: { // field return type name
    activeFisherFolk: 'Int'
    barangayCount: 'Int'
    fisherfolk: 'Fisherfolk'
    fisherfolkByRange: 'Fisherfolk'
    fisherfolkGears: 'Gear'
    fisherfolkGender: 'Int'
    fisherfolkVessels: 'Vessel'
    fisherfolks: 'Fisherfolk'
    fisherfolksWithUniqueBarangay: 'Fisherfolk'
    gears: 'Gear'
    livelihoodCount: 'Int'
    totalFisherfolk: 'Int'
    totalFisherfolkGears: 'Int'
    totalFisherfolkVessels: 'Int'
    totalGears: 'Int'
    totalVessels: 'Int'
    user: 'User'
    vessels: 'Vessel'
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
    createdAt: 'DateTime'
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
    updatedAt: 'DateTime'
    yearBuilt: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createFisherfolk: { // args
      data: NexusGenInputs['CreateFisherfolkInput']; // CreateFisherfolkInput!
    }
    createGears: { // args
      gears: NexusGenInputs['CreateGearInput'][]; // [CreateGearInput!]!
    }
    createImage: { // args
      data: NexusGenInputs['CreateImageInput']; // CreateImageInput!
    }
    createUser: { // args
      data: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    createVessel: { // args
      vessel: NexusGenInputs['CreateVesselInput']; // CreateVesselInput!
    }
    createVesselWithGear: { // args
      gears: NexusGenInputs['CreateGearInput'][]; // [CreateGearInput!]!
      vessel: NexusGenInputs['CreateVesselInput']; // CreateVesselInput!
    }
    loginUser: { // args
      data: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    updateFisherfolk: { // args
      data: NexusGenInputs['CreateFisherfolkInput']; // CreateFisherfolkInput!
      id: number; // Int!
    }
    updateMfvr: { // args
      id: number; // Int!
      mfvrNum: string; // String!
    }
  }
  Query: {
    fisherfolk: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    fisherfolkByRange: { // args
      count: number; // Int!
      start: number; // Int!
    }
    fisherfolkGears: { // args
      count: number; // Int!
      fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
      start: number; // Int!
    }
    fisherfolkGender: { // args
      gender: NexusGenEnums['Gender']; // Gender!
    }
    fisherfolkVessels: { // args
      count: number; // Int!
      fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
      start: number; // Int!
    }
    livelihoodCount: { // args
      activity: NexusGenEnums['SourceOfIncome']; // SourceOfIncome!
    }
    totalFisherfolkGears: { // args
      fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
    }
    totalFisherfolkVessels: { // args
      fisherfolkId: NexusGenScalars['BigInt']; // BigInt!
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