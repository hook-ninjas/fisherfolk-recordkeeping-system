import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateOrganizationInput = NexusGenInputs['CreateFfolkOrganizationInput'];

export const createFisherfolkOrganization = (input: CreateOrganizationInput, context: Context) => {
  const { fisherfolkId, name, yearJoined, position } = input;

  return context.prisma.fisherfolk.update({
    where: {
      id: fisherfolkId,
    },
    data: {
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
};
