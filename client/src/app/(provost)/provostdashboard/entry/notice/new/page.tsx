"use client";
import React, { useState } from "react";
import { url } from "@/components/Url/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import Cookies from "js-cookie";
import { useAppContext } from "@/components/Context/admincontext";

export default function Page() {
  const hallId = Cookies.get("hallId");
  const [user, setUser] = useState({
    title: "",
    description: "",
    id: hallId,
    role: "provost",
  });

  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${url}/api/notice`, {
        method: "POST",
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
  return (
    <Card className="border-[1px] border-gray-300">
      <CardHeader className="space-y-4">
        <CardTitle>Notice Board</CardTitle>
        <CardDescription>Create Notice</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-6">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="name"
                    className="w-1/2"
                    name="title"
                    onChange={handleChange}
                    placeholder="Enter Title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Description
                  </Label>
                  <Textarea
                    onChange={handleChange}
                    name="description"
                    placeholder="Type your message here."
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
