import { GearClassification } from '@prisma/client';

const determineGearClass = (type: string) => {
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

const determineGears = (gears: string[]) => gears.map(determineGearClass);

export { determineGears };
