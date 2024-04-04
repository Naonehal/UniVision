import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/programs/:id',
        '/api/webhook/clerk',
        'api/uploadthing'
    ], 
    ignoredRoutes: [
        '/api/webhook/clerk',
        'api/uploadthing',
        '/assets/images/logo.svg',
        '/favicon.ico',
        '/assets/images/hero.png'
    ]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
