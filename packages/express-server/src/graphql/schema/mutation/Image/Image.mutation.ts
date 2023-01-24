import { mutationField, nonNull, arg } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import CreateImageInput from '../../input/Image.input';
import { createImage } from './Image.resolver';


const CreateImage = mutationField('createImage', {
  type: 'Image',
  args: {
    data: nonNullArg(CreateImageInput)
  },
  resolve: (_, args, context) => {
    const { data } = args;
    return createImage(data, context);
  }
});

export { CreateImage };