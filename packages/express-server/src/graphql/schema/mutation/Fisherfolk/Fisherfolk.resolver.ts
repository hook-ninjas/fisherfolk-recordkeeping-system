import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];

const createFisherfolk = (input: CreateFisherfolkInput , ctx: Context) => {
  return ctx.prisma.fisherfolk.create({
    data: {
      ...input,
      status: 'ACTIVE',
    },
  });
};

export { createFisherfolk };
