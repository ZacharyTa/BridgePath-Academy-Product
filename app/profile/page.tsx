import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AppProvider } from "@/context/AppContext";
import SubscriptionCard from "@/components/Cards/SubscriptionCard";
import { Certificate } from "@/components/Cards/CertificationCard";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <AppProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-242.5">
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  Danish Heilium
                </h3>
                <p className="font-medium">Ui/Ux Designer</p>
              </div>

              <div className="mt-6.5">
                <SubscriptionCard />
                <div className="rounded-md border border-stroke p-4">
                  <p>Placeholder for Current Subscription Plan</p>
                </div>
              </div>

              <div className="mt-6.5">
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
                <div className="rounded-md border border-stroke p-4">
                  <p>Placeholder for Certifications</p>
                </div>
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Started Skillpaths
                </h4>
                <div className="rounded-md border border-stroke p-4">
                  <p>Placeholder for Started Skillpaths</p>
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
