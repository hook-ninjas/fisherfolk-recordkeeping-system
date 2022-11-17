import { Context, createMockContext } from '../../../context';
import { createVesselWithGear } from './VesselWithGear.resolver';
import { MockContext } from '../../../../types/types';
import { Gear, GearClassification, Material, Vessel } from '@prisma/client';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create vessel with gear record', async () => {
  const vessel: Vessel = {
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

  mockCtx.prisma.vessel.create.mockResolvedValue(vessel);
  mockCtx.prisma.gear.createMany.mockResolvedValue({ count: gears.length });

  await expect(createVesselWithGear(vessel, gears, ctx)).resolves.toEqual({
    createdAt: new Date('2021-09-18'),
    engineMake: 'Angel Craft',
    fisherfolkId: BigInt(1),
    grossTonnage: 2.4,
    homeport: 'Iloilo',
    horsepower: 2000,
    id: BigInt(220001),
    material: 'Composite',
    mfvrNumber: 'IL22-AX0009',
    name: 'J&J',
    netTonnage: 2,
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
  });

  expect(mockCtx.prisma.vessel.create).toBeCalledWith({
    data: {
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
    }
  });

  expect(mockCtx.prisma.gear.createMany).toBeCalledWith({
    data: {
      0: {
        classification: GearClassification.GillNets,
        createdAt: new Date('2021-09-18'),
        fisherfolkId: BigInt(1),
        id: BigInt(220091),
        isArchive: false,
        permitId: '2022-ASJAKD-00028',
        type: 'Drift gill net',
        updatedAt: new Date('2022-08-18'),
      },
      1: {
        classification: GearClassification.HookAndLine,
        createdAt: new Date('2021-09-18'),
        fisherfolkId: BigInt(1),
        id: BigInt('220091'),
        isArchive: false,
        permitId: '2022-ASJAKD-00028',
        type: 'Simple-hand line',
        updatedAt: new Date('2022-08-18'),
      },
    },
  });
});