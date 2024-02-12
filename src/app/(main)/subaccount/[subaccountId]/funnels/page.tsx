import { getFunnels } from "@/lib/queries";
import React, { Fragment } from "react";
import FunnelsDataTable from "./DataTable";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import FunnelForm from "@/components/forms/FunnelForm";
import BlurPage from "@/components/global/BlurPage";

const Funnels = async ({ params }: { params: { subaccountId: string } }) => {
  const funnels = await getFunnels(params.subaccountId);
  if (!funnels) return null;

  return (
    <BlurPage>
      <FunnelsDataTable
        actionButtonText={
          <Fragment>
            <Plus size={15} /> Create Funnel
          </Fragment>
        }
        modalChildren={
          <FunnelForm subAccountId={params.subaccountId}></FunnelForm>
        }
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  );
};

export default Funnels;
