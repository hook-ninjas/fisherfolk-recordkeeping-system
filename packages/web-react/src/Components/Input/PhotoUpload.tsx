import React, { useState } from 'react';
import {
  UseFormRegister,
  Control,
  FieldValues,
  Controller,
} from 'react-hook-form';
import { Paper, Input, SxProps, Theme, FormHelperText } from '@mui/material';

interface PhotoUploadProps {
  id?: string;
  name: string;
  label: string;
  alt?: string;
  dataCy?: string;
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  sx?: SxProps<Theme> | undefined;
}

function PhotoUpload({
  id = '',
  name,
  label = '',
  alt = '',
  dataCy = '',
  control,
  register,
  errors,
  sx,
}: PhotoUploadProps) {
  const [image, setImage] = useState<string | undefined>(undefined);

  const setPreview = (file: FileReader) => {
    const image = file.result;

    if (image !== null) {
      setImage(image.toString());
    } else {
      throw 'Image does not exist';
    }
  };

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const reader = new FileReader();

    if (event.target instanceof HTMLInputElement) {
      if (event.target.files !== null) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        console.log(file);

        reader.onloadend = () => setPreview(reader);
      } else {
        throw 'No File uploaded';
      }
    }
  };

  return (
    <>
      <Paper id={id} sx={sx} data-cy={dataCy}>
        <FormHelperText
          error={!!errors[name]}
          hidden={!errors[name]}
          sx={{ ml: 2, mt: 2 }}
        >
          {errors[name]?.message}
        </FormHelperText>
        <Paper
          data-cy={`${dataCy}-preview`}
          sx={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            width: 'auto',
          }}
          component="img"
          alt={alt}
          src={image}
        />
        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => (
            <Input
              sx={{ mt: 1 }}
              data-cy={`${dataCy}-input`}
              type="file"
              hidden
              aria-label="profile-img-upload"
              inputProps={{
                accept: 'image/*',
                label: 'profile-img-upload',
              }}
              {...register(name, { onChange: (e) => handleUpload(e) })}
              error={!!errors[name]}
            />
          )}
        />
      </Paper>
    </>
  );
}

export default PhotoUpload;
