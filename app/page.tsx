"use client";
import { Suspense, useEffect } from "react";
import Loader from "@/components/common/Loader";

export default function Home() {
  useEffect(() => {
    window.location.href = "/dashboard";
  }, []);

  return (
    <div className="grid h-auto grid-cols-1 lg:grid-cols-4">
      <div className="col-span-3 mb-20 mt-0 p-4 lg:col-span-3">
        <Suspense>
          <Loader />
        </Suspense>
      </div>
    </div>
  );
}
