import GithubProvider from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { githubConfig } from "@/config";
import { googleConfig } from "./auth-providers/OAuth/auth-google.config";

import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/schema/login";

import { comparePassword, getUserByEmail } from "@/actions/user";

export default {
  providers: [
    GithubProvider({
      clientId: githubConfig.clientId,
      clientSecret: githubConfig.clientSecret,
    }),
    GoogleProvider({
      clientId: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      profile: (_profile: GoogleProfile) => {
        return {
          id: _profile.sub,
          firstName: _profile.given_name,
          lastName: _profile.family_name,
          email: _profile.email,
        };
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) {
            return null;
          }

          const passwordMatch = await comparePassword(
            password,
            user.hashedPassword
          );

          if (passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
