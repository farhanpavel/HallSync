"use client";
import React, { useState, useEffect } from "react";
import { url } from "@/components/Url/page";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/components/Context/admincontext";
import Cookies from "js-cookie";

// Define types for the provost and user
interface User {
  id: string;
  name: string;
}

interface Provost {
  provost_id: string;
  user: User;
}

interface UserData {
  id: string;
}

export default function Page() {
  const [user, setUser] = useState<Provost[]>([]);
  const [assignedUser, setAssignedUser] = useState<Provost | null>(null);
  const { userData } = useAppContext();

  useEffect(() => {
    const fetchProvostData = async () => {
      try {
        const response = await fetch(`${url}/api/provost`);
        if (response.ok) {
          const json = await response.json();
          setUser(json);
        } else {
          console.error("Failed to fetch provost data");
        }
      } catch (error) {
        console.error("Error fetching provost data:", error);
      }
    };

    const fetchAssignedProvost = async () => {
      const hallId = Cookies.get("hallId");

      try {
        const response = await fetch(`${url}/api/provost/active/${hallId}`);
        if (response.ok) {
          const json = await response.json();
          setAssignedUser(json);
        } else {
          console.error("Failed to fetch assigned provost");
        }
      } catch (error) {
        console.error("Error fetching assigned provost:", error);
      }
    };

    fetchProvostData();
    fetchAssignedProvost();
  }, [userData.id]);

  const handleAssign = async (provostId: string) => {
    const selectedUser = user.find((p) => p.provost_id === provostId);
    if (selectedUser) {
      setAssignedUser(selectedUser);
      setUser((prev) => prev.filter((p) => p.provost_id !== provostId));

      try {
        const response = await fetch(`${url}/api/provost/${provostId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: "1",
            hall_id: userData.id,
          }),
        });

        if (!response.ok) {
          alert("Failed to assign provost");
          setAssignedUser(null);
          setUser((prev) => [...prev, selectedUser]);
        }
      } catch (err) {
        console.error("Error assigning provost:", err);
        setAssignedUser(null);
        setUser((prev) => [...prev, selectedUser]);
      }
    }
  };

  const handleRemove = async () => {
    if (assignedUser) {
      const removedUser = assignedUser;
      setUser((prev) => [...prev, removedUser]);
      setAssignedUser(null);

      try {
        const response = await fetch(
          `${url}/api/provost/${assignedUser.provost_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              active: "0",
              hall_id: "",
            }),
          }
        );

        if (!response.ok) {
          alert("Failed to remove provost");
          setUser((prev) =>
            prev.filter((p) => p.provost_id !== removedUser.provost_id)
          );
          setAssignedUser(removedUser);
        }
      } catch (err) {
        console.error("Error removing provost:", err);
        setUser((prev) =>
          prev.filter((p) => p.provost_id !== removedUser.provost_id)
        );
        setAssignedUser(removedUser);
      }
    }
  };

  return (
    <Card className="border-[1px] border-gray-300">
      <CardHeader>
        <CardTitle className="text-lg">Manage Hall</CardTitle>
        <CardDescription className="text-xs">
          Manage the Hall access for the provost.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="w-1/3">
            <Card>
              <CardHeader>
                <div className="py-3 text-[#4a4a4a] flex justify-between text-xs border-b-[1px] border-gray-300">
                  <div>
                    <h1>Select Hall To</h1>
                  </div>
                  <div>
                    <h1>Assign</h1>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {user.map((data) => (
                  <h1
                    className="text-xs flex items-center justify-between text-[#4a4a4a] border-b-[1px] border-gray-200 py-3"
                    key={data.provost_id}
                  >
                    {data.user?.name}{" "}
                    <Button
                      className="h-8 w-8 hover:bg-black hover:text-white hover:transition-all hover:delay-100 hover:duration-100"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAssign(data.provost_id)}
                      disabled={!!assignedUser}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </h1>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="w-1/3">
            <Card>
              <CardHeader>
                <div className="py-3 text-[#4a4a4a] flex justify-between text-xs border-b-[1px] border-gray-300">
                  <div>
                    <h1>Remove</h1>
                  </div>
                  <div>
                    <h1>From Hall</h1>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {assignedUser && assignedUser.user && (
                  <h1 className="text-xs flex items-center justify-between text-[#4a4a4a] border-b-[1px] border-gray-200 py-3">
                    <Button
                      onClick={handleRemove}
                      className="h-8 w-8 hover:bg-black hover:text-white hover:transition-all hover:delay-100 hover:duration-100"
                      variant="ghost"
                      size="icon"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {assignedUser.user.name}
                  </h1>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
