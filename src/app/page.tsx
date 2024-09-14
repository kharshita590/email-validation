"use client"
import FileUpload from "@/components/file-upload";

export const runtime = "edge"
export default function Home() {
  return (
    <main>
      <FileUpload/>
    </main>
     
   
  );
}
