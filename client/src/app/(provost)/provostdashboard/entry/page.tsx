"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/provostdashboard/entry");
  }, [router]);

  return null; // No need to render anything since we're redirecting
}
