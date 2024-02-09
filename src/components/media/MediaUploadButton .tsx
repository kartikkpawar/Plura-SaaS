"use client";
import React from "react";
import { Button } from "../ui/button";
import { useModal } from "@/providers/ModalProvider";
import CustomModal from "../global/CustomModal";
import UploadMediaForm from "../forms/UploadMediaForm";

type Props = { subaccountId: string };

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { setOpen, isOpen, setClose } = useModal();

  const onClick = () => {
    setOpen(
      <CustomModal
        title="Upload Media"
        subHeading="Upload a file to your media bucket"
      >
        <UploadMediaForm subaccountId={subaccountId} />
      </CustomModal>
    );
  };

  return <Button onClick={onClick}>Upload</Button>;
};

export default MediaUploadButton;
