import { GetMediaFiles } from "@/lib/type";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { FolderSearch } from "lucide-react";
import MediaUploadButton from "./MediaUploadButton ";
import MediaCard from "./MediaCard";

type Props = {
  data?: GetMediaFiles;
  subaccountId: string;
};

const index = ({ data, subaccountId }: Props) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Media Bucket</h1>
        <MediaUploadButton subaccountId={subaccountId} />
      </div>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search for file name" />
        <CommandList className="pb-40 max-h-full">
          <CommandEmpty className="text-foreground text-center mt-5">
            No Media File
          </CommandEmpty>
          <div className="flex flex-wrap gap-4 pt-4">
            {data?.Media.map((file) => (
              <CommandItem
                key={file.id}
                className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
              >
                <MediaCard file={file} />
              </CommandItem>
            ))}
          </div>
        </CommandList>
      </Command>
    </div>
  );
};

export default index;
