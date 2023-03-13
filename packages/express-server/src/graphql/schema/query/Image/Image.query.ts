import { list, nonNull, queryField } from 'nexus';
import { queryFisherfolkPhoto } from './Image.resolver';

const QueryFisherfolkProfilePhoto = queryField('fisherfolkPhoto', {
  type: list('Image'),
  args: {
    fisherfolkId: nonNull('BigInt'),
  },
  resolve: (_, args, ctx) => queryFisherfolkPhoto(args.fisherfolkId, ctx),
});

export default [QueryFisherfolkProfilePhoto];