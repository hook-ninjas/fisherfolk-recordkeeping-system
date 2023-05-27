import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import { createImage } from '../Image/Image.resolver';
import { createFisherfolkLivelihood } from '../Livelihood/Livelihood.resolver';
import { createFisherfolkOrganization } from '../Organization/Organization.resolver';
import { createFfolkGears } from '../Gears/Gears.resolver';
import { createFfolkVessel } from '../Vessel/Vessel.resolver';
const createFisherfolk = async (input: NexusGenInputs['CreateFisherfolkInput'], context: Context) => {
  const { organization, mainFishingActivity, otherFishingActivity, otherSourceOfIncome, gears, vessel, profilePhoto, files } = input;

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

  const livelihoods: NexusGenInputs['CreateFfolkLivelihoodInput'] = { fisherfolkId: id, mainFishingActivity: mainFishingActivity, otherFishingActivity: otherFishingActivity, otherSourceOfIncome: otherSourceOfIncome };

  createFisherfolkLivelihood(livelihoods, context);

  const images = [profilePhoto, ...files];

  for (const image in images) {
    await createImage({ fisherfolkId: id, ...images[image] }, context);
  }

  if (organization) {
    await createFisherfolkOrganization({ fisherfolkId: id, ...organization }, context);
  }

  if (gears) {
    await createFfolkGears({ fisherfolkId: id, types: gears }, context);
  }

  if (vessel) {
    await createFfolkVessel({ fisherfolkId: id, ...vessel }, context);
  }

  return fisherfolk;
};

// const updateFisherfolk = async (
//   id: number,
//   input: CreateFisherfolkInput,
//   ctx: Context
// ) => {
//   return ctx.prisma.fisherfolk.update({
//     where: {
//       id: id,
//     },
//     data: {
//       ...input,
//       livelihoods: {
//         updateMany: {
//           data: {
//             ...input.livelihoods[0],
//             // updates main fishing activity only
//           },
//           where: {
//             fisherfolkId: id,
//           },
//         },
//       },
//     },
//   });
// };

export { createFisherfolk };
