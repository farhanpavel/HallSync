"use client";
import { Provostpanel } from "@/components/Provostpanel/page";

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F0F4F4] min-h-screen">
      <Provostpanel />
      {children}
    </div>
  );
}
