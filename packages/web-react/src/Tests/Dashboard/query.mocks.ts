import { MockedResponse } from '@apollo/client/testing';
import {
  LivelihoodCountDocument,
  Gender,
  SourceOfIncome,
  FisherfolkCountDocument,
  FisherfolkGenderCountDocument,
} from '../../graphql/generated';

export const DashboardQueryMock: MockedResponse[] = [
  {
    request: {
      query: FisherfolkCountDocument,
    },
    result: {
      data: {
        totalFisherfolk: 1290,
        activeFisherFolk: 670,
        totalGears: 540,
        totalVessels: 670,
        barangayCount: 25,
      },
    },
  },
  {
    request: {
      query: FisherfolkGenderCountDocument,
      variables: {
        gender: Gender.Female
      },
    },
    result: {
      data: {
        fisherfolkGender: 340
      },
    },
  },
  {
    request: {
      query: FisherfolkGenderCountDocument,
      variables: {
        gender: Gender.Male
      },
    },
    result: {
      data: {
        fisherfolkGender: 790
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
