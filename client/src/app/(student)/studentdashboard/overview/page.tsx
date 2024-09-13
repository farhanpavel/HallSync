"use client";
import { Adminpanel } from "@/components/Adminpanel/page";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
interface User {
  name: string;
  role: string;
}
interface Hall {
  floor: string;
  room: string;
  hall: {
    hall_name: string;
  };
}
export default function Overview() {
  const [userData, setuserData] = useState<User>({
    name: "",
    role: "",
  });
  const [hallData, setHallData] = useState<Hall>({
    floor: "",
    room: "",
    hall: {
      hall_name: "",
    },
  });
  const [count, setCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const id = Cookies.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/api/user/${id}`);
      const json = await response.json();
      if (response.ok) {
        setuserData(json);
      }
    };
    const hallData = async () => {
      const response = await fetch(
        `${url}/api/room/studentdata/hall/data/${id}`
      );
      const json = await response.json();
      if (response.ok) {
        setHallData(json);
      }
    };
    const paymentData = async () => {
      const active = 0;
      const response = await fetch(`${url}/api/payment/data/${id}/${active}`);
      const json = await response.json();
      if (response.ok) {
        setCount(json);
      }
    };
    const paymentDataAnother = async () => {
      const active = 1;
      const response = await fetch(`${url}/api/payment/data/${id}/${active}`);
      const json = await response.json();
      if (response.ok) {
        setPaidCount(json);
      }
    };
    fetchData();
    hallData();
    paymentData();
    paymentDataAnother();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold capitalize text-gray-800 text-center mb-8">
          Welcome {userData.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Total Payments</h2>
            <p className="text-lg">
              You have completed {paidCount} payments this year.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
            <p className="text-lg">
              You have {count} pending payments for this semester.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Hall Information</h2>
            <p className="text-lg">
              Your current hall is{" "}
              {hallData?.hall?.hall_name
                ? hallData.hall.hall_name
                : "unassigned"}{" "}
              Hall, Floor {hallData?.floor ? hallData.floor : "unassigned"},
              Room {hallData?.room ? hallData.room : "unassigned"}.
            </p>
          </div>
        </div>

        <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="p-4 bg-white rounded-md shadow-sm border-l-4 border-blue-500">
              <p className="text-lg">
                Payment of $500 was successfully made on 12th August 2024.
              </p>
            </li>
            <li className="p-4 bg-white rounded-md shadow-sm border-l-4 border-green-500">
              <p className="text-lg">
                Registered for new courses on 5th September 2024.
              </p>
            </li>
            <li className="p-4 bg-white rounded-md shadow-sm border-l-4 border-yellow-500">
              <p className="text-lg">
                Payment reminder for the upcoming due on 30th September 2024.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
