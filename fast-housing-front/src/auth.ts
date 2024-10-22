import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { githubConfig } from "./config";
import authConfig from "./config/auth.config";
import { RoleEnum } from "@/types/enums";
import { getUserById } from "./actions/user";
import { AuthMethodEnum } from "./types/enums/AuthMethodEnum";

if (!githubConfig.clientId || !githubConfig.clientSecret) {
  throw new Error(
    "Please define GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET inside .env.local"
  );
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/public/auth/sign-in",
    error: "/public/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // we are sending an email verification token to the user only for credentials login so don't send it for other providers
      if (account?.provider !== AuthMethodEnum.CREDENTIALS) {
        return true;
      }

      if (!user || !user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      // prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }

      // TODO: Add 2FA check

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as RoleEnum;
      }

      if (token.firstName && session.user) {
        session.user.firstName = token.firstName as string;
      }

      if (token.lastName && session.user) {
        session.user.lastName = token.lastName as string;
      }

      return session;
    },
    //ask gpt if a jwttoken is issued at that time
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;

      return token;
    },
  },
});
