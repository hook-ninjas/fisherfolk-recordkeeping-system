import React, { useState } from 'react';
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

interface MultiImageUploadProps {
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
  onImageChange: (imageState: string[] | undefined) => void;
}

const thumbnails = (srcs: string[] | undefined) => {
  return srcs?.map((src, index) => {
    return (
      <>
        <Paper
          id={`file-thumbnail-${src}`}
          key={`file-thumbnail-${src}`}
          data-cy={`thumbnail-test-${index}`}
          sx={{
            m: 1,
            display: 'block',
            maxWidth: '125px',
            height: 'auto',
            width: 'auto',
          }}
          component="img"
          src={src}
        />
      </>
    );
  });
};

function MultiImageUpload({
  id = '',
  name,
  label = '',
  dataCy = '',
  control,
  register,
  errors,
  onChange = undefined,
  sx,
  onImageChange
}: MultiImageUploadProps) {
  const [preview, setPreview] = useState<string[] | undefined>([]);

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
        setPreview(results);
      };
      reader.readAsDataURL(file);
    });
    onImageChange(results);
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
        <Controller
          name={name}
          control={control}
          render={() => (
            <Button
              sx={{ width: 150 }}
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
        <Grid
          id="file-thumbnail-container"
          container
          sx={{ p: 1, width: '100%' }}
        >
          {thumbnails(preview)}
        </Grid>
      </Box>
      <FormHelperText
        error={!!errors[name]}
        hidden={!errors[name]}
        sx={{ ml: 2, mt: 2 }}
      >
        {errors[name]?.message}
      </FormHelperText>
    </>
  );
}

export default MultiImageUpload;
