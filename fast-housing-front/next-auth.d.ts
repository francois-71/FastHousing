import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  id: string;
  firstName: string;
  lastName: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
