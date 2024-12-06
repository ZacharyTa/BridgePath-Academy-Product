"use client";
import React, { useEffect, useState } from "react";
import { Certificate } from "@/components/Cards/CertificationCard";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function ObtainCertPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // Stop confetti after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    // Implement share functionality here
    alert("Share butn clicked");
  };

  const handleHome = () => {
    router.push("/course-library");
  };

  return (
    <>
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-2/5">
          <Certificate
            certificationName="Advanced Digital Marketing"
            dateAcquired="June 15, 2023"
            issuer="BridgePath Academy"
            recipientName="Jane Doe"
            skills={[
              "SEO",
              "Content Marketing",
              "Social Media Strategy",
              "Analytics",
            ]}
            hasProject={true}
          />
          <div className="mt-4 flex w-full justify-between">
            <button
              onClick={handleHome}
              className="btn mr-2 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Home
            </button>
            <button
              onClick={handleShare}
              className="btn btn-wide mr-2 transform rounded bg-secondary px-4 py-2 text-black duration-100 hover:scale-105 hover:bg-whiten hover:shadow-lg hover:shadow-meta-6"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
