import { context, Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';
import 'dotenv/config';


type CreateImageInput = NexusGenInputs['CreateImageInput'];

export async function uploadImage(
  image: CreateImageInput,
  ctx: Context) {
  
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  

  const result = await cloudinary.v2.uploader.upload(image.url);
  console.log(result.url); //checks cloudinary url

  return await ctx.prisma.image.create({
    data: {
      fisherfolkId: image.fisherfolkId,
      gearId: image.gear_id,
      vesselId: image.vessel_id,
      name: result.signature,
      url: result.url,
      updatedAt: result.created_at,
    }
  });   
}
