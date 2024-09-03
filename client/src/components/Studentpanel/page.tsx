"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
export function Studentpanel() {
  const handleCookies = () => {
    Cookies.remove("id");
    Cookies.remove("hallId");
  };
  const pathname = usePathname();
  return (
    <div className="flex  w-full flex-col b">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-gray-300  px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-sm lg:gap-10">
          <Link href={"/admindashboard/overview"}>
            <Image
              src={"/images/logo2.png"}
              width={200}
              height={100}
              alt="logo"
            />
          </Link>
          <Link
            href="/studentdashboard/overview"
            className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
              pathname === "/studentdashboard/overview"
                ? "border-b-2 border-blue-600 "
                : ""
            }`}
          >
            Overview
          </Link>
          <Link
            href="/studentdashboard/status"
            className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
              pathname.startsWith("/studentdashboard/status")
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            Status
          </Link>
          <Link
            href="/studentdashboard/payment"
            className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
              pathname.startsWith("/studentdashboard/payment")
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            Payment
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden border-gray-300 rounded-[5px]"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#F0F4F4]">
            <nav className="flex flex-col items-center gap-6 text-lg font-medium ">
              <Link href={"/studentdashboard/overview"}>
                <Image
                  src={"/images/logo2.png"}
                  width={220}
                  height={100}
                  alt="logo"
                />
              </Link>

              <Link
                href="/studentdashboard/overview"
                className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
                  pathname === "/studentdashboard/overview"
                    ? "border-b-2 border-blue-600 "
                    : ""
                }`}
              >
                Overview
              </Link>
              <Link
                href="/studentdashboard/status"
                className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
                  pathname === "/studentdashboard/status"
                    ? "border-b-2 border-blue-600 "
                    : ""
                }`}
              >
                Status
              </Link>
              <Link
                href="/studentdashboard/payment"
                className={`text-[#4a4a4a] transition-colors hover:text-blue-600 hover:transition-all hover:delay-200 ${
                  pathname === "/studentdashboard/payment"
                    ? "border-b-2 border-blue-600 "
                    : ""
                }`}
              >
                Paymnet
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative"></div>
          </form>
          <div>
            <Link
              href={"/"}
              onClick={handleCookies}
              className="text-xs font-medium gap-x-1 text-[#4a4a4a] flex items-center hover:text-blue-600 hover:transition-all hover:delay-150"
            >
              Logout
              <IoLogOutOutline className="text-2xl" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
