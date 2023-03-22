import { intArg, mutationField } from 'nexus';
import { createFisherfolk, updateFisherfolk } from './Fisherfolk.resolver';
import CreateFisherfolkInput from '../../input/Fisherfolk.input';
import { nonNullArg } from '../../../../utils/utils';
import Fisherfolk from '../../model/objecTypes/Fisherfolk';
import {
  EducationalBackground,
  Gender,
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

    return {
      lastName: string()
        .matches(/^[a-zA-Z]+$/)
        .required(),
      firstName: string()
        .matches(/^[a-zA-Z]+$/)
        .required(),
      middleName: string()
        .matches(/^[a-zA-Z]+$/)
        .required(),
      salutation: string().oneOf(salutations).required(),
      contactNumber: string()
        .required()
        .matches(/^(09|\+639)\d{9}$/),
      barangay: string().required(),
      cityMunicipality: string().required(),
      province: string().required(),
      residentYear: number().moreThan(1500),
      gender: string().oneOf(gender).required(),
      age: number().moreThan(17),
      dateOfBirth: date().max(maxBirthDate).required(),
      placeOfBirth: string().required(),
      civilStatus: string().required(),
      educationalBackground: string().oneOf(educationalBackground).required(),
      numOfChildren: number(),
      nationality: string().required(),
      personToNotify: string().required(),
      ptnRelationship: string().required(),
      ptnContactNum: string()
        .required()
        .matches(/^(09|\+639)\d{9}$/),
      ptnAddress: string().required(),
      mainFishingActivity: string().oneOf(sourceOfIncome).required(),
      otherFishingActivity: array().of(string().oneOf(sourceOfIncome)).max(3),
      otherSourceOfIncome: string().matches(/^[a-zA-Z]+$/),
      orgName: string().matches(/^[a-zA-Z]+$/),
      orgMemberSince: number().moreThan(1500),
      orgPosition: string().matches(/(^[\sA-Za-z0-9]+$)/i),
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
      vessel: object().shape({
        registrationType: string(),
        mfvrNumber: string().required(),
        homeport: string().required(),
        name: string().required(),
        material: string().required(),
        type: string().required(),
        placeBuilt: string().required(),
        yearBuilt: string().matches(/^$|\d{4}$/),
        registeredLength: string().matches(/^[0-9]\d*(\.\d+)?$/),
        registeredDepth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        registeredBreadth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageLength: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageDepth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageBreadth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        grossTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/),
        netTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/),
        engineMake: string().required(),
        serialNumber: string().required(),
        horsepower: string(),
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
    id: intArg(),
    data: nonNullArg(CreateFisherfolkInput),
  },
  resolve: (_, args, ctx) => updateFisherfolk(args.id, args.data, ctx),
});

export { CreateFisherfolk, UpdateFisherfolk };
