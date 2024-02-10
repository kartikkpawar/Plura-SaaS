import SubAccountDetails from "@/components/forms/SubAccountDetails";
import UserDetails from "@/components/forms/UserDetails";
import BlurPage from "@/components/global/BlurPage";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const SubAccountSettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!userDetails) return;

  const subAccount = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });
  if (!subAccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: subAccount.agencyId,
    },
    include: { SubAccount: true },
  });
  if (!agencyDetails) return;
  const subAccounts = agencyDetails.SubAccount;

  return (
    <BlurPage>
      <div className="flex lg:flex-row flex-col gap-4">
        <SubAccountDetails
          agencyDetails={agencyDetails}
          userId={authUser.id}
          userName={userDetails.name}
          details={subAccount}
        />
        <UserDetails
          type="subaccount"
          id={params.subaccountId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </BlurPage>
  );
};

export default SubAccountSettingsPage;
