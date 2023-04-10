import { GearClassification, SourceOfIncome } from '@prisma/client';
import { NexusGenInputs } from '../generated/nexus';

const convertMainFishAct = (mainFishingAct: SourceOfIncome) => ({
  type: mainFishingAct,
  description: '',
  isMain: true,
});

const convertOtherFishAct = (otherFishAct: SourceOfIncome) => ({
  type: otherFishAct,
  description: '',
  isMain: false,
});

const convertOtherSrcOfIncome = (src: string) => ({
  type: SourceOfIncome['Others'],
  description: src,
  isMain: false,
});

export const convertActivities = (
  mainFishingAct: SourceOfIncome,
  otherFishingActs: SourceOfIncome[],
  otherSrcOfIncome: string
) => {
  const livelihoods = [];

  if (otherFishingActs.length != 0) {
    const secondaryLivelihood = otherFishingActs.map(convertOtherFishAct);
    livelihoods.push(secondaryLivelihood);
  }

  if (otherSrcOfIncome != '') {
    const nonFishingLivelihood = convertOtherSrcOfIncome(otherSrcOfIncome);
    livelihoods.push(nonFishingLivelihood);
  }

  const main = convertMainFishAct(mainFishingAct);

  livelihoods.push(main);

  return livelihoods.flat();
};

export const determineGearClass = (type: string) => {
  const gearOptions = {
    hookAndLine: [
      'Simple Hand Line',
      'Multiple Hand Line',
      'Bottom Set Long Line',
      'Drift Long Line',
      'Troll Line',
      'Jig',
    ],
    gillNets: [
      'Surface Set Gill Net',
      'Drift Gill Net',
      'Bottom Set Gill Net',
      'Trammel Net',
      'Encircling Gill Net',
    ],
    liftNets: [
      'Crab Lift Nets/Bintol',
      'Fish Lift Nets/Bagnet',
      'New Look/Zapara',
      'Shrimp Lift Nets',
      'Lever Net',
    ],
    potsAndTraps: [
      'CrabPots',
      'SquidPots',
      'FykeNetsOrFilterNets',
      'FishCorralsOrBaklad',
      'SetNetOrLambaklad',
      'BarrierNetOrLikus',
      'FishPots',
    ],
    seineNets: ['BeachSeine', 'FryDozerOrGatherer'],
    scoopNets: ['ManPushNets', 'ScoopNets'],
    fallingGear: ['CastNet'],
    miscellaneous: ['Spear', 'OctopusOrSquidLuringDevice', 'GaffHook'],
  };

  let classification: GearClassification = 'Others';

  if (gearOptions['hookAndLine'].includes(type)) {
    classification = 'HookAndLine';
  }

  if (gearOptions['gillNets'].includes(type)) {
    classification = 'GillNets';
  }

  if (gearOptions['liftNets'].includes(type)) {
    classification = 'LiftNets';
  }

  if (gearOptions['potsAndTraps'].includes(type)) {
    classification = 'PotsAndTraps';
  }

  if (gearOptions['seineNets'].includes(type)) {
    classification = 'SeineNets';
  }

  if (gearOptions['scoopNets'].includes(type)) {
    classification = 'ScoopNets';
  }

  if (gearOptions['fallingGear'].includes(type)) {
    classification = 'FallingGear';
  }

  if (gearOptions['miscellaneous'].includes(type)) {
    classification = 'Miscellaneous';
  }

  return { classification: GearClassification[classification], type: type };
};

export const determineGears = (gears: string[]) =>
  gears.map(determineGearClass);

export const getVesselInfo = (
  vessel: NexusGenInputs['CreateFfolkVesselInput']
) => {
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
