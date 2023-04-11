import { mutationField } from 'nexus';
import { nonNullArg } from '../../../../utils/utils';
import CreateProgramInput from '../../input/GovernmentAid.input';
import { createProgram } from './Program.resolver';

const CreateProgram = mutationField('createProgram', {
  type: 'GovernmentAid',
  args: {
    data: nonNullArg(CreateProgramInput),
  },
  resolve: (_, args, ctx) => createProgram(args.data, ctx),
});

export { CreateProgram };
