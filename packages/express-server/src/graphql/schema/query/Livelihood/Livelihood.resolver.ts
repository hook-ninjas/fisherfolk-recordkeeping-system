import { SourceOfIncome } from '@prisma/client';
import { Context } from '../../../context';

export const queryTotalByType = (type: SourceOfIncome, ctx: Context) => {
  return ctx.prisma.livelihood.count({
    where: {
      type: type,
      fisherfolk: {
        isArchive: false,
      },
    },
  });
};
