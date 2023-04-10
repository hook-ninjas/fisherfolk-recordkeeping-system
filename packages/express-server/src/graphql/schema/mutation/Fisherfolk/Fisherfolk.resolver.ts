import {
  Salutation,
  Gender,
  CivilStatus,
  EducationalBackground,
  Image,
  Livelihood,
} from '@prisma/client';
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import { createImage, createImages } from '../Image/Image.resolver';
import { convertActivities } from '../../../helpers/livelihood';
import { determineGears } from '../../../helpers/gear';
import { getVesselInfo } from '../../../helpers/vessel';
interface FisherFolkInfo {
  lastName: string;
  firstName: string;
  middleName: string;
  appellation: string;
  age: number;
  salutation: Salutation;
  barangay: string;
  cityMunicipality: string;
  province: string;
  contactNum: string;
  residentYear: number;
  dateOfBirth: Date;
  placeOfBirth: string;
  religion: string;
  gender: Gender;
  civilStatus: CivilStatus;
  numOfChildren: number;
  nationality: string;
  educationalBackground: EducationalBackground;
  personToNotify: string;
  ptnRelationship: string;
  ptnAddress: string;
  ptnContactNum: string;
}

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];

const createFfolkWithOrg = async (
  ffolkInfo: FisherFolkInfo,
  organization: NexusGenInputs['OrganizationInput'],
  livelihoods: Livelihood[],
  images: Image[],
  context: Context
) => {
  const { name, yearJoined, position } = organization;

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
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
};

const createFfolkWithOrgAndGear = async (
  ffolkInfo: FisherFolkInfo,
  organization: NexusGenInputs['OrganizationInput'],
  livelihoods: Livelihood[],
  images: Image[],
  gearTypes: string[],
  context: Context
) => {
  const { name, yearJoined, position } = organization;
  const gears = determineGears(gearTypes);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      gears: {
        createMany: {
          data: {
            ...gears,
          },
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
};

const createFfolkWithOrgAndVessel = async (
  ffolkInfo: FisherFolkInfo,
  organization: NexusGenInputs['OrganizationInput'],
  livelihoods: Livelihood[],
  images: Image[],
  vessel: NexusGenInputs['CreateFfolkVesselInput'],
  context: Context
) => {
  const { name, yearJoined, position } = organization;
  const vesselInfo = getVesselInfo(vessel);
  const vesselImages = await createImages(vessel.files);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      vessels: {
        create: {
          ...vesselInfo,
          images: {
            createMany: {
              data: {
                ...vesselImages,
              },
            },
          },
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
};

const createFfolkWithOrgGearAndVessel = async (
  ffolkInfo: FisherFolkInfo,
  organization: NexusGenInputs['OrganizationInput'],
  livelihoods: Livelihood[],
  images: Image[],
  gearTypes: string[],
  vessel: NexusGenInputs['CreateFfolkVesselInput'],
  context: Context
) => {
  const { name, yearJoined, position } = organization;
  const gears = determineGears(gearTypes);
  const vesselInfo = getVesselInfo(vessel);
  const vesselImages = await createImages(vessel.files);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      gears: {
        createMany: {
          data: {
            ...gears,
          },
        },
      },
      vessels: {
        create: {
          ...vesselInfo,
          images: {
            createMany: {
              data: {
                ...vesselImages,
              },
            },
          },
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
};

const createFfolkWithGear = async (
  ffolkInfo: FisherFolkInfo,
  livelihoods: Livelihood[],
  images: Image[],
  gearTypes: string[],
  context: Context
) => {
  const gears = determineGears(gearTypes);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      gears: {
        createMany: {
          data: {
            ...gears,
          },
        },
      },
    },
  });
};

const createFfolkWithVessel = async (
  ffolkInfo: FisherFolkInfo,
  livelihoods: Livelihood[],
  images: Image[],
  vessel: NexusGenInputs['CreateFfolkVesselInput'],
  context: Context
) => {
  const vesselInfo = getVesselInfo(vessel);
  const vesselImages = await createImages(vessel.files);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      vessels: {
        create: {
          ...vesselInfo,
          images: {
            createMany: {
              data: {
                ...vesselImages,
              },
            },
          },
        },
      },
    },
  });
};

const createFfolkWithGearAndVessel = async (
  ffolkInfo: FisherFolkInfo,
  livelihoods: Livelihood[],
  images: Image[],
  gearTypes: string[],
  vessel: NexusGenInputs['CreateFfolkVesselInput'],
  context: Context
) => {
  const gears = determineGears(gearTypes);
  const vesselInfo = getVesselInfo(vessel);
  const vesselImages = await createImages(vessel.files);

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
        },
      },
      gears: {
        createMany: {
          data: {
            ...gears,
          },
        },
      },
      vessels: {
        create: {
          ...vesselInfo,
          images: {
            createMany: {
              data: {
                ...vesselImages,
              },
            },
          },
        },
      },
    },
  });
};

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

  const livelihoods = convertActivities(
    mainFishingActivity,
    otherFishingActivity,
    otherSourceOfIncome
  ) as Livelihood[];

  const profilePhoto = await createImage(input.profilePhoto);
  const files = await createImages(input.files);
  const images = [profilePhoto, ...files] as Image[];

  if (organization != null || organization != undefined) {
    if (gears != null && gears.length != 0) {
      return await createFfolkWithOrgAndGear(
        ffolkInfo,
        organization,
        livelihoods,
        images,
        gears,
        context
      );
    }

    if (vessel != null) {
      return await createFfolkWithOrgAndVessel(
        ffolkInfo,
        organization,
        livelihoods,
        images,
        vessel,
        context
      );
    }

    if (vessel != null && gears != null && gears.length != 0) {
      return await createFfolkWithOrgGearAndVessel(
        ffolkInfo,
        organization,
        livelihoods,
        images,
        gears,
        vessel,
        context
      );
    }

    return createFfolkWithOrg(
      ffolkInfo,
      organization,
      livelihoods,
      images,
      context
    );
  }

  if (gears != null && gears.length != 0) {
    return await createFfolkWithGear(
      ffolkInfo,
      livelihoods,
      images,
      gears,
      context
    );
  }

  if (vessel != null) {
    return await createFfolkWithVessel(
      ffolkInfo,
      livelihoods,
      images,
      vessel,
      context
    );
  }

  if (vessel != null && gears != null && gears.length != 0) {
    return await createFfolkWithGearAndVessel(
      ffolkInfo,
      livelihoods,
      images,
      gears,
      vessel,
      context
    );
  }

  return await context.prisma.fisherfolk.create({
    data: {
      ...ffolkInfo,
      livelihoods: {
        createMany: {
          data: {
            ...livelihoods,
          },
        },
      },
      images: {
        createMany: {
          data: {
            ...images,
          },
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
            fisherfolkId: id,
          },
        },
      },
    },
  });
};

export { createFisherfolk, updateFisherfolk };
