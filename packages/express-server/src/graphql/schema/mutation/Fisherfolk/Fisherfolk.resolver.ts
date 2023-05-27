import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import { createImage } from '../Image/Image.resolver';
import { createFisherfolkLivelihood } from '../Livelihood/Livelihood.resolver';
import { createFisherfolkOrganization } from '../Organization/Organization.resolver';
import { createFfolkGears } from '../Gears/Gears.resolver';
import { createFfolkVessel } from '../Vessel/Vessel.resolver';
import 'dotenv/config';
import Fisherfolk from '../../model/objecTypes/Fisherfolk';

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];
type UpdateFisherfolkInput = NexusGenInputs['UpdateFisherfolkInput'];

const createFisherfolk = async (
  input: NexusGenInputs['CreateFisherfolkInput'],
  context: Context
) => {
  const {
    organization,
    mainFishingActivity,
    otherFishingActivity,
    otherSourceOfIncome,
    gears,
    vessel,
    profilePhoto,
    files,
  } = input;

  const ffolkInfo = {
    lastName: input.lastName,
    firstName: input.firstName,
    middleName: input.middleName,
    appellation: input.appellation,
    age: input.age,
    salutation: input.salutation,
    barangay: input.barangay,
    cityMunicipality: input.cityMunicipality,
    province: input.province,
    contactNum: input.contactNum,
    residentYear: input.residentYear,
    dateOfBirth: input.dateOfBirth,
    placeOfBirth: input.placeOfBirth,
    religion: input.religion,
    gender: input.gender,
    civilStatus: input.civilStatus,
    numOfChildren: input.numOfChildren,
    nationality: input.nationality,
    educationalBackground: input.educationalBackground,
    personToNotify: input.personToNotify,
    ptnRelationship: input.ptnRelationship,
    ptnAddress: input.ptnAddress,
    ptnContactNum: input.ptnContactNum,
  };

  const fisherfolk = await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
    },
  });

  const { id } = fisherfolk;

  const livelihoods: NexusGenInputs['CreateFfolkLivelihoodInput'] = {
    fisherfolkId: id,
    mainFishingActivity: mainFishingActivity,
    otherFishingActivity: otherFishingActivity,
    otherSourceOfIncome: otherSourceOfIncome,
  };

  createFisherfolkLivelihood(livelihoods, context);

  const images = [profilePhoto, ...files];

  for (const image in images) {
    await createImage({ fisherfolkId: id, ...images[image] }, context);
  }

  if (organization) {
    await createFisherfolkOrganization(
      { fisherfolkId: id, ...organization },
      context
    );
  }

  if (gears) {
    await createFfolkGears({ fisherfolkId: id, types: gears }, context);
  }

  if (vessel) {
    await createFfolkVessel({ fisherfolkId: id, ...vessel }, context);
  }

  return fisherfolk;
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

const archiveFisherfolk = async (id: number, ctx: Context) => {
  return ctx.prisma.fisherfolk.update({
    where: {
      id: id,
    },
    data: {
      isArchive: true,
    },
  });

  // return ctx.prisma
};

const restoreFisherfolk = async (id: number, ctx: Context) => {
  return ctx.prisma.fisherfolk.update({
    where: {
      id: id,
    },
    data: {
      isArchive: false,
    },
  });
};

export {
  createFisherfolk,
  updateFisherfolk,
  archiveFisherfolk,
  restoreFisherfolk,
};
