"use client";

import { UploadButton } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUploader({
  endpoint,
  defaultUrl,
  onChange,
}: {
  endpoint: keyof OurFileRouter;
  defaultUrl?: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {defaultUrl && (
        <img
          src={defaultUrl}
          alt="Uploaded preview"
          className="h-24 w-24 rounded object-cover"
        />
      )}
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            onChange(res[0].url);
          }
        }}
        onUploadError={(error) => {
          console.error(error);
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
