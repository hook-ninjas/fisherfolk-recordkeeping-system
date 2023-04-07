import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';

export const cloudURL = async (
  imageURI: string,
  options: cloudinary.UploadApiOptions
) => {
  const result = await cloudinary.v2.uploader.upload(imageURI, options);

  return result.url;
};

export const createImage = async (
  uploadImageInput: NexusGenInputs['UploadImageInput']
) => {
  const { name, size, type, uri, isProfileImage } = uploadImageInput;
  const cloudinaryURL = await cloudURL(uri, {
    folder: 'fisherfolk-recordkeeping-system',
    use_filename: true,
  });

  return {
    name: name,
    size: size,
    type: type,
    url: cloudinaryURL,
    isProfileImage: isProfileImage,
  };
};

export const createImages = async (
  files: NexusGenInputs['UploadImageInput'][]
) => await Promise.all(files.map(createImage));

export async function uploadImage(
  image: NexusGenInputs['CreateImageInput'],
  ctx: Context
) {
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
