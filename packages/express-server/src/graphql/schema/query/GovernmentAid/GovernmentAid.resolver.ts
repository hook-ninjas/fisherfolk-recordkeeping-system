import { Context } from '../../../context';

export const queryGovernmentAids = (ctx: Context) =>
  ctx.prisma.governmentAid.findMany({
    orderBy: [
      {
        date: 'desc',
      },
    ],
  });

export const queryGovernmentAid = (id: number, ctx: Context) =>
  ctx.prisma.governmentAid.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
