import React from 'react';
import {
  Alert,
  DialogContent,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import { useQuery } from '@apollo/client';
import { GovernmentAidDocument } from '../../graphql/generated';

interface ViewFisherfolkProgramProps {
  govtAidId: number;
  open: boolean;
  handleClose: () => void;
}

export default function ViewFisherfolkProgram({
  govtAidId,
  open,
  handleClose,
}: ViewFisherfolkProgramProps) {
  const { loading, error, data } = useQuery(GovernmentAidDocument, {
    variables: {
      govtAidId: govtAidId,
    },
  });

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading || !data) {
    return null;
  }

  const { description, title } = data!.governmentAid;

  const images = data.governmentAidPhotos;
  const imageUrl = images[0]?.url;
  const img = new Image();
  img.src = imageUrl;

  const height = (img.onload = () => img.naturalHeight);

  function StandardImageList() {
    return (
      <ImageList
        sx={{
          maxWidth: '100%',
          height: images.length > 1 ? 'auto' : height,
        }}
        cols={images.length}
        rowHeight={200}
      >
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img src={`${item.url}`} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <FormContainer
      onClose={close}
      aria-labelledby="view-program-container"
      open={open}
    >
      <FormContainerTitle
        aria-labelledby="view-program-title"
        onClose={handleClose}
      >
        {title}
      </FormContainerTitle>
      <DialogContent dividers>
        <StandardImageList />
        <Typography>{description}</Typography>
      </DialogContent>
    </FormContainer>
  );
}
