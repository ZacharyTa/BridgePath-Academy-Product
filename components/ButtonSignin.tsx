/* eslint-disable @next/next/no-img-element */
import config from "@/config";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = async ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.name || "Account"}
            className="h-6 w-6 shrink-0 rounded-full"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-base-300">
            {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)}
          </span>
        )}
        {user?.user_metadata?.name || user?.email || "Account"}
      </Link>
    );
  }

  return (
    <Link
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href={config.auth.loginUrl}
    >
      {text}
    </Link>
  );
};

export default ButtonSignin;
