import { enumType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

export const RegistrationType = enumType(gqlTypes.RegistrationType)
export const Salutation = enumType(gqlTypes.Salutation)
export const Gender = enumType(gqlTypes.Gender)
export const CivilStatus = enumType(gqlTypes.CivilStatus)
export const Nationality = enumType(gqlTypes.Nationality)
export const EducationalBackground = enumType(gqlTypes.EducationalBackground)
export const SourceOfIncome = enumType(gqlTypes.SourceOfIncome)
export const FisherfolkStatus = enumType(gqlTypes.FisherfolkStatus)
export const EngineType = enumType(gqlTypes.EngineType)
export const PermitStatus = enumType(gqlTypes.PermitStatus)

export default [
  RegistrationType,
  Salutation,
  Gender,
  CivilStatus,
  Nationality,
  EducationalBackground,
  SourceOfIncome,
  FisherfolkStatus,
  EngineType,
  PermitStatus
]