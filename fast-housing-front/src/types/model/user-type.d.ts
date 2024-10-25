import { User, Prisma } from '@prisma/client';

type UserWithAccountDetails = Prisma.UserGetPayload<{
    include: { accounts: true};
}>;

type profileUser = Pick<User, 'firstName', 'lastName', 'email', 'role'>

export type { User, UserWithAccountDetails, profileUser};
