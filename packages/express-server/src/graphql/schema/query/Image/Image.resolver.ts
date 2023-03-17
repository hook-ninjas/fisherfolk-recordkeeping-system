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