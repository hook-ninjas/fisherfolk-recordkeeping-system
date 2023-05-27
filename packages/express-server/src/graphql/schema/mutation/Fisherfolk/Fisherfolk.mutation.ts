import { intArg, mutationField } from 'nexus';
import {
  createFisherfolk,
  updateFisherfolk,
  archiveFisherfolk,
  restoreFisherfolk,
} from './Fisherfolk.resolver';
import {
  CreateFisherfolkInput,
  UpdateFisherfolkInput,
} from '../../input/Fisherfolk.input';
import { nonNullArg } from '../../../../utils/utils';
import Fisherfolk from '../../model/objecTypes/Fisherfolk';
import {
  EducationalBackground,
  Gender,
  Material,
  Salutation,
  SourceOfIncome,
} from '@prisma/client';
import { sub } from 'date-fns/fp';

const CreateFisherfolk = mutationField('createFisherfolk', {
  type: Fisherfolk,
  args: {
    data: CreateFisherfolkInput,
  },
  validate: (
    { string, date, number, array, object, boolean },
    { data },
    context
  ) => {
    const maxBirthDate = sub({ years: 19 })(new Date());
    const uploadLimit = 10000000;
    const salutations = Object.values(Salutation);
    const gender = Object.values(Gender);
    const educationalBackground = Object.values(EducationalBackground);
    const sourceOfIncome = Object.values(SourceOfIncome);
    const material = Object.values(Material);

    return {
      lastName: string().matches(/^[a-zA-Z]+$/),
      firstName: string().matches(/^[a-zA-Z]+$/),
      middleName: string().matches(/^[a-zA-Z]+$/),
      salutation: string().oneOf(salutations),
      contactNumber: string().matches(/^(09|\+639)\d{9}$/),
      barangay: string(),
      cityMunicipality: string(),
      province: string(),
      residentYear: number().moreThan(1500),
      gender: string().oneOf(gender),
      age: number().moreThan(17),
      dateOfBirth: date().max(maxBirthDate),
      placeOfBirth: string(),
      civilStatus: string(),
      educationalBackground: string().oneOf(educationalBackground),
      numOfChildren: number(),
      nationality: string(),
      personToNotify: string(),
      ptnRelationship: string(),
      ptnContactNum: string().matches(/^(09|\+639)\d{9}$/),
      ptnAddress: string(),
      mainFishingActivity: string().oneOf(sourceOfIncome),
      otherFishingActivity: array().of(string().oneOf(sourceOfIncome)).max(3),
      otherSourceOfIncome: string().matches(/^[a-zA-Z]+$/),
      organization: object()
        .nullable()
        .shape({
          name: string().matches(/^[a-zA-Z]+$/),
          yearJoined: number().moreThan(1500),
          position: string().matches(/(^[\sA-Za-z0-9]+$)/i),
        }),
      profilePhoto: object().shape({
        uri: string(),
        name: string(),
        size: number().max(uploadLimit),
        type: string().matches(/^.*(image\/jpeg|jpg|png)$/gm),
        isProfileImage: boolean(),
      }),
      files: array().of(
        object().shape({
          uri: string(),
          name: string(),
          size: number().max(uploadLimit),
          type: string().matches(/^.*(image\/jpeg|jpg|png)$/gm),
          isProfileImage: boolean(),
        })
      ),
      gears: array().of(string().matches(/^[a-zA-Z0-9]+$/)),
      vessel: object()
        .nullable()
        .shape({
          mfvrNumber: string(),
          homeport: string(),
          name: string(),
          material: string().oneOf(material),
          type: string(),
          placeBuilt: string(),
          yearBuilt: number().nullable(),
          registeredLength: number().nullable(),
          registeredDepth: number().nullable(),
          registeredBreadth: number().nullable(),
          tonnageLength: number().nullable(),
          tonnageDepth: number().nullable(),
          tonnageBreadth: number().nullable(),
          grossTonnage: number().nullable(),
          netTonnage: number().nullable(),
          engineMake: string(),
          serialNumber: string(),
          horsepower: number().nullable(),
          files: array().of(
            object().shape({
              uri: string(),
              name: string(),
              size: number().max(uploadLimit),
              type: string().matches(/^.*(image\/jpeg|jpg|png)$/gm),
              isProfileImage: boolean(),
            })
          ),
        }),
    };
  },
  resolve: async (_, { data }, context) => {
    return await createFisherfolk(data, context);
  },
});

const UpdateFisherfolk = mutationField('updateFisherfolk', {
  type: Fisherfolk,
  args: {
    fisherfolkId: intArg(),
    data: nonNullArg(UpdateFisherfolkInput),
  },
  resolve: (_, args, ctx) =>
    updateFisherfolk(args.fisherfolkId, args.data, ctx),
});

const ArchiveFisherfolk = mutationField('archiveFisherfolk', {
  type: Fisherfolk,
  args: {
    id: intArg(),
  },
  resolve: (_, args, ctx) => archiveFisherfolk(args.id, ctx),
});

const RestoreFisherfolk = mutationField('restreFisherfolk', {
  type: Fisherfolk,
  args: {
    id: intArg(),
  },
  resolve: (_, args, ctx) => restoreFisherfolk(args.id, ctx),
});

export {
  CreateFisherfolk,
  UpdateFisherfolk,
  ArchiveFisherfolk,
  RestoreFisherfolk,
};
