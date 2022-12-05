import { Context, createMockContext } from '../../../context';
import { createVesselWithGear, createVessel, createGears } from './VesselWithGear.resolver';
import { MockContext } from '../../../../types/types';
import { Gear, GearClassification, Material } from '@prisma/client';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create vessel with gear record', async () => {
  const vessel = {
    createdAt: new Date('2021-09-18'),
    engineMake: 'Angel Craft',
    fisherfolkId: BigInt(1),
    grossTonnage: 2.4,
    homeport: 'Iloilo',
    horsepower: 2000,
    id: BigInt(220001),
    material: Material.Composite,
    mfvrNumber: 'IL22-AX0009',
    name: 'J&J',
    netTonnage: 2.0,
    permitId: '2022-ASJAKD-00028',
    placeBuilt: 'Iloilo',
    registeredBreadth: 4.3,
    registeredDepth: 1.8,
    registeredLength: 5.6,
    serialNumber: 'ADDADNASA173SA',
    tonnageBreadth: 4.3,
    tonnageDepth: 1.8,
    tonnageLength: 5.6,
    type: 'Motorized',
    updatedAt: new Date('2022-08-18'),
    yearBuilt: 2019,
  };

  const gears: Gear[] = [
    {
      classification: GearClassification.GillNets,
      createdAt: new Date('2021-09-18'),
      fisherfolkId: BigInt(1),
      id: BigInt(220091),
      isArchive: false,
      permitId: '2022-ASJAKD-00028',
      type: 'Drift gill net',
      updatedAt: new Date('2022-08-18'),
    },
  ];

  mockCtx.prisma.vessel.create.mockResolvedValue(vessel);
  mockCtx.prisma.gear.create.mockResolvedValue(gears[0]);

  await expect(createVesselWithGear(vessel, gears, ctx)).resolves.toEqual({
    ...vessel
  });

  expect(mockCtx.prisma.vessel.create).toBeCalledWith({
    data: {
      ...vessel
    }
  });

  expect(mockCtx.prisma.gear.create).toBeCalledWith({
    data: {
      classification: 'GillNets',
      fisherfolkId: BigInt(1),
      type: 'Drift gill net',
    },
  });
});

test('should create vessel only', async () => {
  const vessel = {
    createdAt: new Date('2021-09-18'),
    engineMake: 'Angel Craft',
    fisherfolkId: BigInt(1),
    grossTonnage: 2.4,
    homeport: 'Iloilo',
    horsepower: 2000,
    id: BigInt(220001),
    material: Material.Composite,
    mfvrNumber: 'IL22-AX0009',
    name: 'J&J',
    netTonnage: 2.0,
    permitId: '2022-ASJAKD-00028',
    placeBuilt: 'Iloilo',
    registeredBreadth: 4.3,
    registeredDepth: 1.8,
    registeredLength: 5.6,
    serialNumber: 'ADDADNASA173SA',
    tonnageBreadth: 4.3,
    tonnageDepth: 1.8,
    tonnageLength: 5.6,
    type: 'Motorized',
    updatedAt: new Date('2022-08-18'),
    yearBuilt: 2019,
  };

  mockCtx.prisma.vessel.create.mockResolvedValue(vessel);

  await expect(createVessel(vessel, ctx)).resolves.toEqual({
    ...vessel
  });

  expect(mockCtx.prisma.vessel.create).toBeCalledWith({
    data: {
      ...vessel
    }
  });
});

test('should create gear/s only', async () => {
  const gears: Gear[] = [
    {
      classification: GearClassification.GillNets,
      createdAt: new Date('2021-09-18'),
      fisherfolkId: BigInt(1),
      id: BigInt(220091),
      isArchive: false,
      permitId: '2022-ASJAKD-00028',
      type: 'Drift gill net',
      updatedAt: new Date('2022-08-18'),
    },
    {
      classification: GearClassification.HookAndLine,
      createdAt: new Date('2021-09-18'),
      fisherfolkId: BigInt(1),
      id: BigInt('220091'),
      isArchive: false,
      permitId: '2022-ASJAKD-00028',
      type: 'Simple-hand line',
      updatedAt: new Date('2022-08-18'),
    }
  ];

  mockCtx.prisma.gear.create.mockResolvedValue(gears[0]);
  mockCtx.prisma.gear.create.mockResolvedValue(gears[1]);
  
  expect(createGears(gears, ctx)).resolves;

  expect(mockCtx.prisma.gear.create).toBeCalledTimes(2);
  
  expect(mockCtx.prisma.gear.create).toBeCalledWith({
    data: {
      classification: 'GillNets',
      fisherfolkId: BigInt(1),
      type: 'Drift gill net',
    },
  });

  expect(mockCtx.prisma.gear.create).toBeCalledWith({
    data: {
      classification: 'HookAndLine',
      fisherfolkId: BigInt(1),
      type: 'Simple-hand line',
    }
  });
  
});