import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import 'dotenv/config';

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];

const createFisherfolk = (input: CreateFisherfolkInput, ctx: Context) => {
  const { organization, livelihoods } = input;

  if (organization != null || organization != undefined) {
    const { yearJoined, position, name } = organization;

    return ctx.prisma.fisherfolk.create({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
        organizations: {
          create: {
            yearJoined,
            position,
            organization: {
              connectOrCreate: {
                create: {
                  name,
                },
                where: {
                  name: name,
                },
              },
            },
          },
        },
      },
    });
  }

  return ctx.prisma.fisherfolk.create({
    data: {
      ...input,
      livelihoods: {
        createMany: {
          data: [...livelihoods],
        },
      },
    },
  });
};

const updateFisherfolk = async (
  id: number,
  input: CreateFisherfolkInput,
  ctx: Context
) => {
  return ctx.prisma.fisherfolk.update({
    where: {
      id: id,
    },
    data: {
      ...input,
      livelihoods: {
        updateMany: {
          data: {
            ...input.livelihoods[0], 
            // updates main fishing activity only
          },
          where: { 
            fisherfolkId: id
          },
        },
      },
    },
  });
};

const archiveFisherfolk = async (
  id: number,
  ctx: Context
) => {
  ctx.prisma.fisherfolk.delete({
    where: {
      id: id
    }
  });

  // return ctx.prisma
};

export { createFisherfolk, updateFisherfolk, archiveFisherfolk };
