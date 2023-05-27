import React, { HTMLAttributes, useState } from 'react';
import { UseFormRegister, Control, FieldValues, Controller } from 'react-hook-form';
import { FormControl, Select, InputLabel, FormHelperText, MenuItem, TextField, FormControlLabel, RadioGroup, Radio, FormGroup, Checkbox, Grid, Typography, Autocomplete, SxProps, Theme, InputBaseComponentProps } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { splitUpperCase } from '../../utils/utils';
import { DatePicker, LocalizationProvider, CalendarPickerView } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CivilStatus, EducationalBackground, Gender, Salutation, SourceOfIncome } from '../../graphql/generated';
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
  placeholder?: string;
  inputMode?: HTMLAttributes<HTMLLIElement>['inputMode'];
  defaultValue?: string;
  handleChange?: (value: string) => any;
  control: Control<FieldValues, unknown>;
  options?: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
  shouldUnregister?: boolean;
  disabled?: boolean;
  inputProps?: InputBaseComponentProps;
}
interface FormInputNumberProps {
  name: string;
  label: string;
  placeholder?: string;
  numericOnly?: boolean;
  max?: number;
  min?: number;
  defaultValue?: string;
  control: Control<FieldValues, unknown>;
  options?: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
}

interface FormInputDateProps {
  name: string;
  label: string;
  defaultValue?: string | Date | null;
  onSavedValue?: string | Date;
  openTo?: CalendarPickerView;
  min?: Date | string;
  max?: Date | string;
  sx?: SxProps<Theme> | undefined;
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
}

interface FormInputAutoProps {
  id?: string;
  dataCy?: string;
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: boolean;
  freeSolo?: boolean;
  handleTextChange?: (value: string) => void;
  handleInputChange?: (value: string | null) => void;
  inputMode?: HTMLAttributes<HTMLLIElement>['inputMode'];
  defaultValue?: string;
  control: Control<FieldValues, unknown>;
  options?: Option[] | string[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
  sx?: SxProps<Theme> | undefined;
  shouldUnregister?: boolean;
}

interface FormInputSelectProps {
  name: string;
  label: string;
  onSavedValue?: CivilStatus | SourceOfIncome | EducationalBackground;
  defaultValue?: string;
  handleChange?: (value: string) => void;
  data: Option[] | string[];
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
  shouldUnregister?: boolean;
}

interface FormInputRadioProps {
  name: string;
  label: string;
  defaultValue?: string;
  onSavedValue?: Salutation | Gender;
  control: Control<FieldValues, unknown>;
  radioOptions: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  errorMessage?: string;
  errorState?: boolean;
  shouldUnregister?: boolean;
}

interface FormInputCheckboxProps {
  name: string;
  label: string;
  keyId?: string | number;
  checked?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  shouldUnregister?: boolean;
  value: any;
  sx?: SxProps<Theme> | undefined;
  register: UseFormRegister<FieldValues>;
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
  errorMessage?: string;
  errorState?: boolean;
}

export const FormInputText = ({ name, label, placeholder, control, inputMode, defaultValue, handleChange, errors, errorMessage, errorState, shouldUnregister, disabled, inputProps }: FormInputTextProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue ? defaultValue : ''}
    shouldUnregister={shouldUnregister}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        sx={{ marginTop: -0.3, width: 250 }}
        label={label}
        disabled={disabled}
        onChange={(e) => {
          if (handleChange) {
            const newValue = handleChange(e.target.value);
            onChange(newValue);
          } else {
            onChange(e.target.value);
          }
        }}
        helperText={errorMessage ?? errors[name]?.message}
        error={errorState ?? !!errors[name]}
        placeholder={placeholder}
        InputProps={{
          style: { fontSize: 14, margin: 10 },
          inputMode: inputMode ? inputMode : 'text',
          inputProps: inputProps,
        }}
      />
    )}
  />
);

export const FormInputNumber = ({ name, label, placeholder, control, numericOnly, max, min, defaultValue, errors, errorMessage, errorState }: FormInputNumberProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue ? defaultValue : ''}
    render={({ field: { value, onChange } }) => (
      <TextField
        type="number"
        value={value}
        sx={{ marginTop: -0.3, width: 250 }}
        label={label}
        onChange={onChange}
        helperText={errorMessage ?? errors[name]?.message}
        error={errorState ?? !!errors[name]}
        placeholder={placeholder}
        InputProps={{
          style: { fontSize: 14, margin: 10 },
          inputMode: numericOnly ? 'numeric' : undefined,
          inputProps: { max: max, min: min, pattern: '[0-9]*' },
        }}
      />
    )}
  />
);

