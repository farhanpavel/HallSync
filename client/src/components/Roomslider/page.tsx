"use client";
import React, { useState, useEffect } from "react";
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
  const [message, setMessage] = useState<string>("No room found.");

  const handleFetchRoomData = async (floor: string, room: string) => {
    setRoom(room);
    try {
      const response = await fetch(
        `${url}/api/room/${hallId}/${room}/${floor}`
      );
      const json = await response.json();
      if (response.ok) {
        if (room.startsWith("0")) {
          if (json.length === 0) {
            setRoomData([]);
            setMessage("No room found.");
          } else {
            setRoomData(json);
            setMessage("");
          }
        } else {
          if (json.length === 0) {
            alert("Wrong Room Number");
            setMessage("No room found.");
          } else {
            setRoomData(json);
            setMessage("");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching room data", error);
      setMessage("Error fetching room data.");
    }
  };

  const handleSearch = () => {
    if (roomNumber.trim()) {
      handleFetchRoomData(floorNumber, roomNumber);
    }
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFloorNumber(value);
    if (value.trim()) {
      setIsRoomEnabled(true);
    } else {
      setIsRoomEnabled(false);
      setRoomNumber("");
      setRoomData([]);
      setMessage("No room found.");
    }
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomNumber(e.target.value);
  };

  useEffect(() => {
    // Initialize message when component mounts
    setMessage("No room found.");
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg bg-gray-100 shadow-md">
      {/* Search Input */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Rooms</h2>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Input
              id="floorInput"
              type="text"
              className="border border-gray-300 p-3 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Floor Number"
              value={floorNumber}
              onChange={handleFloorChange}
            />
            <Input
              id="roomInput"
              type="text"
              className="border border-gray-300 p-3 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Room Number"
              value={roomNumber}
              onChange={handleRoomChange}
              disabled={!isRoomEnabled}
            />
            <button
              onClick={handleSearch}
              className={`px-5 py-2 text-xs  text-white shadow-md transition-transform duration-200 ${
                isRoomEnabled && roomNumber.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isRoomEnabled || !roomNumber.trim()}
            >
              Search
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={() =>
                router.push("/provostdashboard/entry/assignroom/new")
              }
              className="bg-green-500 text-white px-5 py-2 text-xs  shadow-md hover:bg-green-600 transition-colors duration-200"
            >
              Assign Room
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      {roomData.length > 0 ? (
        <Carousel className="w-full">
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
      ) : (
        <div className="text-center p-6">
          <p className="text-lg font-semibold text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
}
