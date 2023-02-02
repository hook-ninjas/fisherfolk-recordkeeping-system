import React, { useState } from 'react';
import { Paper, Input, SxProps, Theme } from '@mui/material';

interface PhotoUploadProps {
  sx?: SxProps<Theme> | undefined;
}

function PhotoUpload(props: PhotoUploadProps) {
  const [image, setImage] = useState<string>('');

  const { sx } = props;

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

        reader.onloadend = () => setPreview(reader);
      } else {
        throw 'No File uploaded';
      }
    }
  };

  return (
    <>
      <Paper sx={sx}>
        <Paper
          sx={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            width: 'auto',
          }}
          component="img"
          alt="Upload 2x2 Photo"
          src={image}
        />
        <Input
          sx={{ mt: 1 }}
          type="file"
          hidden
          aria-label="profile-img-upload"
          inputProps={{
            accept: 'image/*',
            label: 'profile-img-upload',
          }}
          onChange={handleUpload}
        />
      </Paper>
    </>
  );
}

export default PhotoUpload;
