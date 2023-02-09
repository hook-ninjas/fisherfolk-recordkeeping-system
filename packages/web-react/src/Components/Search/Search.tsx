import React from 'react';
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputAdornment from '@mui/material/InputAdornment';

const SearchField = () => {
  return (
    <>
      <form>
        <TextField
          variant='standard'
          placeholder='Search a fisherfolk'
          size='small'
          color='success'
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonSearchIcon style={{ fill: 'grey' }} /></InputAdornment>,
          }}
        />
      </form>
    </>
  );
};

export default SearchField;
