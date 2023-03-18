import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import 'dotenv/config';

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];
type UpdateFisherfolkInput = NexusGenInputs['UpdateFisherfolkInput'];

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
  fisherfolkId: number,
  input: UpdateFisherfolkInput,
  ctx: Context
) => {
  const orgInput = input.organizations[0];

  const fisherfolkOrganization = await ctx.prisma.member.findFirst({
    where: {
      fisherfolkId: fisherfolkId,
    },
    select: { organizationId: true },
  });

  // update existing fisherfolk org
  if (fisherfolkOrganization) {
    return ctx.prisma.fisherfolk.update({
      where: {
        id: fisherfolkId,
      },
      data: {
        ...input,
        livelihoods: {
          updateMany: {
            data: {
              ...input.livelihoods[0],
            },
            where: {
              fisherfolkId: fisherfolkId,
            },
          },
        },
        organizations: {
          update: {
            data: {
              position: orgInput?.position,
              yearJoined: orgInput?.yearJoined,
              organization: {
                update: {
                  name: orgInput?.name,
                },
              },
            },
            where: {
              id: {
                fisherfolkId: fisherfolkId,
                organizationId: fisherfolkOrganization.organizationId,
              },
            },
          },
        },
      },
    });
  }

  // create fisherfolk org if it doesn't exist
  if (!fisherfolkOrganization && orgInput) {
    return ctx.prisma.fisherfolk.update({
      where: {
        id: fisherfolkId,
      },
      data: {
        ...input,
        livelihoods: {
          updateMany: {
            data: {
              ...input.livelihoods[0],
            },
            where: {
              fisherfolkId: fisherfolkId,
            },
          },
        },
        organizations: {
          create: {
            position: orgInput.position,
            yearJoined: orgInput.yearJoined,
            organization: {
              connectOrCreate: {
                create: {
                  name: orgInput.name,
                },
                where: {
                  name: orgInput.name,
                },
              },
            },
          },
        },
      },
    });
  }

  return ctx.prisma.fisherfolk.update({
    where: {
      id: fisherfolkId,
    },
    data: {
      ...input,
      livelihoods: {
        updateMany: {
          data: {
            ...input.livelihoods[0],
          },
          where: {
            fisherfolkId: fisherfolkId,
          },
        },
      },
      organizations: {},
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
