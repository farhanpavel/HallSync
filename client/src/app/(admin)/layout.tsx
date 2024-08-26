"use client";

import { Adminpanel } from "@/components/Adminpanel/page";

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F0F4F4] min-h-screen">
      <Adminpanel />
      {children}
    </div>
  );
}
