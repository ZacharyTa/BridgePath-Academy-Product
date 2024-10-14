"use client";
import React, { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";

export default function RecoverPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      toast.success("Reset Password link sent to your email.");
    } catch (error) {
      toast.error("There was an error sending the reset password link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 p-8 text-black dark:text-white md:p-24">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Recover Your Password
        </h1>
        <form onSubmit={handlePasswordReset} className="space-y-6">
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
          <button
            type="submit"
            className="w-full rounded bg-primary p-3 text-white hover:bg-opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
