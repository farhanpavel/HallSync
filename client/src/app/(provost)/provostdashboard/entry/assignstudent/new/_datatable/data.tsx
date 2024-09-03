import React from "react";
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
  const { setStudentData } = useAppContext();

  const handleAssign = async (studentId: string) => {
    try {
      const response = await fetch(`${url}/api/form/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: 2,
          hall_id: hallId,
        }),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        alert("Successful");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleDelete = async (studentId: string) => {
    try {
      const response = await fetch(`${url}/api/form/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: 0,
          hall_id: "",
        }),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        alert("Successful");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      {user.active === 2 ? (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold">Selected</span>
          <button
            onClick={() => handleDelete(user.student_id)}
            className="text-red-600 hover:bg-red-100 rounded px-2 py-1"
          >
            Delete
          </button>
        </div>
      ) : (
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
              onClick={() => handleAssign(user.student_id)}
              className="hover:bg-blue-200 rounded-lg hover:transition-all hover:delay-100 text-xs text-[#4a4a4a]"
            >
              Assign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
