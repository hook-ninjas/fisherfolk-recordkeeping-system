import React, { useState, useEffect } from 'react';
import {
  UseFormRegister,
  Control,
  FieldValues,
  Controller,
} from 'react-hook-form';
import {
  Paper,
  Theme,
  Button,
  FormHelperText,
  SxProps,
  Grid,
  Box,
} from '@mui/material';

interface MultiFileUploadProps {
  id?: string;
  name: string;
  label: string;
  dataCy?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void | undefined;
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  sx?: SxProps<Theme> | undefined;
}

interface fileThumbnailProps {
  src: string | undefined;
  index: string | number;
}

const thumbnails = (srcs: string[]) => {
  return srcs.map((src, index) => {
    return (
      <Paper
        id={`file-thumbnail-${src}`}
        key={`file-thumbnail-${src}`}
        data-cy={`thumbnail-test-${index}`}
        sx={{
          m: 1,
          display: 'block',
          maxWidth: '64px',
          height: 'auto',
          width: 'auto',
        }}
        component="img"
        src={src}
      />
    );
  });
};

function MultiFileUpload({
  id = '',
  name,
  label = '',
  dataCy = '',
  control,
  register,
  errors,
  onChange = undefined,
  sx,
}: MultiFileUploadProps) {
  const [preview, setPreview] = useState<JSX.Element[] | undefined>([]);

  const createSrcs = (files: File[]) => {
    const results: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (ev) => {
        if (ev.target) {
          if (ev.target.result) {
            const src = ev.target.result.toString();
            results.push(src);
          } else {
            throw 'File is null';
          }
        }
        setPreview(thumbnails(results));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload =
    (
      onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void
    ) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const uploadedFiles: File[] = [];
      if (event.target instanceof HTMLInputElement) {
        const { files } = event.target;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadedFiles.push(file);
          }
          createSrcs(uploadedFiles);
        }
        if (onChange !== undefined) {
          onChange(event);
        }
      } else {
        throw 'Not Valid Input';
      }
    };

  return (
    <>
      <Box id={id} sx={sx} data-cy={dataCy}>
        <FormHelperText
          error={!!errors[name]}
          hidden={!errors[name]}
          sx={{ ml: 2, mt: 2 }}
        >
          {errors[name]?.message}
        </FormHelperText>
        <Grid
          id="file-thumbnail-container"
          container
          sx={{ p: 1, width: '100%' }}
        >
          {preview}
        </Grid>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { value } }) => (
            <Button
              fullWidth
              id={label}
              variant="contained"
              component="label"
              htmlFor="multi-upload-btn"
            >
              <input
                accept="image/*"
                id="multi-upload-btn"
                multiple
                type="file"
                hidden
                {...register(name, {
                  onChange: (e) => handleUpload(onChange)(e),
                })}
              />
              Upload
            </Button>
          )}
        />
      </Box>
    </>
  );
}

export default MultiFileUpload;
