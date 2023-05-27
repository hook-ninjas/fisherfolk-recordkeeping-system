import React, { useState } from 'react';
import { Box, Grid, Paper, Tab, Tabs, Typography, styled } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface BasicTabProps {
  tabelPanel1: React.ReactNode;
  tabelPanel2: React.ReactNode;
  tablePanel3?: React.ReactNode;
  button?: React.ReactNode;
  tab1Label: string;
  tab2Label: string;
  tab3Label?: string;
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  tab1Label,
  tab2Label,
  tab3Label,
  tabelPanel1,
  tabelPanel2,
  tablePanel3,
  button,
}: BasicTabProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={tab1Label} {...a11yProps(0)} />
          <Tab label={tab2Label} {...a11yProps(1)} />
          <Tab label={tab3Label} {...a11yProps(2)} />
        </Tabs>
        {button}
      </Grid>
      <TabPanel value={value} index={0}>
        <div style={{ minHeight: '85vh', width: '100%' }}>{tabelPanel1}</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ minHeight: '85vh', width: '100%' }}>{tabelPanel2}</div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{ minHeight: '85vh', width: '100%' }}>{tablePanel3}</div>
      </TabPanel>
    </Box>
  );
}
