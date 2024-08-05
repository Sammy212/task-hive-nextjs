import { auth, authMiddleware } from "@clerk/nextjs";

// export default clerkMiddleware();

export default authMiddleware({
  publicRoutes: ["/api/clerk"]
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ],
};