import { ImageInput } from '../../input/Image.input';
import { list, mutationField, nonNull } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import Image from '../../model/objecTypes/Image';
import { updateFisherfolkImage, uploadImage } from './Image.resolver';

const CreateImage = mutationField('createImage', {
  type: 'Image',
  args: {
    data: nonNullArg(ImageInput),
  },
  resolve: (_, args, context) => {
    const { data } = args;
    return uploadImage(data, context);
  },
});

const UpdateFisherfolkImage = mutationField('updateFisherfolkImage', {
  type: 'Image',
  args: {
    data: nonNullArg(ImageInput),
    id: nonNull('String'),
    url: nonNull('String'),
  },
  resolve: (_, args, ctx) =>
    updateFisherfolkImage(args.data, args.id, args.url, ctx),
});

const CreateMultipleImage = mutationField('createMultipleImage', {
  type: list(Image),
  args: {
    images: list(nonNull(ImageInput)),
  },
  resolve: async (_, args, context) =>
    args.images.map((image) => uploadImage(image, context)),
});

export { CreateImage, UpdateFisherfolkImage, CreateMultipleImage };
