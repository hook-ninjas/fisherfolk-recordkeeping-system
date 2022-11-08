import { mutationField } from 'nexus';
import { createFisherfolk } from './Fisherfolk.resolver';
import CreateFisherfolkInput from '../../input/Fisherfolk.input';
import { nonNullArg } from '../../../../utils/utils';
import Fisherfolk from '../../model/Fisherfolk';

const CreateFisherfolk = mutationField('createFisherfolk', {
  type: Fisherfolk,
  args: {
    data: nonNullArg(CreateFisherfolkInput),
  },
  resolve: (_, args, context) => {
    const { data } = args;
    return createFisherfolk(data, context);
  },
});

export { CreateFisherfolk };
