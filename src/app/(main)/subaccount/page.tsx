import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: { state: string; code: string };
};

const SubAccountPage = async ({ searchParams }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) return <Unauthorized />;

  const user = await getAuthUserDetails();
  if (!user) return;

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true
  );
  console.log(getFirstSubaccountWithAccess);

  if (searchParams.state) {
    const statePath = searchParams.state.split("___")[0];
    const stateSubAccoutId = searchParams.state.split("___")[1];
    if (!stateSubAccoutId) return <Unauthorized />;
    return redirect(
      `/subaccount/${stateSubAccoutId}/${statePath}?code=${searchParams.code}`
    );
  }
  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`);
  }
  return <Unauthorized />;
};

export default SubAccountPage;
