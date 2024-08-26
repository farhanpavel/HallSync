"use client";

import { Adminpanel } from "@/components/Adminpanel/page";
import Adminsidebar from "@/components/Adminsidebar/page";

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-wrap p-20 ">
      <div className="w-[25%]">
        <Adminsidebar />
      </div>
      <div className="w-[70%] ">{children}</div>
    </div>
  );
}
