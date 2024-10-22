import { useSession } from "next-auth/react";

export function useCurrentSession() {
  const session = useSession();

  if (!session) {
    return null;
  }

  return session;
}
