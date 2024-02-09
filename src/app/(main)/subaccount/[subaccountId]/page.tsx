import React from "react";

type Props = {
  params: { subaccountId: string };
};

const SubAccountIdPage = (props: Props) => {
  return <div>{props.params.subaccountId}</div>;
};

export default SubAccountIdPage;
