import { User, Prisma } from '@prisma/client';

type UserWithAccountDetails = Prisma.UserGetPayload<{
    include: { accounts: true};
}>;

export type { User, UserWithAccountDetails };
