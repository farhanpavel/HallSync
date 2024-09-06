"use client";
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
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
import { DeleteDialog } from "@/components/Delete/page";
export type User = {
  student_id: string;
  name: string;
  registration_num: string;
  department: string;
  active: number;
};

export const ActionsCell: React.FC<{ user: User }> = ({ user }) => {
  const hallId = Cookies.get("hallId");
  const router = useRouter();
  const { setStudentData, studentData, userData, setUserData } =
    useAppContext();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/api/form/${user.student_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        setStudentData((prevData) =>
          prevData.filter((item) => item.student_id !== user.student_id)
        );
        setDeleteDialogOpen(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-blue-200 outline-none rounded-full hover:transition-all hover:delay-100">
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
              setDeleteDialogOpen(true);
              setUserData({ id: user.student_id });
            }}
            className="hover:bg-blue-200 rounded-lg hover:transition-all hover:delay-100 text-xs text-[#4a4a4a]"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
