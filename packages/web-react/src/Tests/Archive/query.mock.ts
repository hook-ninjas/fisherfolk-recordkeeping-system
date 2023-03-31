import { MockedResponse } from '@apollo/client/testing';
import { ArchiveFisherfolkDocument, FisherfolkStatus, SourceOfIncome } from '../../graphql/generated';

export const ArchiveFisherfolksQueryMock: MockedResponse[] = [
  {
    request: {
      query: ArchiveFisherfolkDocument,
    },
    result: {
      data: {
        ArchiveFisherfolk: [
          {
            id: 19,
            appellation: '',
            firstName: 'Jenny',
            lastName: 'Suelan',
            middleName: 'Manimbayan',
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
        ]
      }
    }
  }
];