import { mutationField, nonNull, arg } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import CreateImageInput from '../../input/Image.input';
import { createImage, uploadImage } from './Image.resolver';


const CreateImage = mutationField('createImage', {
  type: 'Image',
  args: {
    data: nonNullArg(CreateImageInput)
  },
  resolve: (_, args, context) => {
    const { data } = args;
    uploadImage(data);
    return createImage(data, context);
  }
});

export { CreateImage };