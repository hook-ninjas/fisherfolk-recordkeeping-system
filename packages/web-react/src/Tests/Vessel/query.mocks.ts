import { MockedResponse } from '@apollo/client/testing';
import { VesselQueryDocument } from '../../graphql/generated';

export const VesselsQueryMock: MockedResponse[] = [
  {
    request: {
      query: VesselQueryDocument,
    },
    result: {
      data: {
        vessels: [
          {
            createdAt: new Date(2021, 6, 20),
            fisherfolk: {
              firstName: 'Mel',
              lastName: 'Green',
              appellation: '',
              middleName: 'Rio',
            },
            id: 125,
            mfvrNumber: '2021-0075',
            name: 'JJ',
          },
          {
            createdAt: new Date(2021, 1, 15),
            fisherfolk: {
              firstName: 'Kai',
              lastName: 'Yu',
              appellation: 'Jr',
              middleName: 'French',
            },
            id: 101,
            mfvrNumber: '2021-0015',
            name: 'Sky',
          },
        ],
      },
    },
  },
];
