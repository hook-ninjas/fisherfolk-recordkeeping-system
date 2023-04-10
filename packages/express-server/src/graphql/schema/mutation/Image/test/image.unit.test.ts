import { faker } from '@faker-js/faker';
import cloudinary from 'cloudinary';
import { cloudURL, createImage, createImages } from '../Image.resolver';
import { NexusGenInputs } from '../../../../generated/nexus';

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
        url: `http://res.cloudinary.com/<cloudName>/image/upload/<version>/${folder}/${word.noun()}.svg`,
      };
    }

    return Promise.resolve(value);
  }
);

(cloudinary.v2.uploader.upload as jest.Mock).mockImplementation(mockUpload);

afterEach(() => {
  mockUpload.mockClear();
});

describe('Create Cloudinary cloud URL', () => {
  it('Should create a cloudinary URL from a dataURI input', async () => {
    const { image } = faker;
    const dataURI = image.dataUri();
    const cloudinaryOptions = {
      folder: 'fisherfolk-recordkeeping-system',
      use_filename: true,
    };

    const result = await cloudURL(dataURI, cloudinaryOptions);

    expect(result).toMatch(/^https?:\/\/res.cloudinary.com\//);

    expect(cloudinary.v2.uploader.upload).toHaveReturned();

    expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
      dataURI,
      cloudinaryOptions
    );
  });
});

describe('Create an prisma image object', () => {
  it('Should create a single prisma image object', async () => {
    const { word, datatype, image } = faker;
    const cloudinaryOptions = {
      folder: 'fisherfolk-recordkeeping-system',
      use_filename: true,
    };
    const input: NexusGenInputs['UploadImageInput'] = {
      name: word.noun(),
      size: datatype.float(10),
      type: 'image/svg',
      uri: image.dataUri(),
      isProfileImage: true,
    };
    const expectedOutput = {
      name: input.name,
      size: input.size,
      type: input.type,
      url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
      isProfileImage: input.isProfileImage,
    };

    const result = await createImage(input);

    expect(cloudinary.v2.uploader.upload).toHaveReturned();

    expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
      input.uri,
      cloudinaryOptions
    );

    expect(result).toMatchObject(expectedOutput);
  });
});

describe('Create an array prisma image object', () => {
  it('Should create an array of prisma image objects', async () => {
    const { word, datatype, image } = faker;
    const cloudinaryOptions = {
      folder: 'fisherfolk-recordkeeping-system',
      use_filename: true,
    };
    const inputs: NexusGenInputs['UploadImageInput'][] = [
      {
        name: word.noun(),
        size: datatype.float(10),
        type: 'image/svg',
        uri: image.dataUri(),
        isProfileImage: false,
      },
      {
        name: word.noun(),
        size: datatype.float(10),
        type: 'image/svg',
        uri: image.dataUri(),
        isProfileImage: false,
      },
      {
        name: word.noun(),
        size: datatype.float(10),
        type: 'image/svg',
        uri: image.dataUri(),
        isProfileImage: false,
      },
      {
        name: word.noun(),
        size: datatype.float(10),
        type: 'image/svg',
        uri: image.dataUri(),
        isProfileImage: false,
      },
      {
        name: word.noun(),
        size: datatype.float(10),
        type: 'image/svg',
        uri: image.dataUri(),
        isProfileImage: false,
      },
    ];
    const expectedOutputs = [
      {
        name: inputs[0].name,
        size: inputs[0].size,
        type: inputs[0].type,
        url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
        isProfileImage: inputs[0].isProfileImage,
      },
      {
        name: inputs[1].name,
        size: inputs[1].size,
        type: inputs[1].type,
        url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
        isProfileImage: inputs[1].isProfileImage,
      },
      {
        name: inputs[2].name,
        size: inputs[2].size,
        type: inputs[2].type,
        url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
        isProfileImage: inputs[2].isProfileImage,
      },
      {
        name: inputs[3].name,
        size: inputs[3].size,
        type: inputs[3].type,
        url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
        isProfileImage: inputs[3].isProfileImage,
      },
      {
        name: inputs[4].name,
        size: inputs[4].size,
        type: inputs[4].type,
        url: expect.stringMatching(/^https?:\/\/res.cloudinary.com\//),
        isProfileImage: inputs[4].isProfileImage,
      },
    ];

    const result = await createImages(inputs);

    expect(cloudinary.v2.uploader.upload).toHaveReturned();

    expect(cloudinary.v2.uploader.upload).toHaveBeenNthCalledWith(
      1,
      inputs[0].uri,
      cloudinaryOptions
    );
    expect(cloudinary.v2.uploader.upload).toHaveBeenNthCalledWith(
      2,
      inputs[1].uri,
      cloudinaryOptions
    );
    expect(cloudinary.v2.uploader.upload).toHaveBeenNthCalledWith(
      3,
      inputs[2].uri,
      cloudinaryOptions
    );
    expect(cloudinary.v2.uploader.upload).toHaveBeenNthCalledWith(
      4,
      inputs[3].uri,
      cloudinaryOptions
    );
    expect(cloudinary.v2.uploader.upload).toHaveBeenNthCalledWith(
      5,
      inputs[4].uri,
      cloudinaryOptions
    );

    expect(result).toMatchObject(expectedOutputs);
  });
});
