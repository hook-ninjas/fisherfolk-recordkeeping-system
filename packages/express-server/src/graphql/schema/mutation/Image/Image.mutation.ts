import { mutationField, nonNull } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import CreateImageInput from '../../input/Image.input';
import { updateFisherfolkImage, uploadImage } from './Image.resolver';

const CreateImage = mutationField('createImage', {
  type: 'Image',
  args: {
    data: nonNullArg(CreateImageInput)
  },
  resolve: (_, args, context) => {
    const { data } = args;
    return uploadImage(data, context);
  }
});

const UpdateFisherfolkImage = mutationField('updateFisherfolkImage', {
  type: 'Image',
  args: {
    data: nonNullArg(CreateImageInput),
    id: nonNull('String'),
    url: nonNull('String')
  },
  resolve: (_, args, ctx) => updateFisherfolkImage(args.data, args.id, args.url, ctx)
});

export { CreateImage, UpdateFisherfolkImage };