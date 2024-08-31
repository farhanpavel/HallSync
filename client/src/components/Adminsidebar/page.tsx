import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Adminsidebar() {
  const pathname = usePathname();

  return (
    <div>
      <main>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
          <nav className="grid gap-4  text-muted-foreground text-xs">
            <Link
              href="/admindashboard/entry/users"
              className={`text-primary  p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname === "/admindashboard/entry/users" ||
                pathname === "/admindashboard/entry/users/new"
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Users
            </Link>
            <Link
              href="/admindashboard/entry/hall"
              className={`text-primary  p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname === "/admindashboard/entry/hall"
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Hall
            </Link>
            <Link
              href="/admindashboard/entry/notice"
              className={`text-primary  p-2 rounded-[5px] hover:transition-all hover:delay-200 ${
                pathname === "/admindashboard/entry/notice"
                  ? "bg-blue-200 text-[#4a4a4a] font-medium"
                  : "hover:bg-gray-200"
              }`}
            >
              Notice
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
