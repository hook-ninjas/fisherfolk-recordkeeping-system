import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';

export const uploadToCloud = async (imageURI: string, options: cloudinary.UploadApiOptions) => {
  const result = await cloudinary.v2.uploader.upload(imageURI, options);

  return result.url;
};

export const createImage = async (input: NexusGenInputs['UploadImageInput'], context: Context) => {
  const { fisherfolkId, gearId, vesselId, name, size, type, uri, isProfileImage } = input;
  const url = await uploadToCloud(uri, {
    folder: 'fisherfolk-recordkeeping-system',
    use_filename: true,
  });

  if (fisherfolkId) {
    return await context.prisma.image.create({
      data: {
        name,
        size,
        type,
        url,
        isProfileImage,
        fisherfolk: {
          connect: { id: fisherfolkId },
        },
      },
    });
  }

  if (gearId) {
    return await context.prisma.image.create({
      data: {
        name,
        size,
        type,
        url,
        isProfileImage,
        gear: {
          connect: { id: gearId },
        },
      },
    });
  }

  if (vesselId) {
    return await context.prisma.image.create({
      data: {
        name,
        size,
        type,
        url,
        isProfileImage,
        vessel: {
          connect: { id: vesselId },
        },
      },
    });
  }
};

export async function uploadImage(image: NexusGenInputs['CreateImageInput'], ctx: Context) {
  const result = await cloudinary.v2.uploader.upload(image.url, {
    folder: 'fisherfolk-recordkeeping-system',
  });
  console.log(result.url); //checks cloudinary url

  return await ctx.prisma.image.create({
    data: {
      fisherfolkId: image.fisherfolkId,
      gearId: image.gear_id,
      vesselId: image.vessel_id,
      name: result.signature,
      url: result.url,
      updatedAt: result.created_at,
    },
  });
}
