import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateImageInput = NexusGenInputs['CreateImageInput'];

export async function createImage(
  image: CreateImageInput,
  ctx: Context) {
  
  return await ctx.prisma.image.create({
    data: {
      fisherfolkId: image.fisherfolkId,
      gearId: image.gear_id,
      vesselId: image.vessel_id,
      name: image.name,
      url: image.url,
      format: image.format,
      version: image.version,
      updatedAt: image.updated_at
    }
  });
}