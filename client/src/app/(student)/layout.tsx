"use client";

import { Studentpanel } from "@/components/Studentpanel/page";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = Cookies.get("role");

    if (role !== "student") {
      router.back();
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="bg-[#F0F4F4] min-h-screen">
      <Studentpanel />
      {children}
    </div>
  );
}
