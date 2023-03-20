import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

interface Props {
  title: string;
  slot: number;
  startDate: Date;
  endDate: Date;
}

export default function FisherfolkProgramCard({
  endDate,
  title,
  slot,
  startDate,
}: Props) {
  return (
    <Card
      sx={{
        minWidth: 250,
        minHeight: 220,
        padding: 0.5,
        boxShadow: 2,
        borderRadius: 3
      }}
    >
      <CardContent >
        <Typography sx={{ fontSize: 17.5 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          {`Slot: ${slot}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Start Date: ${new Date(startDate).toLocaleDateString()}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`End Date: ${new Date(endDate).toLocaleDateString()}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='medium' sx={{ marginBottom: 2 }}>
          View Program
        </Button>
      </CardActions>
    </Card>
  );
}
