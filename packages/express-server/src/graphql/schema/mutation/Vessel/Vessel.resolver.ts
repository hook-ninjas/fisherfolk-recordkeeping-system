import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import { createImage } from '../Image/Image.resolver';

export const getVesselInfo = (vessel: NexusGenInputs['CreateFfolkVesselInput']) => {
  return {
    fisherfolkId: vessel.fisherfolkId,
    mfvrNumber: vessel.mfvrNumber,
    homeport: vessel.homeport,
    name: vessel.name,
    type: vessel.type,
    placeBuilt: vessel.placeBuilt,
    yearBuilt: vessel.yearBuilt,
    material: vessel.material,
    registerdLength: vessel.registeredLength,
    registeredBreadth: vessel.registeredBreadth,
    registeredDepth: vessel.registeredDepth,
    tonnageLength: vessel.tonnageLength,
    tonnageBreadth: vessel.tonnageBreadth,
    tonnageDepth: vessel.tonnageDepth,
    grossTonnage: vessel.grossTonnage,
    netTonnage: vessel.netTonnage,
    engineMake: vessel.engineMake,
    serialNumber: vessel.serialNumber,
    horsepower: vessel.horsepower,
  };
};

export const createFfolkVessel = async (input: NexusGenInputs['CreateFfolkVesselInput'], context: Context) => {
  const { files } = input;
  const vesselInfo = getVesselInfo(input);

  const vessel = await context.prisma.vessel.create({
    data: {
      ...vesselInfo,
    },
  });

  const { id } = vessel;

  for (const file in files) {
    createImage({ vesselId: id, ...files[file] }, context);
  }

  return vessel;
};
