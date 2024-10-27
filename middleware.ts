// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import appConfig from "@/config";

export async function middleware(request: NextRequest) {
  // Create the Supabase client using the middleware helper
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Retrieve the authenticated user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // -- Development only: Do not use in production! --
  // Prevent redirects in development to allow for easier debugging
  // if (process.env.NODE_ENV === "development") {
  //   return response;
  // }

  // Prevent infinite redirects if the user is already on the login or profile page

  // Urls
  const loginUrl = new URL(appConfig.auth.loginUrl, request.url);

  // Urls cancel redirect logic
  const isAtLoginPage = request.nextUrl.pathname === loginUrl.pathname;

  console.log("No session found, redirecting to login page", session);

  // Redirect unauthenticated users to the login page
  // if (!session) {
  //   console.log("No session found, redirecting to login page", session);
  //   return isAtLoginPage
  //     ? response
  //     : NextResponse.redirect(loginUrl);
  // }

  // Fetch the user's profile to check access
  // const { data: profile, error } = await supabase.rpc("get_user_gym_info", {
  //   user_id: session?.user.id,
  // });

  // if (error || !profile) {
  //   console.error("Error fetching user profile:", error?.message);
  //   console.error("profie", profile);
  // }


  // Redirect based on error message
  // if (error?.message) {
  //   if (error.message.includes("JWT expired")) {
  //     clearUserIdCookie(response);
  //     return isAtLoginPage ? response : NextResponse.redirect(loginUrl);
  //   } else if (
  //     error.message.includes("column profiles.gym_owner does not exist")
  //   ) {
  //     console.error("User is not a gym owner");
  //     return isAtLoginPage ? response : NextResponse.redirect(loginUrl);
  //   } else if (
  //     error.message.includes("column profiles.gym_id does not exist")
  //   ) {
  //     console.error("User does not have a gym");
  //     return isAtGymSetUpPage ? response : NextResponse.redirect(gymSetUpUrl);
  //   } else {
  //     console.error("Error fetching user profile:", error.message);
  //     return isAtLoginPage || isResettingPassword
  //       ? response
  //       : NextResponse.redirect(loginUrl);
  //   }
  // }

  // Redirect users based on their profile permissions (Perform these checks last because profile is null if there is an error)
  // if (!profile[0]?.has_access) {
  //   console.error("User does not have access to the app: ", profile);
  //   clearUserIdCookie(response);
  //   return isAtLoginPage ? response : NextResponse.redirect(loginUrl);
  // } else if (!profile[0]?.gym_owner) {
  //   console.error("User is not a gym owner: ", profile);
  //   return isAtLoginPage ? response : NextResponse.redirect(loginUrl);
  // } else if (!profile[0]?.gym_id) {
  //   console.error("User does not have a gym: ", profile);
  //   return isAtGymSetUpPage ? response : NextResponse.redirect(gymSetUpUrl);
  // }

  // If all checks pass, continue the request
  return response;
}

// Configure the middleware to apply globally to all routes except static assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
