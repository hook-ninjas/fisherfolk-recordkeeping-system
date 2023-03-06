import { Context } from '../../../context';
import { FisherfolkStatus, Gender } from '@prisma/client';



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

export const queryUniqueBarangayCount = async (ctx: Context) => {
  const results = await ctx.prisma.fisherfolk.findMany({
    select: {
      barangay: true
    },

    distinct: ['barangay']
  });

  // returns the number of unique barangay
  return results.length;
};  

export const querytActiveFisherFolk = (ctx:Context)=>{
  return ctx.prisma.fisherfolk.count({
    where:{
      status: FisherfolkStatus.Active
    }
  });
};

export const queryFisherFolkByGender = (gender:Gender,ctx:Context)=>{
  return ctx.prisma.fisherfolk.count({
    where:{
      gender:gender
    }
  });
};

