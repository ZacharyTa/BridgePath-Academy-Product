"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RecoverPassword() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState<string>(emailParam);
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmail(emailParam);
  }, [emailParam]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== retypePassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (data) {
        toast.success("Password updated successfully! You can now log in.");
        router.push("/signin");
      } else if (error) {
        throw error;
      }
    } catch (error) {
      toast.error("There was an error updating your password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 p-8 text-black dark:text-white md:p-24">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Enter new Password
        </h1>
        <form onSubmit={handlePasswordReset}>
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

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Retype Password
              </label>
              <input
                type="password"
                placeholder="Retype password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
