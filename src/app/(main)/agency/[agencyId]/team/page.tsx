import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React, { Fragment } from "react";
import DataTable from "./DataTable";
import { PlusIcon } from "lucide-react";
import { columns } from "./Columns";
import SendInvitation from "@/components/forms/SendInvitation";

type Props = {
  params: { agencyId: string };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser();

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
  if (!authUser) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: { SubAccount: true },
  });

  if (!agencyDetails) return;

  return (
    <DataTable
      actionButtonText={
        <Fragment>
          <PlusIcon size={15} />
          Add
        </Fragment>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    />
  );
};

export default TeamPage;
