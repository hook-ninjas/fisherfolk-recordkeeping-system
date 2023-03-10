import {
  QueryFisherfolksDocument,
  SourceOfIncome,
  FisherfolkStatus,
  FisherfolkByIdDocument,
  EducationalBackground,
  CivilStatus,
  Gender,
  Salutation,
} from '../../graphql/generated';
import { MockedResponse } from '@apollo/client/testing';

export const FisherfolksQueryMock: MockedResponse[] = [
  {
    request: {
      query: QueryFisherfolksDocument,
    },
    result: {
      data: {
        fisherfolks: [
          {
            id: 111,
            appellation: '',
            firstName: 'May',
            lastName: 'Flores',
            middleName: 'Sevilla',
            registrationDate: new Date(2021, 3, 15),
            livelihoods: [
              {
                isMain: true,
                type: SourceOfIncome.CaptureFishing,
              },
            ],
            contactNum: '09993716821',
            barangay: 'Brgy. Simon Ledesma',
            status: FisherfolkStatus.Active,
          },
          {
            id: 102,
            firstName: 'Mark',
            appellation: '',
            lastName: 'Bonifacio',
            middleName: 'Cornejo',
            registrationDate: new Date(2021, 2, 17),
            livelihoods: [
              {
                isMain: true,
                type: SourceOfIncome.Aquaculture,
              },
            ],
            contactNum: '09293717121',
            barangay: 'Brgy. Bito-on',
            status: FisherfolkStatus.Inactive,
          },
        ],
        totalFisherfolk: 2,
        fisherfolksWithUniqueBarangay: [
          {
            barangay: 'Brgy. Buhang',
          },
          {
            barangay: 'Brgy. Santa Cruz',
          },
          {
            barangay: 'Brgy. Kauswagan',
          },
        ],
      },
    },
  },
  {
    request: {
      query: FisherfolkByIdDocument,
      variables: {
        fisherfolkId: 101,
      },
    },
    result: {
      data: {
        fisherfolk: {
          age: 46,
          appellation: '',
          barangay: 'Brgy. Balabago',
          cityMunicipality: 'Iloilo City',
          civilStatus: CivilStatus.Married,
          contactNum: '09998018540',
          dateOfBirth: new Date(1985, 5, 23),
          educationalBackground: EducationalBackground.College,
          firstName: 'Mary Jane',
          gender: Gender.Female,
          id: 101,
          lastName: 'Martin',
          middleName: 'Shelbe',
          nationality: 'Filipino',
          numOfChildren: 0,
          personToNotify: 'Col Martin',
          placeOfBirth: 'Iloilo',
          province: 'Iloilo',
          ptnAddress: 'Iloilo City',
          ptnContactNum: '09293617384',
          ptnRelationship: 'Spouse',
          registrationDate: new Date(2022, 6, 21),
          religion: 'Catholic',
          residentYear: 2000,
          salutation: Salutation.Mrs,
          status: FisherfolkStatus.Active,
          livelihoods: [
            {
              isMain: true,
              type: SourceOfIncome.FishVending,
              description: '',
            },
          ],
          organizations: [
            {
              organization: {
                name: 'FishCom',
              },
              position: 'Member',
              yearJoined: 2017,
            },
          ],
        },
      },
    },
  },
];
