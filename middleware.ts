import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Skip Clerk auth checks for webhooks
  ignoredRoutes: [
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
