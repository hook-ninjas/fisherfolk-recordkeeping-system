import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';
import 'dotenv/config';


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

export async function uploadImage(
  image: CreateImageInput ) {
  
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  try {
    const result = await cloudinary.v2.uploader.upload(image.url);
    return result.url;
  } catch {
    return 'Failed to upload an image to cloudinary';
  } 
  
}