export const FormInputDate = ({ name, label, sx, defaultValue, onSavedValue, openTo, max, min, control, errors, errorMessage, errorState }: FormInputDateProps) => (
  <>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={value || onSavedValue}
            maxDate={max}
            minDate={min}
            openTo={openTo}
            onChange={(e) => {
              onChange(e);
            }}
            renderInput={(params) => <TextField sx={sx} {...params} helperText={errorMessage ?? errors[name]?.message} error={errorState ?? !!errors[name]} />}
          />
        </LocalizationProvider>
      )}
    />
  </>
);

export const FormInputAutoText = ({ name, label, placeholder, control, freeSolo, autoComplete, defaultValue, handleTextChange, handleInputChange, sx, options, errors, errorMessage, errorState, shouldUnregister }: FormInputAutoProps) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    shouldUnregister={shouldUnregister}
    render={({ field: { value, onChange } }) => (
      <Autocomplete
        id={name}
        disableClearable
        freeSolo={freeSolo}
        value={value}
        autoComplete={autoComplete}
        inputValue={value}
        onChange={(event, value) => {
          if (handleInputChange) {
            handleInputChange(value);
          }
          onChange(value);
        }}
        onInputChange={(event, value) => {
          if (handleTextChange) {
            handleTextChange(value);
          }
          onChange(value);
        }}
        options={options!.map((option) => (typeof option === 'string' ? option : option.label))}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={sx}
            helperText={errorMessage ?? errors[name]?.message}
            error={errorState ?? !!errors[name]}
            InputProps={{
              ...params.InputProps,
              style: { fontSize: 14, margin: 10, textTransform: 'none' },
            }}
            placeholder={placeholder}
          />
        )}
      />
    )}
  />
);

export const FormInputSelect = ({ name, label, onSavedValue, data, defaultValue, handleChange, control, register, errors, errorMessage, errorState, shouldUnregister }: FormInputSelectProps) => (
  <FormControl error={errorState ?? !!errors[name]} aria-label={label} role="combobox">
    <InputLabel id={label} htmlFor={label}>
      {label}
    </InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            label={label}
            value={value || onSavedValue}
            defaultValue={value}
            onChange={(e) => {
              if (handleChange) {
                handleChange(e.target.value);
              }

              onChange(e.target.value);
            }}
            name={name}
            sx={{ width: 233, height: 52 }}
          >
            {data?.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <MenuItem value={item} key={`${item}-${index}`} {...register(name)}>
                    {splitUpperCase(item)}
                  </MenuItem>
                );
              }

              return (
                <MenuItem value={item.value} key={`${item.label}-${index}`} {...register(name)}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText sx={{ color: '#d32f2f' }}>{errorMessage ?? errors[name]?.message}</FormHelperText>
        </>
      )}
    />
  </FormControl>
);

export const FormInputRadio = ({ name, label, control, defaultValue, onSavedValue, radioOptions, errors, errorMessage, errorState, shouldUnregister }: FormInputRadioProps) => {
  return (
    <FormControl error={errorState ?? !!errors[name]} aria-label={label} role="radiogroup">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field: { value, onChange } }) => (
          <>
            <RadioGroup row onChange={onChange} value={value || onSavedValue}>
              {radioOptions.map((item) => (
                <FormControlLabel key={item.value} value={item.value} label={splitUpperCase(item.label)} control={<Radio />} />
              ))}
            </RadioGroup>
            <FormHelperText sx={{ color: '#d32f2f' }}>{errorMessage ?? errors[name]?.message}</FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export const FormInputCheckbox = ({ name, label, keyId, defaultValue, value, checked, disabled, register, shouldUnregister, sx }: FormInputCheckboxProps) => (
  <FormControlLabel
    key={`${keyId}-label`}
    sx={sx}
    label={label}
    disabled={disabled}
    defaultValue={defaultValue}
    value={value}
    control={
      <Checkbox
        key={`${keyId}-checkbox`}
        {...register(name, {
          shouldUnregister: shouldUnregister,
        })}
        checked={checked}
      />
    }
  />
);

export const FormCreatableSelect = ({ name, options, isLoading, isDisabled, onCreateOption, placeholder, control, errors, errorMessage, errorState, register }: FormCreatableSelectProps) => (
  <FormControl error={errorState ?? !!errors[name]}>
    <Controller name={name} defaultValue="" render={({ field: { onChange, value } }) => <CreatableSelect isClearable options={options} isDisabled={isDisabled} isLoading={isLoading} onChange={(input) => onChange(input?.value)} onCreateOption={onCreateOption} value={options.find((c) => c.value === value)} placeholder={placeholder} {...register} styles={style} />} control={control} />
    <FormHelperText sx={{ color: '#d32f2f' }}>{errorMessage ?? errors[name]?.message}</FormHelperText>
  </FormControl>
);
