"use client";
import config from "@/config";
import { createClient } from "@/libs/supabase/client";
import { Provider } from "@supabase/supabase-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function Login() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    router.push("/recover-password"); // Redirect to /reset-password
  };

  // Function to handle email/password sign-in
  const handleEmailPasswordSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if the user has paid by looking at custom claims or user metadata
      if (!data.user) {
        console.log("data", data);
        throw new Error("No user found.");
      }

      // Checks if the user has access to the admin dashboard
      const userMetadata = await supabase
        .from("profiles")
        .select("has_access")
        .eq("id", data.user.id);

      if (!userMetadata?.data[0]?.has_access) {
        throw new Error("Signups restricted to paid users");
      }

      // Successful login
      toast.success("Successfully logged in!");
      // Redirect to dashboard or the appropriate page after login
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("errorssss", error);
      if (error.message === "Signups restricted to paid users") {
        toast.error("Signups restricted to paid users");
      } else {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (options: {
    type: string;
    provider?: Provider;
  }) => {
    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/auth/confirm";

      // if (type === "oauth") {
      //   const { error } = await supabase.auth.signInWithOAuth({
      //     provider,
      //     options: {
      //       redirectTo: redirectURL,
      //     },
      //   });

      //   if (error) throw error;
      // }
      if (type === "magic_link") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false, // prevent a new user being created if there is no user for that email
            emailRedirectTo: redirectURL,
          },
        });

        if (error) throw error;

        toast.success("Check your emails!");

        setIsDisabled(true);
      }
    } catch (error) {
      if (error.message === "Signups not allowed for otp") {
        console.log("error", error);
        toast.error("Signups restricted to paid users"); // Later make this redirect to a preview.lifts-up.com/dashboard.com page
      } else {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 p-8 text-black dark:text-white md:p-24">
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

      <h1 className="text-gray-900 mb-12 text-center text-3xl font-extrabold tracking-tight dark:text-white md:text-4xl">
        Sign-in to {config.appName}{" "}
      </h1>

      <div className="mx-auto max-w-xl space-y-8">
        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In Form
              </h3>
            </div>
            <form onSubmit={handleEmailPasswordSignin}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 mt-5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Remember me</p>
                  </label>

                  <Link
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:underline"
                  >
                    Forget password?
                  </Link>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )}
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-gray-900 divider text-xs font-medium text-base-content/50 dark:text-white">
          OR
        </div>

        <form
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
        </form>
      </div>
    </main>
  );
}
