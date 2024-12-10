"use client";
import React, { useState } from "react";
import {
  getCertificationVerified,
  getCertificationId,
} from "@/helper/useCookies";
import { getSkillPathId } from "@/helper/useCookies";

const VerifyCertification: React.FC = () => {
  const [certId, setCertId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null,
  );

  const handleVerify = () => {
    const skillPathId = getSkillPathId();
    if (skillPathId) {
      const storedCertId = getCertificationId(skillPathId);
      //const isVerified = getCertificationVerified(skillPathId);
      console.log("storedCertId", storedCertId);
      console.log("certId", certId);
      if (storedCertId === certId) {
        setVerificationStatus(storedCertId ? "Verified" : "Not Verified");
      } else {
        setVerificationStatus("Invalid Certification ID");
      }
    } else {
      setVerificationStatus("Invalid Certification ID");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Verify Certification</h1>
      <input
        type="text"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
        placeholder="Enter Certification ID"
        className="mb-4 w-full border p-2"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Verify
      </button>
      {verificationStatus && (
        <p className="mt-4 text-lg">{verificationStatus}</p>
      )}
    </div>
  );
};

export default VerifyCertification;
