import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  Typography,
} from '@mui/material';
import AddFisherfolkForm from '../Forms/AddMemberForm';
import FisherfolkTable from '../Table/FisherfolkTable';
import AddIcon from '@mui/icons-material/Add';
import { CustomAddButton, CustomBtnText } from '../Buttons/CustomAddButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Controller, useForm } from 'react-hook-form';
import { splitUpperCase } from '../../utils/utils';
import { livelihoods, fisherfolkStatus } from '../Forms/Enums';
import dt from '../Forms/iloilo-city-brgys.json';
import { useQuery } from '@apollo/client';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputAdornment from '@mui/material/InputAdornment';
import {
  QueryFisherfolksQuery,
  QueryFisherfolksDocument,
  SourceOfIncome,
  FisherfolkStatus,
} from '../../graphql/generated';

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    '& .MuiPaper-root': {
      width: '60%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiPaper-root': {
      width: '90%',
    },
  },
}));

// filter function for filtering status, livelihood, and barangay
const filter = (
  data: QueryFisherfolksQuery,
  key: FisherfolkStatus | SourceOfIncome | string
) => {
  return data.fisherfolks.filter(({ status, barangay, livelihoods }) => {
    const livelihood = livelihoods?.find((main) => main?.isMain)?.type;
    return status === key || barangay === key || livelihood === key;
  });
};

