import React from "react";
import Image from "next/image";
import { BsBroadcast } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { GiAbstract037 } from "react-icons/gi";
export default function Benefit() {
  return (
    <div id="benefits">
      <div>
        <div className="text-center mt-14">
          <div className="font-rubik font-medium text-xl   text-blue-600 uppercase">
            <h1>Benefits</h1>
          </div>
          <div className="font-sansSerif  text-5xl  mt-5 font-medium text-[#4a4a4a] ">
            <h1>
              Unlock Hall Booking Efficiency with <br /> HallSync
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 container mx-auto gap-y-7 md:gap-y-7 lg:gap-y-0">
        <div className=" space-y-4">
          <div>
            <BsBroadcast className="text-5xl bg-red-100 p-3 text-red-400 font-bold rounded-full" />
          </div>

          <div className="text-xl font-semibold text-[#4a4a4a] font-sansSerif">
            <h1>Comprehensive Network</h1>
          </div>
          <div className="w-[90%]  font-rubik text-sm text-[#4a4a4a]">
            <p>
              Manage multiple halls with ease, ensuring every student finds
              their perfect accommodation.
            </p>
          </div>
        </div>
        <div className=" space-y-4">
          <div>
            <FaFire className="text-5xl  bg-yellow-100 p-3 text-yellow-400  font-bold rounded-full" />
          </div>

          <div className="text-xl font-semibold text-[#4a4a4a] font-sansSerif">
            <h1>Streamlined Allocation</h1>
          </div>
          <div>
            <p className="w-[90%]  font-rubik text-sm text-[#4a4a4a]">
              Quickly assign rooms and manage occupancy, optimizing the use of
              available spaces.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <IoRocketSharp className="text-5xl font-bold rounded-full bg-green-100 p-3 text-green-400" />
          </div>

          <div className="text-xl font-semibold text-[#4a4a4a] font-sansSerif">
            <h1>Accessible Payment</h1>
          </div>
          <div className="w-[90%]  font-rubik text-sm text-[#4a4a4a]">
            <p>
              Easily monitor and track student payments, ensuring financial
              clarity and timely fee collection
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <GiAbstract037 className="text-5xl bg-blue-100 p-3 text-blue-400 font-bold rounded-full" />
          </div>

          <div className="text-xl font-semibold text-[#4a4a4a] font-sansSerif">
            <h1>Centralized Communication</h1>
          </div>
          <div className=" w-[90%] font-rubik text-sm text-[#4a4a4a]">
            <p>
              Keep students informed with notices and updates, enhancing
              transparency and engagement across the campus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
