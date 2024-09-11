import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Provostsidebar() {
  const pathname = usePathname();

  return (
    <div>
      <main>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
          <nav className="grid gap-4  text-muted-foreground text-xs">
            <Link
              href="/provostdashboard/entry/assignstudent"
              className={`text-primary p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname.startsWith("/provostdashboard/entry/assignstudent")
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Assign Student
            </Link>

            <Link
              href="/provostdashboard/entry/assignroom"
              className={`text-primary p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname.startsWith("/provostdashboard/entry/assignroom")
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Assign Room
            </Link>

            <Link
              href="/provostdashboard/entry/notice"
              className={`text-primary p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname.startsWith("/provostdashboard/entry/notice")
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Notice
            </Link>
            <Link
              href="/provostdashboard/entry/leaving"
              className={`text-primary p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname.startsWith("/provostdashboard/entry/leaving")
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Withdrawal Status
            </Link>
            <Link
              href="/provostdashboard/entry/payment"
              className={`text-primary p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname.startsWith("/provostdashboard/entry/payment")
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Payment Status
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
