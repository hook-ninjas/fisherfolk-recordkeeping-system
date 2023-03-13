import { intArg, mutationField } from 'nexus';
import { createFisherfolk, updateFisherfolk, archiveFisherfolk } from './Fisherfolk.resolver';
import CreateFisherfolkInput from '../../input/Fisherfolk.input';
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
    id: intArg(),
    data: nonNullArg(CreateFisherfolkInput),
  },
  resolve: (_, args, ctx) => updateFisherfolk(args.id, args.data, ctx)
});

const ArchiveFisherfolk = mutationField('archiveFisherfolk', {
  type: Fisherfolk,
  args: {
    id: intArg(),
  }, 
  resolve: (_, args, ctx) => archiveFisherfolk(args.id, ctx)
});

export { CreateFisherfolk, UpdateFisherfolk };
