/**
 * An array of routes that are accessible to the public
 * These routes aren't protected which means they don't require authentication
 * @type {string[]}
 */

export const publicRoutes = ["", "/", "/api/public/*", "public/*", "/public/auth", "/public/auth/forgot-password"];

/**
 * An array of routes that related to authentication
 * @type {*}
 */

export const authRoutes = [
  "/public/auth/sign-in",
  "/public/auth/register",
  "/public/auth/error",
];

/**
 * This is the prefix for all the routes that are related to authentication
 * Routes that start with this prefix are related to authentication
 * @type {*}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect route after login
 * This is where the user will be redirected to after they login
 * @type {*}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

export const DEFAULT_HOME_REDIRECT = "/";
