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
    hall_name: "",
    capacity: "",
    room: "",
    bed: "",
  });
  const { hall_name, capacity, room, bed } = user;
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/hall/${userData.id}`, {
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
    const fetchHall = async () => {
      try {
        const response = await fetch(`${url}/api/hall/${userData.id}`);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setUser((prevUser) => ({
            ...prevUser,
            hall_name: json.hall_name,
            capacity: json.capacity,
            room: json.room,
            bed: json.bed,
          }));
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchHall();
  }, []);
  return (
    <Card className="border-[1px] border-gray-300">
      <CardHeader className="space-y-4">
        <CardTitle>Hall Details</CardTitle>
        <CardDescription>Enter Hall Informations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-6">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Hall Name
                  </Label>
                  <Input
                    id="hall_name"
                    type="name"
                    className="w-1/2"
                    name="hall_name"
                    onChange={handleChange}
                    value={hall_name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Hall Capacity
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    className="w-1/2"
                    name="capacity"
                    onChange={handleChange}
                    value={capacity}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Number of Rooms
                  </Label>
                  <Input
                    id="room"
                    type="number"
                    className="w-1/2"
                    name="room"
                    onChange={handleChange}
                    value={room}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs" htmlFor="name">
                    Number of Beds Per Room
                  </Label>
                  <Input
                    id="bed"
                    type="number"
                    className="w-1/2"
                    name="bed"
                    onChange={handleChange}
                    value={bed}
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
