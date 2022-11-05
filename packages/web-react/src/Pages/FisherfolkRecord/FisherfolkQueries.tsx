import { gql } from '@apollo/client';

export const sampleQuery = gql`
  query SampleFisherfolkQuery {
    fisherfolks {
      id
      fullName
      barangay
      registrationDate
    }
  }
`;
