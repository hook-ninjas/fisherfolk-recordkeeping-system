import { intArg, list, nonNull, queryField } from 'nexus';
import {
  queryFisherfolkPhoto,
  queryGovermentAidPhotos,
} from './Image.resolver';

const QueryFisherfolkProfilePhoto = queryField('fisherfolkPhoto', {
  type: list('Image'),
  args: {
    fisherfolkId: nonNull('BigInt'),
  },
  resolve: (_, args, ctx) => queryFisherfolkPhoto(args.fisherfolkId, ctx),
});

const QueryGovermentAidPhotos = queryField('governmentAidPhotos', {
  type: list('Image'),
  args: {
    govtAidId: intArg(),
  },
  resolve: (_, args, ctx) => queryGovermentAidPhotos(args.govtAidId, ctx),
});

export default [QueryFisherfolkProfilePhoto, QueryGovermentAidPhotos];
