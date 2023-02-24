import React, { HTMLAttributes, useState } from 'react';
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
  FormGroup,
  Checkbox,
  Grid,
  Typography,
  Autocomplete,
  SxProps,
  Theme,
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import { splitUpperCase } from '../../utils/utils';
import {
  DatePicker,
  LocalizationProvider,
  CalendarPickerView,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
  inputMode?: HTMLAttributes<HTMLLIElement>['inputMode'];
  defaultValue?: string;
  control: Control<FieldValues, unknown>;
  options?: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}
interface FormInputNumberProps {
  name: string;
  label: string;
  placeholder: string;
  numericOnly?: boolean;
  max?: number;
  min?: number;
  defaultValue?: string;
  control: Control<FieldValues, unknown>;
  options?: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputDateProps {
  name: string;
  label: string;
  defaultValue: string | Date | null;
  openTo?: CalendarPickerView;
  min?: Date | string;
  max?: Date | string;
  sx?: SxProps<Theme> | undefined;
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputAutoProps {
  id?: string;
  dataCy?: string;
  name: string;
  label: string;
  placeholder: string;
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
  sx?: SxProps<Theme> | undefined;
}

interface FormInputSelectProps {
  name: string;
  label: string;
  onSavedValue: string;
  defaultValue?: string;
  handleChange?: (value: string) => void;
  data: Option[] | string[];
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputRadioProps {
  name: string;
  label: string;
  defaultValue: string;
  control: Control<FieldValues, unknown>;
  radioOptions: Option[];
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface FormInputMultiCheckboxProps {
  name: string;
  label: string;
  header?: Option;
  defaultValue: string;
  control: Control<FieldValues, unknown>;
  options: Option[];
  sx?: SxProps<Theme> | undefined;
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
  inputMode,
  defaultValue,
  register,
  errors,
}: FormInputTextProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue ? defaultValue : ''}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        sx={{ marginTop: -0.3, width: 250 }}
        label={label}
        onChange={onChange}
        helperText={errors[name]?.message}
        error={!!errors[name]}
        placeholder={placeholder}
        InputProps={{
          style: { fontSize: 14, margin: 10 },
          inputMode: inputMode ? inputMode : 'text',
        }}
      />
    )}
  />
);

export const FormInputNumber = ({
  name,
  label,
  placeholder,
  control,
  numericOnly,
  max,
  min,
  defaultValue,
  register,
  errors,
}: FormInputNumberProps) => (
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
        helperText={errors[name]?.message}
        error={!!errors[name]}
        placeholder={placeholder}
        InputProps={{
          style: { fontSize: 14, margin: 10 },
          inputMode: numericOnly ? 'numeric' : undefined,
          inputProps: { max: max, min: min },
        }}
      />
    )}
  />
);

export const FormInputDate = ({
  name,
  label,
  sx,
  defaultValue,
  openTo,
  max,
  min,
  control,
  errors,
}: FormInputDateProps) => (
  <>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={value}
            maxDate={max}
            minDate={min}
            openTo={openTo}
            onChange={(e) => {
              onChange(e);
            }}
            renderInput={(params) => (
              <TextField
                sx={sx}
                {...params}
                helperText={errors[name]?.message}
                error={!!errors[name]}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  </>
);

export const FormInputAutoText = ({
  name,
  label,
  placeholder,
  control,
  freeSolo,
  autoComplete,
  defaultValue,
  handleTextChange,
  handleInputChange,
  register,
  sx,
  options,
  errors,
}: FormInputAutoProps) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
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
        options={options!.map((option) =>
          typeof option === 'string' ? option : option.label
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={sx}
            helperText={errors[name]?.message}
            error={!!errors[name]}
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

export const FormInputSelect = ({
  name,
  label,
  onSavedValue,
  data,
  defaultValue,
  handleChange,
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
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <>
          <Select
            label={label}
            value={value || onSavedValue}
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
                  <MenuItem
                    value={item}
                    key={`${item}-${index}`}
                    {...register(name)}
                  >
                    {splitUpperCase(item)}
                  </MenuItem>
                );
              }

              return (
                <MenuItem
                  value={item.value}
                  key={`${item.label}-${index}`}
                  {...register(name)}
                >
                  {item.label}
                </MenuItem>
              );
            })}
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
  defaultValue,
  radioOptions,
  register,
  errors,
}: FormInputRadioProps) => {
  return (
    <FormControl error={!!errors[name]} aria-label={label} role="radiogroup">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
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

export const FormInputMultiCheckbox = ({
  name,
  label,
  control,
  defaultValue,
  header,
  options,
  sx,
  errors,
}: FormInputMultiCheckboxProps) => {
  return (
    <FormControl error={!!errors[name]} aria-label={label} role="radiogroup">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Grid container spacing={-2} sx={sx}>
            <Grid item sm={6}>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    // checked={SimpleHandLine}
                    // onChange={handleOtherFishingActivityChange}
                    name="SimpleHandLine"
                    value="SimpleHandLine"
                  />
                }
                label={
                  <Typography variant="subtitle1" color="bold">
                    Hook and Line
                  </Typography>
                }
              /> */}
              <FormHelperText
                error={!!errors[name]}
                hidden={!errors[name]}
                sx={{ m: !errors[name] ? 2 : 0 }}
              >
                {errors[name]?.message}
              </FormHelperText>
              <FormGroup>
                {options.map(({ label, value }, index) => {
                  return (
                    <FormControlLabel
                      key={`${label}-${index}`}
                      sx={{ ml: header ? 2 : 0 }}
                      control={
                        <Checkbox
                          size="small"
                          // checked={SimpleHandLine}
                          onChange={(e) => onChange(e.target.value)}
                          value={value}
                        />
                      }
                      label={label}
                    />
                  );
                })}
              </FormGroup>
            </Grid>
          </Grid>
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
      defaultValue=""
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
