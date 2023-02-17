import { mutationField } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import CreateImageInput from '../../input/Image.input';
import { uploadImage } from './Image.resolver';


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

export { CreateImage };