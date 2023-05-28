import React, { forwardRef } from 'react';
import { Alert, Dialog, DialogContent, IconButton, ImageList, ImageListItem, Slide, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GovernmentAidDocument } from '../../graphql/generated';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

interface ViewFisherfolkProgramProps {
  govtAidId: number;
  open: boolean;
  handleClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewFisherfolkProgram({ govtAidId, open, handleClose }: ViewFisherfolkProgramProps) {
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
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogContent
          style={{
            width: '600px',
            maxWidth: '100%',
            height: '700px',
          }}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            {title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                top: -8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <StandardImageList />
          {!description ? 'No description provided.' : description}
        </DialogContent>
      </Dialog>
    </div>
  );
}
