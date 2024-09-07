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
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useAppContext } from "@/components/Context/admincontext";
import { DeleteDialog } from "@/components/Delete/page";
import { url } from "@/components/Url/page";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  notice_id: string;
  role: string;
  title: string;
  description: string;
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "registration_num",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Reg Num
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),

    enableSorting: true,
  },

  {
    accessorKey: "department",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Department
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),

    enableSorting: true,
  },
  {
    accessorKey: "enroll_year",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Enroll Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string | number | Date; // Casting getValue to a known type
      const date = new Date(value);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      return formattedDate;
    },
    enableSorting: true,
  },
  {
    accessorKey: "expected_grad",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Grad Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string | number | Date; // Casting getValue to a known type
      const date = new Date(value);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      return formattedDate;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <button
        className="hover:bg-blue-200 hover:text-black flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100 "
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Day&apos;s Left
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const expectedGradDate = new Date(row.getValue("expected_grad"));
      const today = new Date();
      const timeDiff = expectedGradDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      const textColor = daysLeft <= 15 ? "text-red-500" : "text-black";

      return (
        <span className={`flex items-center ${textColor}`}>
          {daysLeft > 0 ? daysLeft : "Graduated"}
        </span>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("expected_grad")).getTime();
      const dateB = new Date(rowB.getValue("expected_grad")).getTime();
      return dateA - dateB;
    },
  },
];
