import React, {useState} from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkArchiveTable from '../Table/FisherfolkArchiveTable';
import {
  ArchiveFisherfolkDocument, ArchiveFisherfolkQuery,
  ArchiveGearDocument, ArchiveVesselDocument} from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import BasicTabs, { Item } from '../Tab/BasicTab';
import GearArchiveTable from '../Table/GearArchiveTable';
import VesselArchiveTable from '../Table/VesselArchiveTable';

const FisherfolkArchiveRecord = () => {
  const { loading, error, data, refetch } = useQuery(ArchiveFisherfolkDocument);
  const gear = useQuery(ArchiveGearDocument);
  const vessel = useQuery(ArchiveVesselDocument);

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
            <Typography variant="h6">Archive Records</Typography>
          </Box>
          <Item sx={{ p: 0 }}>
            <Grid container>
              <BasicTabs
                tab1Label="Fisherfolks"
                tab2Label="Gears"
                tab3Label="Boats"
                tabelPanel1={<FisherfolkArchiveTable error={error} loading={loading} data={data} />}
                tabelPanel2={<GearArchiveTable error={gear.error} loading={gear.loading} data={gear.data} />}
                tablePanel3= {<VesselArchiveTable error={vessel.error} loading={vessel.loading} data={vessel.data} />}
              />
            </Grid>
          </Item>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkArchiveRecord;
