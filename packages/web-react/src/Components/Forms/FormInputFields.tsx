import React from 'react';
import {
  UseFormRegister,
  Control,
  FieldValues,
  Controller,
} from 'react-hook-form';
import {
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Autocomplete,
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { splitUpperCase } from '../../utils/utils';

export interface Option {
  label: string;
  value: string;
}

const style = {
  control: (css: any) => ({
    ...css,
    width: '232px',
    height: '53px',
  }),
  menu: (css: any) => ({
    ...css,
    width: 'max-content',
    minWidth: '20%',
    zIndex: 999,
  }),
  option: (css: any) => ({ ...css, width: 230 }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      fontSize: 15,
    };
  },
};

interface FormInputTextProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<FieldValues, unknown>;
  options?: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputSelectProps {
  name: string;
  label: string;
  onSavedValue: string;
  data: string[];
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputRadioProps {
  name: string;
  label: string;
  control: Control<FieldValues, unknown>;
  radioOptions: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormCreatableSelectProps {
  name: string;
  options: Option[];
  isLoading: boolean;
  isDisabled: boolean;
  placeholder: string;
  onCreateOption: (input: string) => void;
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
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
        InputProps={{ style: { fontSize: 14, margin: 10 } }}
      />
    )}
  />
);

export const FormInputAutoText = ({
  name,
  label,
  placeholder,
  control,
  register,
  options,
  errors,
}: FormInputTextProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value } }) => (
      <Autocomplete
        id={name}
        freeSolo
        options={options!.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            value={value}
            sx={{ marginTop: -0.3, width: 230 }}
            {...register(name)}
            helperText={errors[name]?.message}
            error={!!errors[name]}
            InputProps={{ ...params.InputProps, style : { fontSize: 14, margin: 10, textTransform: 'none'  }}}
            placeholder={placeholder}
          />
        )}
      />
    )}
  />
);

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
            sx={{ width: 233, height: 52 }}
          >
            {data?.map((item) => (
              <MenuItem value={item} key={item} {...register(name)}>
                {splitUpperCase(item)}
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

export const FormInputRadio = ({
  name,
  label,
  control,
  radioOptions,
  register,
  errors,
}: FormInputRadioProps) => {
  return (
    <FormControl error={!!errors[name]} aria-label={label} role="radiogroup">
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <>
            <RadioGroup row onChange={onChange} value={value}>
              {radioOptions.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={splitUpperCase(item.label)}
                  control={<Radio />}
                  {...register(name)}
                />
              ))}
            </RadioGroup>
            <FormHelperText sx={{ color: '#d32f2f' }}>
              {errors[name]?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export const FormCreatableSelect = ({
  name,
  options,
  isLoading,
  isDisabled,
  onCreateOption,
  placeholder,
  control,
  errors,
  register,
}: FormCreatableSelectProps) => (
  <FormControl error={!!errors[name]}>
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <CreatableSelect
          isClearable
          options={options}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onChange={(input) => onChange(input?.value)}
          onCreateOption={onCreateOption}
          value={options.find((c) => c.value === value)}
          placeholder={placeholder}
          {...register}
          styles={style}
        />
      )}
      control={control}
    />
    <FormHelperText sx={{ color: '#d32f2f' }}>
      {errors[name]?.message}
    </FormHelperText>
  </FormControl>
);
