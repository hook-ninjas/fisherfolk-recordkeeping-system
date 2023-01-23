import { context, Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import cloudinary from 'cloudinary';
import 'dotenv/config';

type CreateFisherfolkInput = NexusGenInputs['CreateFisherfolkInput'];

const createFisherfolk = (input: CreateFisherfolkInput, ctx: Context) => {
  const { organization, livelihoods } = input;

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (organization != null || organization != undefined) {
    const { yearJoined, position, name } = organization;
    const photo = input.photo;
    try {
      const result = cloudinary.v2.uploader.upload(photo, {
        allowed_formats: ['jpg', 'png'],
        public_id: '',
      });
    } catch (e) {
      return 'Image could not be uploaded';
    }

    return ctx.prisma.fisherfolk.create({
      data: {
        ...input,
        livelihoods: {
          createMany: {
            data: [...livelihoods],
          },
        },
        organizations: {
          create: {
            yearJoined,
            position,
            organization: {
              connectOrCreate: {
                create: {
                  name,
                },
                where: {
                  name: name,
                },
              },
            },
          },
        },
      },
    });
  }

  return ctx.prisma.fisherfolk.create({
    data: {
      ...input,
      livelihoods: {
        createMany: {
          data: [...livelihoods],
        },
      },
    },
  });
};

export { createFisherfolk };
