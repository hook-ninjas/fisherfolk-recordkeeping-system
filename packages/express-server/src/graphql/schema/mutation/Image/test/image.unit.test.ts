import { faker } from '@faker-js/faker';
import cloudinary from 'cloudinary';
import { uploadToCloud, createImage } from '../Image.resolver';
import { Context, createMockContext } from '../../../../context';
import { MockContext } from '../../../../../types/types';
import { NexusGenInputs } from '../../../../generated/nexus';

let mockContext: MockContext;
let context: Context;

jest.mock('cloudinary');

// Mock of the cloudinary upload api //
const mockUpload = jest.fn(
  async (imageURI: string, options?: cloudinary.UploadApiOptions) => {
    const { word } = faker;

    let value = {
      url: `http://res.cloudinary.com/<cloudName>/image/upload/<version>/${word.noun()}.svg`,
    };

    if (options != undefined) {
      const { folder } = options;
      value = {
        url: `http://res.cloudinary.com/<cloudName>/image/upload/<version>/${folder}/test.svg`,
      };
    }

    return Promise.resolve(value);
  }
);

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
  (cloudinary.v2.uploader.upload as jest.Mock).mockImplementation(mockUpload);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('uploadToCloud', () => {
  it('Should create a cloudinary URL from a dataURI input', async () => {
    const { image } = faker;
    const dataURI = image.dataUri();
    const cloudinaryOptions = {
      folder: 'fisherfolk-recordkeeping-system',
      use_filename: true,
    };

    const result = await uploadToCloud(dataURI, cloudinaryOptions);

    expect(result).toMatch(/^https?:\/\/res.cloudinary.com\//);

    expect(cloudinary.v2.uploader.upload).toHaveReturned();

    expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
      dataURI,
      cloudinaryOptions
    );
  });
});

describe('createImage', () => {
  it('Should call cloudinary api and prisma.image.create', async () => {
    const { word, datatype, image } = faker;
    const cloudinaryOptions = {
      folder: 'fisherfolk-recordkeeping-system',
      use_filename: true,
    };
    const input: NexusGenInputs['UploadImageInput'] = {
      fisherfolkId: 1021,
      name: word.noun(),
      size: datatype.float(10),
      type: 'image/svg',
      uri: image.dataUri(),
      isProfileImage: true,
    };

    const inputUrl = await uploadToCloud(input.uri, cloudinaryOptions);

    const expectedPrismaArg = {
      data: {
        name: input.name,
        size: input.size,
        type: input.type,
        url: inputUrl,
        isProfileImage: input.isProfileImage,
        fisherfolk: {
          connect: { id: input.fisherfolkId },
        },
      },
    };

    const result = await createImage(input, context);

    expect(cloudinary.v2.uploader.upload).toHaveReturned();

    expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
      input.uri,
      cloudinaryOptions
    );

    expect(context.prisma.image.create).toHaveReturned();

    expect(context.prisma.image.create).toHaveBeenCalledWith(expectedPrismaArg);
  });
});
