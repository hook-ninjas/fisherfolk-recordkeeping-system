import { intArg, mutationField } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import {
  CreateProgramInput,
  UpdateProgramInput,
} from '../../input/GovernmentAid.input';
import { createProgram, updateProgram } from './Program.resolver';

const CreateProgram = mutationField('createProgram', {
  type: 'GovernmentAid',
  args: {
    data: nonNullArg(CreateProgramInput),
  },
  resolve: (_, args, ctx) => createProgram(args.data, ctx),
});

const UpdateProgram = mutationField('updateProgram', {
  type: 'GovernmentAid',
  args: {
    governmentAidId: intArg(),
    data: nonNullArg(UpdateProgramInput),
  },
  resolve: (_, args, ctx) =>
    updateProgram(args.governmentAidId, args.data, ctx),
});

export { CreateProgram, UpdateProgram };
