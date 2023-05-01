/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from '@faker-js/faker';
import cloudinary from 'cloudinary';
import { Context, createMockContext } from '../../../../context';
import { MockContext } from '../../../../../types/types';
import { NexusGenInputs } from '../../../../generated/nexus';
import {
  convertActivities,
  determineGears,
  getVesselInfo,
} from '../../../../helpers/helpers';
import { createImage, createImages } from '../../Image/Image.resolver';
import { createFisherfolk } from '../Fisherfolk.resolver';

let mockCtx: MockContext;
let ctx: Context;

const {
  name,
  address,
  phone,
  datatype,
  date,
  image,
  word,
  company,
  random,
  vehicle,
} = faker;

jest.mock('cloudinary');

const mockUpload = jest.fn(
  async (imageURI: string, options?: cloudinary.UploadApiOptions) => {
    let value = {
      url: 'http://res.cloudinary.com/<cloudName>/image/upload/<version>/test-image.svg',
    };

    if (options != undefined) {
      const { folder } = options;
      value = {
        url: `http://res.cloudinary.com/<cloudName>/image/upload/<version>/${folder}/test-image.svg`,
      };
    }

    return Promise.resolve(value);
  }
);

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  (cloudinary.v2.uploader.upload as jest.Mock).mockImplementation(mockUpload);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createFisherfolk Resolver', () => {
  const fisherfolkInputs: NexusGenInputs['CreateFisherfolkInput'][] = [
    {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
    },
    {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'Aquaculture',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: '',
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
    },
    {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'FishProcessing',
      otherFishingActivity: [],
      otherSourceOfIncome: name.jobType(),
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
    },
    {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'FishVending',
      otherFishingActivity: [],
      otherSourceOfIncome: '',
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
    },
  ];

  it.each(fisherfolkInputs)(
    'should call Prisma client API create method with nexus generated fisherfolk as an argument',
    async (input) => {
      const expectedFfolkInfo = {
        lastName: input.lastName,
        firstName: input.firstName,
        middleName: input.middleName,
        appellation: input.appellation,
        age: input.age,
        salutation: input.salutation,
        barangay: input.barangay,
        cityMunicipality: input.cityMunicipality,
        province: input.province,
        contactNum: input.contactNum,
        residentYear: input.residentYear,
        dateOfBirth: input.dateOfBirth,
        placeOfBirth: input.placeOfBirth,
        religion: input.religion,
        gender: input.gender,
        civilStatus: input.civilStatus,
        numOfChildren: input.numOfChildren,
        nationality: input.nationality,
        educationalBackground: input.educationalBackground,
        personToNotify: input.personToNotify,
        ptnRelationship: input.ptnRelationship,
        ptnAddress: input.ptnAddress,
        ptnContactNum: input.ptnContactNum,
      };

      const expectedLivelihoods = convertActivities(
        input.mainFishingActivity,
        input.otherFishingActivity,
        input.otherSourceOfIncome
      );

      const expectedImages = [
        await createImage(input.profilePhoto),
        ...(await createImages(input.files)),
      ];

      const expectedPrismaArg = {
        data: {
          ...expectedFfolkInfo,
          livelihoods: {
            createMany: {
              data: {
                ...expectedLivelihoods,
              },
            },
          },
          images: {
            createMany: {
              data: {
                ...expectedImages,
              },
            },
          },
        },
      };

      await createFisherfolk(input, ctx);
      expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
      expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
        expectedPrismaArg
      );
    }
  );

  it('should call Prisma client API create method with nexus generated fisherfolk w/ gear as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      gears: [
        'Simple Hand Line',
        'Surface Set Gill Net',
        'Crab Lift Nets/Bintol',
        'CrabPots',
        'BeachSeine',
        'ManPushNets',
        'CastNet',
        'Spear',
      ],
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedGears = determineGears(input.gears!);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        gears: {
          createMany: {
            data: {
              ...expectedGears,
            },
          },
        },
      },
    };
    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ vessel as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      vessel: {
        mfvrNumber: random.alphaNumeric(),
        homeport: address.city(),
        name: `${word.adjective()} ${word.noun()}`,
        type: vehicle.type(),
        placeBuilt: address.state(),
        yearBuilt: datatype.number({ max: 2020, min: 1950 }),
        material: 'Composite',
        registeredLength: datatype.float(),
        registeredBreadth: datatype.float(),
        registeredDepth: datatype.float(),
        tonnageLength: datatype.float(),
        tonnageBreadth: datatype.float(),
        tonnageDepth: datatype.float(),
        grossTonnage: datatype.float(),
        netTonnage: datatype.float(),
        engineMake: vehicle.fuel(),
        serialNumber: random.numeric(),
        files: [
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
        ],
      },
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedVesselInfo = getVesselInfo(input.vessel!);

    const expectedVesselImages = await createImages(input.vessel!.files);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        vessels: {
          create: {
            ...expectedVesselInfo,
            images: {
              createMany: {
                data: {
                  ...expectedVesselImages,
                },
              },
            },
          },
        },
      },
    };

    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ gear and vessel as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      gears: [
        'Simple Hand Line',
        'Surface Set Gill Net',
        'Crab Lift Nets/Bintol',
        'CrabPots',
        'BeachSeine',
        'ManPushNets',
        'CastNet',
        'Spear',
      ],
      vessel: {
        mfvrNumber: random.alphaNumeric(20),
        homeport: address.city(),
        name: `${word.adjective()} ${word.noun()}`,
        type: vehicle.type(),
        placeBuilt: address.state(),
        yearBuilt: datatype.number({ max: 2020, min: 1950 }),
        material: 'Composite',
        registeredLength: datatype.float({ max: 100 }),
        registeredBreadth: datatype.float({ max: 100 }),
        registeredDepth: datatype.float({ max: 100 }),
        tonnageLength: datatype.float({ max: 100 }),
        tonnageBreadth: datatype.float({ max: 100 }),
        tonnageDepth: datatype.float({ max: 100 }),
        grossTonnage: datatype.float({ max: 100 }),
        netTonnage: datatype.float({ max: 100 }),
        engineMake: vehicle.fuel(),
        serialNumber: random.numeric(),
        files: [
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
        ],
      },
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedGears = determineGears(input.gears!);

    const expectedVesselInfo = getVesselInfo(input.vessel!);

    const expectedVesselImages = await createImages(input.vessel!.files);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        gears: {
          createMany: {
            data: {
              ...expectedGears,
            },
          },
        },
        vessels: {
          create: {
            ...expectedVesselInfo,
            images: {
              createMany: {
                data: {
                  ...expectedVesselImages,
                },
              },
            },
          },
        },
      },
    };

    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ an organization as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      organization: {
        name: company.name(),
        yearJoined: datatype.number({
          max: new Date().getFullYear(),
          min: 1980,
        }),
        position: name.jobTitle(),
      },
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        organizations: {
          create: {
            yearJoined: input.organization!.yearJoined,
            position: input.organization!.position,
            organization: {
              connectOrCreate: {
                create: {
                  name: input.organization!.name,
                },
                where: {
                  name: input.organization!.name,
                },
              },
            },
          },
        },
      },
    };
    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ an organization and gear as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      organization: {
        name: company.name(),
        yearJoined: datatype.number({
          max: new Date().getFullYear(),
          min: 1980,
        }),
        position: name.jobTitle(),
      },
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      gears: [
        'Simple Hand Line',
        'Surface Set Gill Net',
        'Crab Lift Nets/Bintol',
        'CrabPots',
        'BeachSeine',
        'ManPushNets',
        'CastNet',
        'Spear',
      ],
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedGears = determineGears(input.gears!);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        gears: {
          createMany: {
            data: {
              ...expectedGears,
            },
          },
        },
        organizations: {
          create: {
            yearJoined: input.organization!.yearJoined,
            position: input.organization!.position,
            organization: {
              connectOrCreate: {
                create: {
                  name: input.organization!.name,
                },
                where: {
                  name: input.organization!.name,
                },
              },
            },
          },
        },
      },
    };
    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ an organization and vessel as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      organization: {
        name: company.name(),
        yearJoined: datatype.number({
          max: new Date().getFullYear(),
          min: 1980,
        }),
        position: name.jobTitle(),
      },
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      vessel: {
        mfvrNumber: random.alphaNumeric(),
        homeport: address.city(),
        name: `${word.adjective()} ${word.noun()}`,
        type: vehicle.type(),
        placeBuilt: address.state(),
        yearBuilt: datatype.number({ max: 2020, min: 1950 }),
        material: 'Composite',
        registeredLength: datatype.float(),
        registeredBreadth: datatype.float(),
        registeredDepth: datatype.float(),
        tonnageLength: datatype.float(),
        tonnageBreadth: datatype.float(),
        tonnageDepth: datatype.float(),
        grossTonnage: datatype.float(),
        netTonnage: datatype.float(),
        engineMake: vehicle.fuel(),
        serialNumber: random.numeric(),
        files: [
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
        ],
      },
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedVesselInfo = getVesselInfo(input.vessel!);

    const expectedVesselImages = await createImages(input.vessel!.files);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        vessels: {
          create: {
            ...expectedVesselInfo,
            images: {
              createMany: {
                data: {
                  ...expectedVesselImages,
                },
              },
            },
          },
        },
        organizations: {
          create: {
            yearJoined: input.organization!.yearJoined,
            position: input.organization!.position,
            organization: {
              connectOrCreate: {
                create: {
                  name: input.organization!.name,
                },
                where: {
                  name: input.organization!.name,
                },
              },
            },
          },
        },
      },
    };

    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });

  it('should call Prisma client API create method with nexus generated fisherfolk w/ an organization, gear and vessel as an argument', async () => {
    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: name.lastName('male'),
      firstName: name.firstName('male'),
      middleName: name.middleName('male'),
      appellation: 'jr',
      age: datatype.number({ max: 60, min: 18 }),
      salutation: 'Mr',
      barangay: address.county(),
      cityMunicipality: address.city(),
      province: address.state(),
      contactNum: phone.number('+639#########'),
      residentYear: datatype.number({
        max: new Date().getFullYear(),
        min: 1980,
      }),
      dateOfBirth: date.birthdate({ mode: 'age', max: 60, min: 18 }),
      placeOfBirth: address.city(),
      religion: 'Catholic',
      gender: 'Male',
      civilStatus: 'Married',
      numOfChildren: datatype.number({ max: 10 }),
      nationality: 'Filipino',
      educationalBackground: 'PostGraduate',
      personToNotify: name.fullName({ sex: 'female' }),
      ptnRelationship: 'Wife',
      ptnAddress: address.streetAddress(),
      ptnContactNum: phone.number('+639#########'),
      mainFishingActivity: 'CaptureFishing',
      otherFishingActivity: ['FishProcessing', 'FishVending'],
      otherSourceOfIncome: name.jobType(),
      organization: {
        name: company.name(),
        yearJoined: datatype.number({
          max: new Date().getFullYear(),
          min: 1980,
        }),
        position: name.jobTitle(),
      },
      profilePhoto: {
        uri: image.dataUri(),
        name: word.noun(),
        size: datatype.float({ max: 10 }),
        type: 'image/svg',
        isProfileImage: true,
      },
      files: [
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
        {
          uri: image.dataUri(),
          name: word.noun(),
          size: datatype.float({ max: 10 }),
          type: 'image/svg',
          isProfileImage: false,
        },
      ],
      gears: [
        'Simple Hand Line',
        'Surface Set Gill Net',
        'Crab Lift Nets/Bintol',
        'CrabPots',
        'BeachSeine',
        'ManPushNets',
        'CastNet',
        'Spear',
      ],
      vessel: {
        mfvrNumber: random.alphaNumeric(),
        homeport: address.city(),
        name: `${word.adjective()} ${word.noun()}`,
        type: vehicle.type(),
        placeBuilt: address.state(),
        yearBuilt: datatype.number({ max: 2020, min: 1950 }),
        material: 'Composite',
        registeredLength: datatype.float(),
        registeredBreadth: datatype.float(),
        registeredDepth: datatype.float(),
        tonnageLength: datatype.float(),
        tonnageBreadth: datatype.float(),
        tonnageDepth: datatype.float(),
        grossTonnage: datatype.float(),
        netTonnage: datatype.float(),
        engineMake: vehicle.fuel(),
        serialNumber: random.numeric(),
        horsepower: datatype.float(),
        files: [
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
          {
            uri: image.dataUri(),
            name: word.noun(),
            size: datatype.float({ max: 10 }),
            type: 'image/svg',
            isProfileImage: false,
          },
        ],
      },
    };

    const expectedFfolkInfo = {
      lastName: input.lastName,
      firstName: input.firstName,
      middleName: input.middleName,
      appellation: input.appellation,
      age: input.age,
      salutation: input.salutation,
      barangay: input.barangay,
      cityMunicipality: input.cityMunicipality,
      province: input.province,
      contactNum: input.contactNum,
      residentYear: input.residentYear,
      dateOfBirth: input.dateOfBirth,
      placeOfBirth: input.placeOfBirth,
      religion: input.religion,
      gender: input.gender,
      civilStatus: input.civilStatus,
      numOfChildren: input.numOfChildren,
      nationality: input.nationality,
      educationalBackground: input.educationalBackground,
      personToNotify: input.personToNotify,
      ptnRelationship: input.ptnRelationship,
      ptnAddress: input.ptnAddress,
      ptnContactNum: input.ptnContactNum,
    };

    const expectedLivelihoods = convertActivities(
      input.mainFishingActivity,
      input.otherFishingActivity,
      input.otherSourceOfIncome
    );

    const expectedImages = [
      await createImage(input.profilePhoto),
      ...(await createImages(input.files)),
    ];

    const expectedGears = determineGears(input.gears!);

    const expectedVesselInfo = getVesselInfo(input.vessel!);

    const expectedVesselImages = await createImages(input.vessel!.files);

    const expectedPrismaArg = {
      data: {
        ...expectedFfolkInfo,
        livelihoods: {
          createMany: {
            data: {
              ...expectedLivelihoods,
            },
          },
        },
        images: {
          createMany: {
            data: {
              ...expectedImages,
            },
          },
        },
        gears: {
          createMany: {
            data: {
              ...expectedGears,
            },
          },
        },
        vessels: {
          create: {
            ...expectedVesselInfo,
            images: {
              createMany: {
                data: {
                  ...expectedVesselImages,
                },
              },
            },
          },
        },
        organizations: {
          create: {
            yearJoined: input.organization!.yearJoined,
            position: input.organization!.position,
            organization: {
              connectOrCreate: {
                create: {
                  name: input.organization!.name,
                },
                where: {
                  name: input.organization!.name,
                },
              },
            },
          },
        },
      },
    };

    await createFisherfolk(input, ctx);

    expect(mockCtx.prisma.fisherfolk.create).toHaveReturned();
    expect(mockCtx.prisma.fisherfolk.create).toHaveBeenCalledWith(
      expectedPrismaArg
    );
  });
});
