import { mutationField } from 'nexus';
import { ImageInput } from '../../input/Image.input';
import { uploadImage } from './Image.resolver';

const CreateImage = mutationField('createImage', {
  type: 'Image',
  args: {
    data: ImageInput,
  },
  resolve: (_, args, context) => {
    const { data } = args;
    return uploadImage(data, context);
  },
});

export { CreateImage };
