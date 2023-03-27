import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider/Divider';
import { Stack } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ViewFisherfolkProgram from '../FisherfolkProgram/ViewProgram';
import { useQuery } from '@apollo/client';
import { GovernmentAidDocument } from '../../graphql/generated';

interface Props {
  id: number;
  title: string;
  slot: number;
  date: Date;
}

export default function FisherfolkProgramCard({
  id,
  title,
  slot,
  date,
}: Props) {
  const [viewProgramBtn, setViewProgramBtn] = useState(false);
  const handleViewProgramOpen = () => setViewProgramBtn(true);
  const handleViewProgramClose = () => setViewProgramBtn(false);

  const { loading, data } = useQuery(GovernmentAidDocument, {
    variables: {
      govtAidId: id,
    },
  });

  if (loading || !data) {
    return null;
  }

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardMedia
        sx={{ height: 90 }}
        image={data && data.governmentAidPhotos[0]?.url}
      />
      <CardContent>
        <Typography
          id="program-title"
          fontSize={17}
          color="#4a4b4d"
          mb={1}
          noWrap
        >
          {title}
        </Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between" mt={1} mb={-2}>
          <PeopleAltIcon sx={{ color: 'gray' }} />
          <Typography
            id="program-slot"
            variant="body1"
            color="text.secondary"
            ml={-12}
          >
            {`${slot}`}
          </Typography>
          <DateRangeIcon sx={{ color: 'gray' }} />
          <Typography
            id="program-date"
            variant="body1"
            color="text.secondary"
            ml={-12}
          >
            {`${new Date(date).toLocaleDateString()}`}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          size="small"
          variant="text"
          onClick={handleViewProgramOpen}
        >
          View
        </Button>
        {viewProgramBtn && (
          <ViewFisherfolkProgram
            govtAidId={id}
            open={viewProgramBtn}
            handleClose={handleViewProgramClose}
          />
        )}
        <Button
          fullWidth
          size="small"
          variant="text"
          // onClick={handleViewProgramOpen}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
