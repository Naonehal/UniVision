import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/programs/:id',
        '/api/webhook/clerk',
        '/api/uploadthing',
        '/pages/api/checkAdmin',
        
        

        
    ], 
    ignoredRoutes: [
        '/api/webhook/clerk',
        // 'api/uploadthing',
        '/assets/images/logo.svg',
        '/assets/icons/edit.svg',
        '/assets/icons/calendar.svg',
        '/assets/icons/location.svg',
        '/assets/icons/search.svg',
        '/favicon.ico',
        '/assets/images/hero.png',
        '/pages/api/checkAdmin'

    ]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export const isAdmin = (email: string | undefined): boolean => {
  if (!email) return false;

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map(e => e.trim().toLowerCase())
    : [];

  return adminEmails.includes(email.trim().toLowerCase());
};