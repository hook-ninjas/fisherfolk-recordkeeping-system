import { intArg, mutationField } from 'nexus';
import { createFisherfolk } from './Fisherfolk.resolver';
import CreateFisherfolkInput from '../../input/Fisherfolk.input';
import { nonNullArg } from '../../../../utils/utils';
import Fisherfolk from '../../model/objecTypes/Fisherfolk';
import { EducationalBackground, Gender, Salutation, SourceOfIncome } from '@prisma/client';
import { sub } from 'date-fns/fp';

const CreateFisherfolk = mutationField('createFisherfolk', {
  type: Fisherfolk,
  args: {
    data: CreateFisherfolkInput,
  },
  validate: ({ string, date, number, array, object, boolean }, { data }, context) => {
    const maxBirthDate = sub({ years: 19 })(new Date());
    const uploadLimit = 10000000;
    const salutations = Object.values(Salutation);
    const gender = Object.values(Gender);
    const educationalBackground = Object.values(EducationalBackground);
    const sourceOfIncome = Object.values(SourceOfIncome);

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
        mfvrNumber: string(),
        homeport: string(),
        name: string(),
        material: string(),
        type: string(),
        placeBuilt: string(),
        yearBuilt: string().matches(/^$|\d{4}$/),
        registeredLength: string().matches(/^[0-9]\d*(\.\d+)?$/),
        registeredDepth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        registeredBreadth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageLength: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageDepth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        tonnageBreadth: string().matches(/^[0-9]\d*(\.\d+)?$/),
        grossTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/),
        netTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/),
        engineMake: string(),
        serialNumber: string(),
        horsepower: string(),
      }),
    };
  },
  resolve: async (_, { data }, context) => {
    return await createFisherfolk(data, context);
  },
});

// const UpdateFisherfolk = mutationField('updateFisherfolk', {
//   type: Fisherfolk,
//   args: {
//     id: intArg(),
//     data: nonNullArg(CreateFisherfolkInput),
//   },
//   resolve: (_, args, ctx) => updateFisherfolk(args.id, args.data, ctx),
// });

export { CreateFisherfolk };
