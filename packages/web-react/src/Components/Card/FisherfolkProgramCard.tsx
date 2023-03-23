import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider/Divider';
import { Stack } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface Props {
  title: string;
  slot: number;
  date: Date;
}

export default function FisherfolkProgramCard({
  title,
  slot,
  date,
}: Props) {
  return (
    <Card sx={{ borderRadius: 0 }}>
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
        <Stack direction="row" justifyContent="space-between" mt={2} mb={-1.5}>
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
        <Button fullWidth size="small" variant="text">
          View Program
        </Button>
      </CardActions>
    </Card>
  );
}
