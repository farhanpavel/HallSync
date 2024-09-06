"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { url } from "../Url/page";
interface NoticeData {
  title: String;
  description: String;
}
export function Studentpanel() {
  const [noticeData, setnoticeData] = useState<NoticeData[]>([]);
  const id = Cookies.get("id");
  const role = "provost";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/api/notice/${id}/${role}`);

      const json = await response.json();
      if (response.ok) {
        setnoticeData(json);
      }
    };
    fetchData();
  }, []);
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
          <div className="flex items-center space-x-5 ">
            <Dialog>
              <DialogTrigger asChild>
                <IoNotificationsCircle className="text-2xl text-blue-500 hover:text-red-500 cursor-pointer transition ease-in-out duration-300 transform hover:scale-105" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] h-[90%] overflow-y-scroll bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-2xl p-6 border-t-4 border-blue-400">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                    📢 Latest Announcements
                  </DialogTitle>
                </DialogHeader>
                <div className="gap-6 py-6">
                  <div className="space-y-6">
                    {noticeData && noticeData.length > 0 ? (
                      noticeData.map((data, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                        >
                          <h1 className="text-blue-800 font-semibold text-lg">
                            {index + 1}. {data.title}
                          </h1>
                          <p className="text-sm text-gray-700 mt-2">
                            {data.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notices available at the moment.
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Link
              href={"/"}
              onClick={handleCookies}
              className="text-xs font-medium gap-x-1 text-[#4a4a4a] flex items-center hover:text-blue-600 hover:transition-all hover:delay-150"
            >
              Logout
              <IoLogOutOutline className="text-xl" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
