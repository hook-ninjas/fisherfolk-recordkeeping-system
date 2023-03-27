import React, {useState} from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkArchiveTable from '../Table/FisherfolkArchiveTable';
import { ArchiveFisherfolkDocument, ArchiveFisherfolkQuery } from '../../graphql/generated';
import { useQuery } from '@apollo/client';

const FisherfolkArchiveRecord = () => {
  const { loading, error, data, refetch } = useQuery(ArchiveFisherfolkDocument);

  const [fisherfolks, setFisherfolks] = useState<
    ArchiveFisherfolkQuery | undefined
    >();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: .5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1}>
            <Typography variant="h6">Fisherfolk Archive Record</Typography>
          </Box>
          <Grid item>
            <Box m={1}>
              <FisherfolkArchiveTable
                error={error}
                loading={loading}
                data={fisherfolks ?? data}
                {...refetch}
              />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkArchiveRecord;
