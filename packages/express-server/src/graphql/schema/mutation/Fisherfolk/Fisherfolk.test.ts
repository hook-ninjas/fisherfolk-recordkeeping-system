/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CivilStatus,
  EducationalBackground,
  Fisherfolk,
  Gender,
  Salutation,
  FisherfolkStatus,
  SourceOfIncome,
} from '@prisma/client';
import { Context, createMockContext } from '../../../context';
import { createFisherfolk } from './Fisherfolk.resolver';
import { MockContext } from '../../../../types/types';
import { NexusGenInputs } from '../../../generated/nexus';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('should create fisherfolk record ', () => {
  test('w/ organization and main livelihood only', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2015-05-15'),
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      organization: {
        name: 'Swordfish',
        yearJoined: 1990,
        position: 'member',
      },
      livelihoods: [
        { type: SourceOfIncome.CaptureFishing, isMain: true, description: '' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { organization, livelihoods } = input;
    const { yearJoined, position, name } = organization!;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
        organizations: {
          create: {
            yearJoined,
            position,
            organization: {
              connectOrCreate: {
                create: {
                  name,
                },
                where: {
                  name: name,
                },
              },
            },
          },
        },
      },
    });
  });

  test('w/ organziation and w/ main and 1 secondary livelihood', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2015-05-15'),
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      organization: {
        name: 'Swordfish',
        yearJoined: 1990,
        position: 'member',
      },
      livelihoods: [
        { type: SourceOfIncome.CaptureFishing, isMain: true, description: '' },
        { type: SourceOfIncome.FishVending, isMain: false, description: '' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { organization, livelihoods } = input;
    const { yearJoined, position, name } = organization!;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
        organizations: {
          create: {
            yearJoined,
            position,
            organization: {
              connectOrCreate: {
                create: {
                  name,
                },
                where: {
                  name: name,
                },
              },
            },
          },
        },
      },
    });
  });

  test('w/ organization and w/ main livelihood and multiple livelihoods', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2015-05-15'),
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'San Jose',
      firstName: 'Mark',
      middleName: 'Santos',
      appellation: 'Sr',
      age: 33,
      salutation: Salutation.Mr,
      barangay: 'Brgy. Sambag',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1987-08-12'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Male,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Nena San Jose',
      ptnRelationship: 'Spouse',
      ptnAddress: 'Brgy. Sambag, Jaro Iloilo City',
      ptnContactNum: '09991234567',
      organization: {
        name: 'Swordfish',
        yearJoined: 1990,
        position: 'member',
      },
      livelihoods: [
        { type: SourceOfIncome.CaptureFishing, isMain: true, description: '' },
        { type: SourceOfIncome.FishVending, isMain: false, description: '' },
        { type: SourceOfIncome.FishProcessing, isMain: false, description: '' },
        { type: SourceOfIncome.Aquaculture, isMain: false, description: '' },
        { type: SourceOfIncome.Others, isMain: false, description: 'Driver' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { organization, livelihoods } = input;
    const { yearJoined, position, name } = organization!;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
        organizations: {
          create: {
            yearJoined,
            position,
            organization: {
              connectOrCreate: {
                create: {
                  name,
                },
                where: {
                  name: name,
                },
              },
            },
          },
        },
      },
    });
  });

  test('w/out organization and w/ main livelihood only', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2016-05-20'),
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      organization: null,
      livelihoods: [
        { type: SourceOfIncome.FishVending, isMain: true, description: '' },
        { type: SourceOfIncome.FishProcessing, isMain: false, description: '' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { livelihoods } = input;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
      },
    });
  });

  test('w/out organization and w/ main livelihood and 1 secondary livelihoods', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2016-05-20'),
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      organization: null,
      livelihoods: [
        { type: SourceOfIncome.FishVending, isMain: true, description: '' },
        { type: SourceOfIncome.FishProcessing, isMain: false, description: '' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { livelihoods } = input;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
      },
    });
  });

  test('w/out organization and w/ main livelihood and multiple livelihoods', async () => {
    const fisherfolk: Fisherfolk = {
      id: BigInt(1),
      registrationDate: new Date('2016-05-20'),
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      status: FisherfolkStatus.Active,
      isArchive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCtx.prisma.fisherfolk.create.mockResolvedValue(fisherfolk);

    const input: NexusGenInputs['CreateFisherfolkInput'] = {
      lastName: 'Vasquez',
      firstName: 'Maria',
      middleName: 'Santa',
      appellation: '',
      age: 33,
      salutation: Salutation.Ms,
      barangay: 'Brgy. Timawa',
      cityMunicipality: 'Iloilo City',
      province: 'Iloilo',
      contactNum: '09991234567',
      residentYear: 1997,
      dateOfBirth: new Date('1990-09-11'),
      placeOfBirth: 'Iloilo City',
      religion: 'Catholic',
      gender: Gender.Female,
      civilStatus: CivilStatus.Single,
      numOfChildren: 0,
      nationality: 'filipino',
      educationalBackground: EducationalBackground.College,
      personToNotify: 'Pedro Santa',
      ptnRelationship: 'Brother',
      ptnAddress: 'Brgy. Timawa, Molo Iloilo City',
      ptnContactNum: '09991234567',
      organization: null,
      livelihoods: [
        { type: SourceOfIncome.FishVending, isMain: true, description: '' },
        { type: SourceOfIncome.FishProcessing, isMain: false, description: '' },
        { type: SourceOfIncome.CaptureFishing, isMain: false, description: '' },
        { type: SourceOfIncome.Aquaculture, isMain: false, description: '' },
        { type: SourceOfIncome.Others, isMain: false, description: 'Janitor' },
      ],
    };

    await expect(createFisherfolk(input, ctx)).resolves.toEqual(fisherfolk);

    const { livelihoods } = input;

    expect(ctx.prisma.fisherfolk.create).toBeCalledWith({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
      },
    });
  });
});
