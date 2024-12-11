import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AppProvider } from "@/context/AppContext";
import SubscriptionCard from "@/components/Cards/SubscriptionCard";
import { Certificate } from "@/components/Cards/CertificationCard";
import { getCertificationStatus } from "@/helper/useCookies";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  const skillPathId = 3;
  const hasCertificate = getCertificationStatus(skillPathId);
  console.log("BAHHHHH", hasCertificate);
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
              <p>{hasCertificate}</p>
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
                )}
                {!hasCertificate && <p>You have no certifications</p>}
              </div>
              <div className="divider mt-6.5"></div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Started Skillpaths
                </h4>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </AppProvider>
  );
};

export default Profile;
