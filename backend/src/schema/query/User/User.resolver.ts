import { Context } from '../../../context'

export async function queryUser(ctx: Context, id: number) {
  return ctx.prisma.user.findFirst({
    where: {
      id,
    },
  })
}