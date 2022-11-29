import {
  GearClassification,
  Gender,
  SourceOfIncome,
  Salutation,
  EducationalBackground,
  CivilStatus,
  Material,
} from '../../graphql/generated';
import data from './iloilo-city-brgys.json';

export const createOption = (label: string) => ({
  label,
  value: label,
});

export const nationalityOptions = [createOption('Filipino')];

export const vesselTypeOptions = ['Non-Motorized', 'Motorized'].map((a) =>
  createOption(a)
);

export const materials = Object.values(Material);

export const educationalBackgroundOptions = Object.values(
  EducationalBackground
).map((a) => createOption(a));

export const civilStatus = Object.values(CivilStatus);

export const sourcesOfIncome = Object.values(SourceOfIncome).slice(0, -1);

export const barangays = data.barangays.sort();

export const genders = Object.values(Gender).map((a) => createOption(a));

export const registrationTypes = ['NewRegistration', 'Renewal'].map((a) =>
  createOption(a)
);

export const registrationTypeForBoatsAndGears = [
  'Initial Registration',
  'Issuance of New Certificate of Number(CN)',
  'Re-Issuance of Certificate of Number',
].map((a) => createOption(a));

export const salutations = Object.values(Salutation).map((a) =>
  createOption(a)
);

export const gears = {
  [GearClassification.HookAndLine]: [
    'SimpleHandLine',
    'MultipleHandLine',
    'BottomSetLongLine',
    'DriftLongLine',
    'TrollLine',
    'Jig',
  ],
  [GearClassification.GillNets]: [
    'SurfaceSetGillNet',
    'DriftGillNet',
    'BottomSetGillNet',
    'TrammelNet',
    'EncirclingGillNet',
  ],
  [GearClassification.PotsAndTraps]: [
    'CrabLiftNetsOrBintol',
    'FishLiftNetsOrBagnet',
    'NewLookOrZapara',
    'ShrimpLiftNets',
    'LeverNet',
  ],
  [GearClassification.LiftNets]: [
    'CrabPots',
    'SquidPots',
    'FykeNetsOrFilterNets',
    'FishCorralsOrBaklad',
    'SetNetOrLambaklad',
    'BarrierNetOrLikus',
    'FishPots',
  ],
  [GearClassification.SeineNets]: ['BeachSeine', 'FryDozerOrGatherer'],
  [GearClassification.ScoopNets]: ['ManPushNets', 'ScoopNets'],
  [GearClassification.Miscellaneous]: [
    'Spear',
    'OctopusOrSquidLuringDevice',
    'GaffHook',
  ],
  [GearClassification.FallingGear]: ['CastNet'],
  [GearClassification.Others]: ['Others'],
};
