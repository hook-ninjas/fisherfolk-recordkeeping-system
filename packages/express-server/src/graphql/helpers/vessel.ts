import { NexusGenInputs } from '../generated/nexus';

type CreateFfolkVesselInput = NexusGenInputs['CreateFfolkVesselInput'];

const getVesselInfo = (vessel: CreateFfolkVesselInput) => {
  return {
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

export { getVesselInfo };
