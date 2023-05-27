import { Context } from '../../../context';

export const queryFisherfolkPhoto = (id: number, ctx: Context) => {
  return ctx.prisma.image.findMany({
    where: {
      fisherfolkId: id,
      vesselId: null,
      gearId: null,
    },
  });
};

export const queryGovermentAidPhotos = (id: number, ctx: Context) => {
  return ctx.prisma.image.findMany({
    where: {
      governmentAidId: id,
      fisherfolkId: null,
      vesselId: null,
      gearId: null,
    },
  });
};
