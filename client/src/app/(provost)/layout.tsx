"use client";
import { Provostpanel } from "@/components/Provostpanel/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = Cookies.get("role");

    if (role !== "provost") {
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
      <Provostpanel />
      {children}
    </div>
  );
}
