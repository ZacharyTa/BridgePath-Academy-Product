"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  setCertificationStatus,
  getSkillPathId,
  setCertificationId,
} from "@/helper/useCookies";
import { v4 as uuidv4 } from "uuid";

const RedeemCertCard: React.FC = () => {
  const router = useRouter();

  const handleRedeemCertification = () => {
    const skillPathId = getSkillPathId();
    if (skillPathId) {
      setCertificationStatus(skillPathId, true);
      const certId = uuidv4();
      setCertificationId(skillPathId, certId);
      // Redirect to certification page or show a success message
      router.push("/obtain-cert");
    }
  };

  return (
    <Card className="mb-8 border border-green-400 bg-green-100 p-4 text-green-700 shadow-yellow-200">
      <CardHeader>
        <CardTitle>Congratulations!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between text-center">
          <p>You have completed the skill path.</p>
          <Button
            onClick={handleRedeemCertification}
            className="hover:bg-primary-dark dark:hover:bg-primary-dark mt-2 h-10 bg-primary px-6 text-white transition-all duration-300 hover:shadow-md"
          >
            Redeem Certification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedeemCertCard;
