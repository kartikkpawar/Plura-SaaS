import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import {
  getLaneDetailsWithTicketsAndTags,
  getPipelineDetails,
} from "@/lib/queries";
import { LaneDetail } from "@/lib/type";
import { redirect } from "next/navigation";
import React from "react";
import PipelineInfoBar from "../_components/PipelineInfoBar";
import PipelineSettingsView from "../_components/PipelineSettingsView";

type Props = {
  params: {
    subaccountId: string;
    pipelineId: string;
  };
};

const PiplinePage = async ({ params }: Props) => {
  const pipelineDetails = await getPipelineDetails(params.pipelineId);
  if (!pipelineDetails)
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);

  const pipelines = await db.pipeline.findMany({
    where: { subAccountId: params.subaccountId },
  });

  const lanes = (await getLaneDetailsWithTicketsAndTags(
    params.pipelineId
  )) as LaneDetail[];

  return (
    <Tabs defaultValue="veiw" className="w-full">
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
        <PipelineInfoBar
          pipelineId={params.pipelineId}
          subAccountId={params.subaccountId}
          pipelines={pipelines}
        />
        <div className="">
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">{/* <PipelineView /> */}</TabsContent>
      <TabsContent value="settings">
        <PipelineSettingsView
          pipelineId={params.pipelineId}
          subaccountId={params.subaccountId}
          pipelines={pipelines}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PiplinePage;
