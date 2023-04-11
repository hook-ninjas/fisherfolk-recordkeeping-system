import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateProgramInput = NexusGenInputs['CreateProgramInput'];

export const createProgram = (data: CreateProgramInput, ctx: Context) => {
  return ctx.prisma.governmentAid.create({
    data: {
      ...data
    }
  });
};


