import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableClientRisk from "@/components/Tables/TableClientRisk";
import TableTwo from "@/components/Tables/TableTwo";
import { AppProvider } from "@/context/AppContext";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <AppProvider>
      <DefaultLayout>
        <Breadcrumb pageName="Tables" />

        <div className="flex flex-col gap-10">
          <TableOne />
          <TableTwo />
          <TableClientRisk />
        </div>
      </DefaultLayout>
    </AppProvider>
  );
};

export default TablesPage;
