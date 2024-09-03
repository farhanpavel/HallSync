"use client";

import { Studentpanel } from "@/components/Studentpanel/page";

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F0F4F4] min-h-screen">
      <Studentpanel />
      {children}
    </div>
  );
}
