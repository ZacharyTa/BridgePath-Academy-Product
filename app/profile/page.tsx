"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AppProvider } from "@/context/AppContext";
import SubscriptionCard from "@/components/Cards/SubscriptionCard";
import { Certificate } from "@/components/Cards/CertificationCard";
import {
  getCertificationId,
  getCertificationStatus,
} from "@/helper/useCookies";
import Cookies from "js-cookie";

const Profile = () => {
  const skillPathId = 3;
  const hasCertificate = getCertificationId(skillPathId);
  // const test = Cookies.get("certificationStatus_3").toString();
  return (
    <AppProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-242.5">
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  Zachary Ta
                </h3>
              </div>
              <div className="divider mt-6.5"></div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Active Subscription
                </h4>
              </div>

              <div className="mt-6.5">
                <SubscriptionCard />
              </div>

              <div className="divider mt-6.5"></div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Certifications
                </h4>
              </div>

              <div className="mt-6.5">
                {hasCertificate && (
                  <Certificate
                    certificationName="Advanced Digital Marketing"
                    dateAcquired="June 15, 2024"
                    issuer="BridgePath Academy"
                    recipientName="Zachary Ta"
                    skills={["Zapier", "Automation"]}
                    hasProject={true}
                  />
                )}
                {!hasCertificate && <p>You have no certifications</p>}
              </div>
              <div className="divider mt-6.5"></div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Projects
                </h4>
              </div>

              <div className="mt-6.5">
                <div className="rounded-sm border border-error border-stroke bg-error/25 p-4 text-error-content shadow-default dark:border-strokedark dark:bg-boxdark">
                  <p className="text-lg font-medium text-black dark:text-white">
                    Showcased projects coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </AppProvider>
  );
};

export default Profile;
