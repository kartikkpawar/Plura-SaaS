"use client";
import React from "react";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
import { Input } from "../ui/input";
import FileUpload from "../global/FileUpload";
import { Button } from "../ui/button";

type Props = { subaccountId: string };

const UploadMediaForm = ({ subaccountId }: Props) => {
  const FormSchema = z.object({
    link: z.string().min(1, { message: "Media file is required" }),
    name: z.string().min(1, { message: "Name is required" }),
  });

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const res = await createMedia(subaccountId, values);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Uploaded a media file | ${res.name}`,
        subaccountId,
      });
      toast({ title: "Succes", description: "Uploaded media" });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not uploaded media",
      });
    }
  };

  return (
    <Card>
      {" "}
      <CardHeader>
        <CardTitle>Media Information</CardTitle>
        <CardDescription>
          Please enter the details for your file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="File Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media File</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="subaccountLogo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Upload Media
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
