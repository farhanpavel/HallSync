import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useAppContext } from "@/components/Context/admincontext";
import { DeleteDialog } from "@/components/Delete/page";
import { url } from "@/components/Url/page";
import { ColumnDef } from "@tanstack/react-table";
import Cookies from "js-cookie";
export type User = {
  student_id: string;
};

export const ActionsCell: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const { setUserData, setHallData } = useAppContext();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="  p-1 hover:bg-blue-200 outline-none rounded-full hover:transition-all hover:delay-100">
            <MoreHorizontal className="h-3 w-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs text-[#4a4a4a]">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              Cookies.set("studentid", user.student_id);
              router.push("/provostdashboard/entry/payment/status");
            }}
            className="hover:bg-blue-200 rounded-lg hover:transition-all hover:delay-100 text-xs text-[#4a4a4a]"
          >
            Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
