import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';

type CreateImageInput = NexusGenInputs['CreateImageInput'];
type UploadImageInput = NexusGenInputs['UploadImageInput'];

const cloudURL = async (imageURI: string) => {
  const result = await cloudinary.v2.uploader.upload(imageURI, {
    folder: 'fisherfolk-recordkeeping-system',
  });

  return result.url;
};

const createImage = async (uploadImageInput: UploadImageInput) => {
  const { name, size, type, uri, isProfileImage } = uploadImageInput;
  const cloudinaryURL = await cloudURL(uri);

  return {
    name: name,
    size: size,
    type: type,
    url: cloudinaryURL,
    isProfileImage: isProfileImage,
  };
};

const createImages = async (files: UploadImageInput[]) =>
  await Promise.all(files.map(createImage));

async function uploadImage(image: CreateImageInput, ctx: Context) {
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

export { createImage, createImages, uploadImage };
