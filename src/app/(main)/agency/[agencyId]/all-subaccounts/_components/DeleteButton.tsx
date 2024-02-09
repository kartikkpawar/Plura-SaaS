"use client";
import {
  getSubaccountDetails,
  saveActivityLogsNotification,
  deleteSubAccount,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();

  const onClick = async () => {
    const response = await getSubaccountDetails(subaccountId);
    await saveActivityLogsNotification({
      agencyId: undefined,
      description: `Deleted a subaccount | ${response?.name}`,
      subaccountId,
    });
    await deleteSubAccount(subaccountId);
    router.refresh();
  };

  return (
    <div className="text-white" onClick={onClick}>
      Delete Sub Account
    </div>
  );
};

export default DeleteButton;
