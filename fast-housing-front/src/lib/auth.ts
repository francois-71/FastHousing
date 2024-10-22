import { auth } from "@/auth";
import { RoleEnum } from "@/types/enums";
import { ExtendedUser } from "../../next-auth";

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await auth();

  if (!session) {
    return false;
  }

  return true;
};

export const currentRole = async (): Promise<RoleEnum | undefined> => {
  const session = await auth();

  if (!session) {
    return undefined;
  }

  const role: RoleEnum = session.user.role;

  return role;
};

export const currentUser = async (): Promise<ExtendedUser | undefined> => {
  const session = await auth();

  if (!session) {
    return undefined;
  }

  const user: ExtendedUser = session.user;

  return user;
};

export const currentUserId = async (): Promise<string | undefined> => {
  const session = await auth();

  if (!session) {
    return undefined;
  }

  const id: string = session.user.id

  return id;
};
