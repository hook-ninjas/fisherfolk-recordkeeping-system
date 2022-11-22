import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateVesselInput = NexusGenInputs['CreateVesselInput'];
type CreateGearInput = NexusGenInputs['CreateGearInput'];

export async function createVesselWithGear(
  vessel: CreateVesselInput, 
  gears: CreateGearInput[], 
  ctx: Context) {
  await ctx.prisma.gear.createMany({
    data: {
      ...gears
    }
  });
  return ctx.prisma.vessel.create({
    data: {
      ...vessel,
    },
  });
}