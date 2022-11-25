import { Context } from '../../../context';

export const queryTotalFisherfolk = (ctx: Context) => {
  return ctx.prisma.fisherfolk.count();
};

export const queryByRange = (start: number, count: number, ctx: Context) => {
  return ctx.prisma.fisherfolk.findMany({
    skip: start,
    take: count,
    orderBy: {
      registrationDate: 'desc'
    },
  });
};

export const queryById = (id: bigint, ctx: Context) => {
  return ctx.prisma.fisherfolk.findUniqueOrThrow({
    where: {
      id: id
    }
  });
};