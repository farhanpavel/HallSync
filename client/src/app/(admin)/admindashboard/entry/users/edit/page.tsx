"use client";
import React, { useState, useEffect } from "react";
import { url } from "@/components/Url/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/components/Context/admincontext";

export default function Page() {
  const { userData } = useAppContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { name, email, password, role } = user;
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRoleChange = (role: string) => {
    setUser({ ...user, role });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/user/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${url}/api/user/${userData.id}`);
        if (response.ok) {
          const json = await response.json();
          setUser((prevUser) => ({
            ...prevUser,
            name: json.name,
            email: json.email,
            role: json.role,
          }));
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, []);
  return (
    <Card className="border-[1px] border-gray-300">
      <CardHeader className="space-y-4">
        <CardTitle>User Details</CardTitle>
        <CardDescription>
          Please select the role of the user and fill in the required
          information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col w-1/4 space-y-3">
              <Label className="text-xs" htmlFor="framework">
                Select role
              </Label>
              <Select
                required
                onValueChange={handleRoleChange}
                disabled
                value={role}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="provost">Hall Provost</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="font-semibold text-sm">
                  Enter User Informations
                </h1>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="name"
                    className="w-1/2"
                    name="name"
                    onChange={handleChange}
                    value={name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-1/2"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <CardFooter className="flex justify-end mt-7">
            {isLoading ? (
              <Button
                type="submit"
                className=" bg-blue-500 text-xs hover:bg-blue-400 hover:transition-all hover:delay-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                disabled
                className=" bg-blue-500 hover:bg-blue-400 hover:transition-all hover:delay-100"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
