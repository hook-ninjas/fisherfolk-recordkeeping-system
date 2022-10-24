import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.text();
        }
        throw res;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography sx={{ fontWeight: 'bold' }}>{data}</Typography>
      </Grid>
    </Grid>
  );
}

export default Home;
