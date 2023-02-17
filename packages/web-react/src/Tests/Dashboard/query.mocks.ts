import { MockedResponse } from '@apollo/client/testing';
import {
  BarangayCountDocument,
  LivelihoodCountDocument,
  SourceOfIncome,
  TotalGearsDocument,
} from '../../graphql/generated';

export const DashboardQueryMock: MockedResponse[] = [
  {
    request: {
      query: TotalGearsDocument,
    },
    result: {
      data: {
        totalGears: 540,
      },
    },
  },
  {
    request: {
      query: BarangayCountDocument,
    },
    result: {
      data: {
        barangayCount: 25,
      },
    },
  },
  {
    request: {
      query: LivelihoodCountDocument,
      variables: {
        activity: SourceOfIncome.Aquaculture,
      },
    },
    result: {
      data: {
        livelihoodCount: 345,
      },
    },
  },
  {
    request: {
      query: LivelihoodCountDocument,
      variables: {
        activity: SourceOfIncome.CaptureFishing,
      },
    },
    result: {
      data: {
        livelihoodCount: 490,
      },
    },
  },
  {
    request: {
      query: LivelihoodCountDocument,
      variables: {
        activity: SourceOfIncome.FishProcessing,
      },
    },
    result: {
      data: {
        livelihoodCount: 165,
      },
    },
  },
  {
    request: {
      query: LivelihoodCountDocument,
      variables: {
        activity: SourceOfIncome.FishVending,
      },
    },
    result: {
      data: {
        livelihoodCount: 248,
      },
    },
  },
  {
    request: {
      query: LivelihoodCountDocument,
      variables: {
        activity: SourceOfIncome.Others,
      },
    },
    result: {
      data: {
        livelihoodCount: 128,
      },
    },
  },
];
