import React from 'react';
import { UseFormRegister, Control, FieldValues, Controller } from 'react-hook-form';
import {
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
  TextField,
} from '@mui/material';

interface FormInputTextProps {
  name: string
  label: string
  placeholder: string
  control: Control<FieldValues, any>
  register: UseFormRegister<FieldValues>
  errors: FieldValues
} 

export const FormInputText = ({
  name,
  label,
  placeholder,
  control,
  register,
  errors,
}: FormInputTextProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value } }) => (
      <TextField
        value={value}
        sx={{ marginTop: -0.3, width: 250 }}
        label={label}
        {...register(name)}
        helperText={errors[name]?.message}
        error={!!errors[name]}
        placeholder={placeholder}
        InputProps={{ style: { fontSize: 14, margin: 10 }}}
      />
    )}
  />
);

interface FormInputSelectProps {
    name: string
    label: string
    onSavedValue: string
    data: string[]
    control: Control<FieldValues, any>
    register: UseFormRegister<FieldValues>
    errors: FieldValues
} 

export const FormInputSelect = ({
  name,
  label,
  onSavedValue,
  data,
  control,
  register,
  errors,
}: FormInputSelectProps) => (
  <FormControl error={!!errors[name]} aria-label={label} role="combobox">
    <InputLabel id={label} htmlFor={label}>
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            defaultValue=""
            label={label}
            value={value || onSavedValue}
            onChange={onChange}
            name={name}
            sx={{width: 233, height: 52}}
          >
            {data?.map((item) => (
              <MenuItem value={item} key={item} {...register(name)}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: '#d32f2f' }}>
            {errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  </FormControl>
);