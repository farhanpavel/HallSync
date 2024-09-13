"use client";
import { Adminpanel } from "@/components/Adminpanel/page";
import { GoHome } from "react-icons/go";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GrRestroomMen } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { url } from "@/components/Url/page";
interface User {
  name: string;
  role: string;
}
interface Hall {
  hall_name: string;
  capacity: string;
  floor: string;
  room: string;
  bed: string;
  fee: string;
}
export default function Page() {
  const id = Cookies.get("id");
  const hallid = Cookies.get("hallId");
  const [userData, setuserData] = useState<User>({
    name: "",
    role: "",
  });
  const [hallData, sethallData] = useState<Hall>({
    hall_name: "",
    capacity: "",
    floor: "",
    room: "",
    bed: "",
    fee: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/api/user/${id}`);
      const json = await response.json();
      if (response.ok) {
        setuserData(json);
      }
    };
    const hallData = async () => {
      const response = await fetch(`${url}/api/hall/${hallid}`);
      const json = await response.json();
      if (response.ok) {
        sethallData(json);
      }
    };

    fetchData();
    hallData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Welcome Section */}
      <div className="space-y-2 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Welcome <span className="capitalize">{userData.name}</span>
        </h1>
        <h1 className="text-3xl font-semibold capitalize text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          {userData.role}
        </h1>
      </div>

      {/* Card Section */}
      <div className="mt-12 flex flex-col md:flex-row lg:flex-wrap justify-center gap-8">
        {/* Hall Information Card */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-8 rounded-lg shadow-xl shadow-red-300 transform hover:scale-105 transition duration-300 ease-in-out">
          <GoHome className="text-7xl text-white mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-center mb-2">
            {hallData.hall_name ? hallData.hall_name : "Unassigned"}
          </h1>
          <p className="text-lg text-center">
            Capacity: <span className="font-semibold">{hallData.capacity}</span>
          </p>
        </div>

        {/* Floor & Room Information Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-lg shadow-xl shadow-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out">
          <GrRestroomMen className="text-7xl text-white mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-center mb-2">
            Floor: <span className="font-semibold">{hallData.floor}</span>
          </h1>
          <p className="text-lg text-center">
            Each Floor Room:{" "}
            <span className="font-semibold">{hallData.room}</span>
          </p>
        </div>

        {/* Fee Information Card */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl shadow-purple-400 transform hover:scale-105 transition duration-300 ease-in-out">
          <CiMoneyCheck1 className="text-7xl text-white mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-center mb-2">
            Monthly Fee: <span className="font-semibold">{hallData.fee}৳</span>
          </h1>
          <p className="text-lg text-center">Jahangirnagar University</p>
        </div>
      </div>
    </div>
  );
}