const FisherfolkRecord = () => {
  const [addFisherfolkBtn, setFisherfolkBtn] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isDrawerOpen, setIsDrawOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const barangays = dt.barangays.sort();

  const handleAddFisherfolkOpen = () => setFisherfolkBtn(true);
  const handleAddFisherfolkClose = () => setFisherfolkBtn(false);

  const { loading, error, data, refetch } = useQuery(QueryFisherfolksDocument);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchKey.trim().length == 0) {
      return data?.fisherfolks;
    } else {
      return data?.fisherfolks.filter(
        ({ firstName, middleName, lastName, appellation }) => {
          const searchKeyArray = searchKey.split(' ');
          const completeName =
            firstName + ' ' + middleName + ' ' + lastName + ' ' + appellation;

          const res = searchKeyArray.map((key: string) => {
            return completeName.toLowerCase().includes(key.toLowerCase());
          });

          return res.every((element: boolean) => {
            return element === true;
          });
        }
      );
    }
  };

  const [fisherfolks, setFisherfolks] = useState<
    QueryFisherfolksQuery | undefined
  >();

  const filterschema = object().shape({
    status: string().nullable().oneOf(Object.values(FisherfolkStatus)),
    livelihood: string().nullable().oneOf(Object.values(SourceOfIncome)),
    barangay: string().nullable().oneOf(barangays),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(filterschema),
  });

  const handleCloseDrawer = () => {
    setIsDrawOpen(false);
    reset(); // reset selected filter
  };

  const onSubmit = handleSubmit((fisherFolk) => {
    const selectedFilter = {
      status: fisherFolk.status,
      livelihood: fisherFolk.livelihood,
      barangay: fisherFolk.barangay,
    };

    const filterValues = Object.values(selectedFilter).filter((a) => a != null);

    if (data) {
      if (filterValues.length > 1) {
        // filter fisherfolk by status and livelihood
        const newData = filter(data, selectedFilter.status).filter(
          ({ livelihoods }) =>
            livelihoods?.find((a) => a?.isMain)?.type ===
            selectedFilter.livelihood
        );

        setFisherfolks({
          fisherfolks: newData,
          totalFisherfolk: newData.length,
        });
      } else {
        if (selectedFilter.status) {
          setFisherfolks({
            fisherfolks: filter(data, selectedFilter.status),
            totalFisherfolk: filter(data, selectedFilter.status).length,
          });
        }
        if (selectedFilter.livelihood) {
          setFisherfolks({
            fisherfolks: filter(data, selectedFilter.livelihood),
            totalFisherfolk: filter(data, selectedFilter.livelihood).length,
          });
        }
        if (selectedFilter.barangay) {
          setFisherfolks({
            fisherfolks: filter(data, selectedFilter.barangay),
            totalFisherfolk: filter(data, selectedFilter.barangay).length,
          });
        }
      }
    }
  });

  const handleApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit();
    handleCloseDrawer();
    setIsFiltered(true);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleCloseDrawer();
    setIsFiltered(false);
    setFisherfolks(undefined);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 0.5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1} display="flex" justifyContent="space-between">
            <Typography variant="h6">Fisherfolk Record</Typography>

            <Box display="flex" justifyContent="end">
              <IconButton
                sx={{
                  height: 30,
                  fontSize: 12,
                  fontWeight: '600',
                  borderRadius: 0,
                  color: 'gray',
                }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => setIsDrawOpen(true)}
              >
                <FilterAltIcon />
              </IconButton>
              <CustomDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                PaperProps={{
                  sx: { width: '30%' },
                }}
              >
                <DialogTitle sx={{ ml: 2, p: 2 }}>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseDrawer}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <Box p={8} sx={{ mb: 2, mt: -8 }} width="150" textAlign="start">
                  <Typography textAlign="start" color="GrayText" variant="h6">
                    Livelihood
                  </Typography>
                  <FormControl aria-label="livelihood" role="checkbox">
                    <Controller
                      control={control}
                      name="livelihood"
                      render={({ field: { value, onChange } }) => (
                        <RadioGroup row onChange={onChange} value={value}>
                          {livelihoods.map((item) => (
                            <FormControlLabel
                              key={item.value}
                              value={item.value ?? ''}
                              label={splitUpperCase(item.label)}
                              control={<Radio />}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Box>
                <Divider sx={{ mt: -8 }} />
                <Box p={8} sx={{ mb: 2, mt: -6 }} width="250" textAlign="start">
                  <Typography textAlign="start" color="GrayText" variant="h6">
                    Status
                  </Typography>
                  <FormControl aria-label="status" role="checkbox">
                    <Controller
                      control={control}
                      name="status"
                      render={({ field: { value, onChange } }) => (
                        <RadioGroup row onChange={onChange} value={value}>
                          {fisherfolkStatus.map((item) => (
                            <FormControlLabel
                              key={item.value}
                              value={item.value ?? ''}
                              label={splitUpperCase(item.label)}
                              control={<Radio />}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Box>
                <Divider sx={{ mt: -8 }} />
                <Box p={8} sx={{ mb: 2, mt: -6 }} width="250" textAlign="start">
                  <Typography textAlign="start" color="GrayText">
                    Barangays
                  </Typography>
                  <FormControl aria-label="barangay" role="combobox">
                    <Controller
                      name="barangay"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value ?? ''}
                          onChange={onChange}
                          sx={{ width: 260, height: 40 }}
                        >
                          {barangays?.map((item) => (
                            <MenuItem value={item} key={item}>
                              {splitUpperCase(item)}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Box>
                <Box p={8} sx={{ mb: 2, mt: -6 }} width="250" textAlign="start">
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: -10,
                      background: '#28c181',
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'whitesmoke',
                    }}
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                </Box>
                <Box p={8} sx={{ mb: 2 }} width="250" textAlign="start">
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: -35,
                      background: 'blue[300]',
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'whitesmoke',
                    }}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </CustomDrawer>
              <CustomAddButton
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handleAddFisherfolkOpen}
              >
                <CustomBtnText>Add Fisherfolk</CustomBtnText>
              </CustomAddButton>
              {addFisherfolkBtn && (
                <AddFisherfolkForm
                  handleClose={handleAddFisherfolkClose}
                  open={addFisherfolkBtn}
                />
              )}
            </Box>
          </Box>
          <Box m={1} display="flex" justifyContent="space-between">
            <form
              onSubmit={(e) => {
                setIsFiltered(true);
                onSearchSubmit(e);
                setFisherfolks({
                  fisherfolks: onSearchSubmit(e)!,
                  totalFisherfolk: onSearchSubmit(e)!.length,
                });
              }}
            >
              <TextField
                onChange={handleSearch}
                variant="standard"
                placeholder="Search a fisherfolk"
                size="small"
                color="success"
                sx={{ width: 180 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonSearchIcon style={{ fill: 'grey' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            <Typography variant="body1">
              {data?.totalFisherfolk != undefined
                ? isFiltered
                  ? `Total: ${fisherfolks?.totalFisherfolk}`
                  : `Total: ${data?.totalFisherfolk}`
                : ''}
            </Typography>
          </Box>

          <Grid item>
            <Box m={1}>
              <FisherfolkTable
                error={error}
                loading={loading}
                data={
                  searchKey.trim().length == 0
                    ? fisherfolks ?? data
                    : fisherfolks ?? data
                }
                {...refetch}
              />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkRecord;
