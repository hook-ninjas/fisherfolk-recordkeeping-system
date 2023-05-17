import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateProgramInput = NexusGenInputs['CreateProgramInput'];
type UpdateProgramInput = NexusGenInputs['UpdateProgramInput'];

export const createProgram = (data: CreateProgramInput, ctx: Context) => {
  return ctx.prisma.governmentAid.create({
    data: {
      ...data,
    },
  });
};

export const updateProgram = async (governmentAidID: number, input: UpdateProgramInput, ctx: Context) => {
  return ctx.prisma.governmentAid.update({
    where: {
      id: governmentAidID,
    },
    data: {
      ...input,
    },
  });
};
