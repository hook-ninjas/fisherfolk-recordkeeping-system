import {
  GearClassification,
  Gender,
  SourceOfIncome,
  Salutation,
  EducationalBackground,
  CivilStatus,
  Material,
  FisherfolkStatus,
} from '../../graphql/generated';
import data from './iloilo-city-brgys.json';

export const createOption = (label: string) => ({
  label,
  value: label,
});

export const fisherfolkStatus = Object.values(FisherfolkStatus).map((a)=>createOption(a));

export const livelihoods = Object.values(SourceOfIncome).map((a)=>createOption(a)).slice(0, -1);

export const cityMunicipalityOptions = [createOption('Iloilo City')];

export const provinceOptions = [createOption('Iloilo')];

export const nationalityOptions = [createOption('Filipino')];

export const vesselTypeOptions = ['Non-Motorized', 'Motorized'].map((a) =>
  createOption(a)
);

export const materialOptions = Object.values(Material);

export const educationalBackgroundOptions = Object.values(
  EducationalBackground
).map((a) => createOption(a));

export const civilStatusOptions = Object.values(CivilStatus);

export const sourceOfIncomeOptions = Object.values(SourceOfIncome).slice(0, -1);

export const barangayOptions = data.barangays.sort().map((a) => createOption(a));

export const genderOptions = Object.values(Gender).map((a) => createOption(a));

export const registrationTypes = ['NewRegistration', 'Renewal'].map((a) =>
  createOption(a)
);

export const registrationTypeForBoatsAndGears = [
  'Initial Registration',
  'Renewal',
].map((a) => createOption(a));

export const salutationOptions = Object.values(Salutation).map((a) =>
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
  [GearClassification.LiftNets]: [
    'CrabLiftNetsOrBintol',
    'FishLiftNetsOrBagnet',
    'NewLookOrZapara',
    'ShrimpLiftNets',
    'LeverNet',
  ],
  [GearClassification.PotsAndTraps]: [
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
