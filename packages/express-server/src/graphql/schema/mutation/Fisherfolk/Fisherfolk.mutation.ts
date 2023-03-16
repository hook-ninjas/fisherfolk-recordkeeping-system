import { intArg, mutationField } from 'nexus';
import { createFisherfolk, updateFisherfolk } from './Fisherfolk.resolver';
import {CreateFisherfolkInput, UpdateFisherfolkInput} from '../../input/Fisherfolk.input';
import { nonNullArg } from '../../../../utils/utils';
import Fisherfolk from '../../model/objecTypes/Fisherfolk';

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

const UpdateFisherfolk = mutationField('updateFisherfolk', {
  type: Fisherfolk,
  args: {
    fisherfolkId: intArg(),
    data: nonNullArg(UpdateFisherfolkInput),
  },
  resolve: (_, args, ctx) =>
    updateFisherfolk(args.fisherfolkId, args.data, ctx),
});

export { CreateFisherfolk, UpdateFisherfolk };
