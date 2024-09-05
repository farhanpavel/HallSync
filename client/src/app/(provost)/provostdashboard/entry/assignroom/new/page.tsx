"use client";
import React, { useState, useEffect } from "react";
import { url } from "@/components/Url/page";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

interface Student {
  student_id: string;
  name: string;
}

interface HallData {
  hall_id: string;
  hall_name: string;
  capacity: string;
  floor: string; // Assuming this is a string indicating the maximum floor number
  room: string;
  bed: string;
}

interface RoomData {
  room_no: string;
  booked_beds: number;
  total_beds: number;
}

export default function Page() {
  const [hallData, setHallData] = useState<HallData | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [floors, setFloors] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const hallId = Cookies.get("hallId");
  const [selectedStudent, setSelectedStudent] = useState("");
  const active = 0;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/api/hall/${hallId}`);
      const json = await response.json();
      if (response.ok) {
        setHallData(json);
        const maxFloor = parseInt(json.floor, 10);
        const floorList = Array.from({ length: maxFloor }, (_, i) =>
          (i + 1).toString()
        );
        setFloors(floorList);
      }
    };

    const fetchStudent = async () => {
      const response = await fetch(
        `${url}/api/form/studentdata/${hallId}/${active}`
      );
      const json = await response.json();
      if (response.ok) {
        setStudentData(json);
      }
    };

    fetchData();
    fetchStudent();
  }, [hallId]);

  useEffect(() => {
    if (selectedFloor) {
      const floorPrefix = `${selectedFloor.padStart(2, "0")}`;
      const roomList = Array.from(
        { length: parseInt(hallData?.bed ?? "0", 10) },
        (_, i) => `${floorPrefix}${i + 1}`
      );
      setRooms(roomList);
    }
  }, [selectedFloor]);
  const handleClick = async (room: string) => {
    try {
      const response = await fetch(`${url}/api/room/data/${hallId}/${room}`);
      if (response.ok) {
        const json = await response.json();
        setCount(json + 1);
        console.log(json + 1);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: selectedStudent,
          room: selectedRoom,
          floor: selectedFloor,
          hall_id: hallId,
        }),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        alert("Success");
        setLoading(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Card className="border-[1px] border-gray-300">
      <CardHeader className="space-y-4">
        <CardTitle>Room Details</CardTitle>

        <CardDescription>
          Please select the Room of the student and fill in the required
          information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col w-1/4 space-y-3">
              <Label htmlFor="studentSelect" className="text-xs">
                Select Student
              </Label>
              <Select
                required
                onValueChange={(value) => setSelectedStudent(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {studentData.map((student) => (
                    <SelectItem
                      key={student.student_id}
                      value={student.student_id}
                    >
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/4 space-y-3">
              <Label htmlFor="floorSelect" className="text-xs">
                Select Floor
              </Label>
              <Select
                required
                value={selectedFloor}
                onValueChange={(value) => setSelectedFloor(value)}
                disabled={!!selectedFloor} // Disable if a floor is selected
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {floors.map((floor) => (
                    <SelectItem key={floor} value={floor}>
                      {floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-1/4 space-y-3">
              <Label htmlFor="roomSelect" className="text-xs">
                Select Room No
              </Label>
              <Select
                required
                disabled={!!selectedRoom} // Disable if a room is selected
                onValueChange={(value) => {
                  setSelectedRoom(value);
                  handleClick(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-end mt-7">
            {isLoading ? (
              <Button
                type="submit"
                className="bg-blue-500 text-xs hover:bg-blue-400 hover:transition-all hover:delay-100"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : count > parseInt(hallData?.bed ?? "0", 10) ? (
              <div className="text-red-500 text-xs">
                Room is already booked, Refresh and choose another
              </div>
            ) : (
              <Button
                type="submit"
                className="bg-blue-500 text-xs hover:bg-blue-400 hover:transition-all hover:delay-100"
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
