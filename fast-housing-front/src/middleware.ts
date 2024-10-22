import authConfig from "@/config/auth.config";

import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("redirecting to default login redirect");

      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return;
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirect to sign-in page if user is not logged in
    console.log("redirecting to sign-in page");

    return Response.redirect(new URL("/public/auth/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/test"]

  /*  
  
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
   */
};
