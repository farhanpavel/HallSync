"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import { url } from "../Url/page";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StudentData {
  name: string;
  imageUrl: string;
  department: string;
  registration_num: string;
  enroll_year: string;
  expected_grad: string;
}

interface RoomData {
  student_id: string | null;
  hall_id: string;
  floor: string;
  room: string;
  studentData?: StudentData | null;
}

export function Slider() {
  const router = useRouter();
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [floorNumber, setFloorNumber] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [isRoomEnabled, setIsRoomEnabled] = useState<boolean>(false);
  const hallId = Cookies.get("hallId");
  const [roomName, setRoom] = useState("");
  const handleFetchRoomData = async (room: string) => {
    setRoom(room);
    try {
      const response = await fetch(`${url}/api/room/${hallId}/${room}`);
      const json = await response.json();
      if (response.ok) {
        if (room.startsWith("0")) {
          // Room number starts with "0", check if there are students
          if (json.length === 0) {
            setRoomData([]);
          } else {
            setRoomData(json);
          }
        } else {
          // Room number does not start with "0"
          if (json.length === 0) {
            alert("Wrong Room Number");
          } else {
            setRoomData(json);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching room data", error);
    }
  };

  const handleSearch = () => {
    if (roomNumber.trim()) {
      handleFetchRoomData(roomNumber);
    }
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFloorNumber(value);
    if (value.trim()) {
      setIsRoomEnabled(true);
    } else {
      setIsRoomEnabled(false);
      setRoomNumber(""); // Clear room number if floor is empty
      setRoomData([]); // Clear room data if no floor number
    }
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomNumber(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-between mb-5 gap-4">
        <div className="flex items-center gap-2">
          <Input
            id="floorInput"
            type="text"
            className="border border-gray-300 p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Floor number"
            value={floorNumber}
            onChange={handleFloorChange}
          />
          <Input
            id="roomInput"
            type="text"
            className="border border-gray-300 p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Room number"
            value={roomNumber}
            onChange={handleRoomChange}
            disabled={!isRoomEnabled}
          />
          <button
            onClick={handleSearch}
            className={`ml-2 px-4 py-2 rounded-sm text-xs text-white  shadow-md transition-transform duration-200 ${
              isRoomEnabled && roomNumber.trim()
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isRoomEnabled || !roomNumber.trim()}
          >
            GO
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={() =>
              router.push("/provostdashboard/entry/assignroom/new")
            }
            className="bg-green-500 text-xs text-white px-4 py-2 rounded-sm  shadow-md hover:bg-green-600 transition-colors duration-200"
          >
            Assign Room
          </button>
        </div>
      </div>

      {/* Carousel */}
      {roomData.length > 0 && (
        <Carousel className="w-full ">
          <CarouselContent>
            {roomData.map((data, index) => (
              <CarouselItem key={index} className="transform block p-4">
                <Card className="bg-white shadow-lg rounded-lg">
                  <CardContent className="p-6">
                    <h1 className="text-center text-2xl font-semibold mb-4">
                      Room {roomName}
                    </h1>
                    <div className="flex flex-wrap gap-6 justify-center">
                      <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full max-w-sm">
                        <Image
                          src={
                            data.studentData?.imageUrl || "/default-image.jpg"
                          }
                          width={200}
                          height={100}
                          alt="Student Image"
                          className="rounded-full mx-auto mb-4"
                        />
                        <div className="text-center text-sm">
                          <p className="font-bold text-lg">
                            Name: {data.studentData?.name || "N/A"}
                          </p>
                          <p>
                            Department: {data.studentData?.department || "N/A"}
                          </p>
                          <p>
                            Registration Num:{" "}
                            {data.studentData?.registration_num || "N/A"}
                          </p>
                          <p>
                            Enroll Year:{" "}
                            {data.studentData?.enroll_year
                              ? new Date(data.studentData.enroll_year)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </p>
                          <p>
                            Expected Grad:{" "}
                            {data.studentData?.expected_grad
                              ? new Date(data.studentData.expected_grad)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}
