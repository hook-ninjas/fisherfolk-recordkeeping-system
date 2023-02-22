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

export { createFisherfolk };
