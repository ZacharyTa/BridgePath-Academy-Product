"use client";
import config from "@/config";
import { createClient } from "@/libs/supabase/client";
import { Provider } from "@supabase/supabase-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function Login() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async (options: {
    type: string;
    provider?: Provider;
  }) => {
    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/auth/confirm";

      if (type === "oauth") {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectURL,
          },
        });

        if (error) throw error;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col justify-center bg-bodydark1 p-8 text-black dark:bg-boxdark dark:text-white md:p-24">
      <div className="mb-4 text-center">
        <Link
          href="/"
          className="text-gray-900 btn btn-ghost btn-sm dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Home
        </Link>
      </div>
      <div className="mx-auto mb-12 max-w-xl">
        {searchParams.get("error") && (
          <div
            role="alert"
            className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 alert alert-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-800 dark:text-red-200 h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{searchParams.get("error")}</span>
          </div>
        )}
      </div>

      <h1 className="mb-12 text-center text-3xl font-extrabold tracking-tight dark:text-white md:text-4xl">
        Sign-in to {config.appName}{" "}
      </h1>

      <div className="mx-auto max-w-xl space-y-8">
        <button
          className="btn btn-lg transform bg-white text-black duration-100 hover:scale-105 hover:bg-whiten hover:shadow-lg hover:shadow-meta-6"
          onClick={() => handleSignup({ type: "oauth", provider: "google" })}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
          )}
          Sign-up with Google
        </button>

        {/* <div className="text-gray-900 divider text-xs font-medium text-base-content/50 dark:text-white">
          OR
        </div> */}

        {/* <form
          className="form-control w-full space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup({ type: "magic_link" });
          }}
        >
          <input
            required
            type="email"
            value={email}
            autoComplete="email"
            placeholder="tom@cruise.com"
            className="dark:bg-gray-800 input input-bordered w-full bg-white text-black placeholder:opacity-60 dark:text-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-primary btn-block bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={isLoading || isDisabled}
            type="submit"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Send Magic Link
          </button>
        </form> */}
      </div>
    </main>
  );
}
