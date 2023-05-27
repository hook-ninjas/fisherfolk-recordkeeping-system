import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateVesselInput = NexusGenInputs['CreateVesselInput'];
type UpdateVesselInput = NexusGenInputs['UpdateVesselInput'];
type CreateGearInput = NexusGenInputs['CreateGearInput'];

export function createVessel(vessel: CreateVesselInput, ctx: Context) {
  return ctx.prisma.vessel.create({
    data: {
      ...vessel,
    },
  });
}

export async function createGear(gear: CreateGearInput, ctx: Context) {
  return await ctx.prisma.gear.create({
    data: {
      classification: gear.classification,
      fisherfolkId: gear.fisherfolkId,
      type: gear.type,
    },
  });
}

export async function createGears(gears: CreateGearInput[], ctx: Context) {
  gears.map(async (gear) => {
    await createGear(gear, ctx);
  });
}

export async function createVesselWithGear(
  vessel: CreateVesselInput,
  gears: CreateGearInput[],
  ctx: Context
) {
  await createGears(gears, ctx);

  return createVessel(vessel, ctx);
}

export async function updateMfvr(id: number, mfvr: string, ctx: Context) {
  return ctx.prisma.vessel.update({
    where: {
      id: id,
    },
    data: {
      mfvrNumber: mfvr,
    },
  });
}

export async function archiveGear(id: number, ctx: Context) {
  return ctx.prisma.gear.update({
    where: {
      id: id,
    },
    data: {
      isArchive: true,
    },
  });
}

export async function archiveVessel(id: number, ctx: Context) {
  return ctx.prisma.vessel.update({
    where: {
      id: id,
    },
    data: {
      isArchive: true,
    },
  });
}

export async function updateVessel(
  id: number,
  vessel: UpdateVesselInput,
  ctx: Context
) {
  return ctx.prisma.vessel.update({
    where: {
      id: id,
    },
    data: {
      ...vessel,
    },
  });
}

export const restoreGear = async (id: number, ctx: Context) => {
  return ctx.prisma.gear.update({
    where: {
      id: id,
    },
    data: {
      isArchive: false,
    },
  });
};

export const restoreVessel = async (id: number, ctx: Context) => {
  return ctx.prisma.vessel.update({
    where: {
      id: id,
    },
    data: {
      isArchive: false,
    },
  });
};
