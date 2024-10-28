import { User, Prisma } from "@prisma/client";

type UserWithAccountDetails = Prisma.UserGetPayload<{
  include: { accounts: true };
}>;

type UserWithProfilePicture = Prisma.UserGetPayload<{
  include: { image: true };
}>;

export type { User, UserWithAccountDetails, ProfileUser };
