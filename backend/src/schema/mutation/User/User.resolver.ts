import { Context } from '../../../context'

type CreateUser = {
  username: string
  password: string
}

export function createUser(user: CreateUser, ctx: Context) {
  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  })
}