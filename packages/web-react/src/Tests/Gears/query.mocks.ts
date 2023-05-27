import {
  GearClassification,
  GearsQueryDocument,
} from '../../graphql/generated';
import { MockedResponse } from '@apollo/client/testing';

export const GearsQueryMock: MockedResponse[] = [
  {
    request: {
      query: GearsQueryDocument,
    },
    result: {
      data: {
        gears: [
          {
            id: 201,
            classification: GearClassification.FallingGear,
            createdAt: new Date(2021, 9, 21),
            type: 'Simple-hand Line',
            fisherfolk: {
              firstName: 'Roy',
              lastName: 'Samonte',
              appellation: '',
              middleName: 'Rizal',
            },
          },
          {
            id: 189,
            classification: GearClassification.GillNets,
            createdAt: new Date(2021, 3, 21),
            type: 'Drift Gill Net',
            fisherfolk: {
              firstName: 'Fred',
              lastName: 'Vasquez',
              appellation: 'Jr',
              middleName: 'Cruz',
            },
          },
        ],
      },
    },
  },
];
