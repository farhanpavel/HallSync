import Image from "next/image";
import React from "react";

export default function Feature() {
  return (
    <div id="feature">
      <div className="text-center mt-[15%]">
        <div className="font-rubik font-medium text-xl   text-blue-600 uppercase">
          <h1>Feature</h1>
        </div>
        <div className="font-sansSerif  text-5xl  mt-5 font-medium text-[#4a4a4a] ">
          <h1>
            Enhance Your Hall Experience with
            <br /> HallSync Features
          </h1>
        </div>
        <div className="mt-7">
          <p className="font-rubik text-center text-lg  text-[#4a4a4a] w-[75%] mx-auto ">
            HallSync offers a suite of powerful features to optimize your hall
            management experience. From assigning rooms to tracking payments,
            HallSync provides everything you need for efficient and stress-free
            hall living.
          </p>
        </div>
      </div>
      <div className="lg:flex  items-center justify-between container space-y-8 mt-10">
        <div>
          <Image
            src={"/images/Home.gif"}
            width={500}
            height={500}
            alt="feature"
            className="mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:w-1/2 ">
          <div className="space-y-4  shadow-xl p-10 bg-blue-500 text-white">
            <div className="text-lg font-sansSerif font-semibold">
              <h1>User-Friendly Dashboard</h1>
            </div>
            <div className="text-sm  font-rubik">
              <p>
                Navigate through tasks effortlessly with a clean and intuitive
                interface designed for both admins and students.
              </p>
            </div>
          </div>
          <div className="space-y-4 shadow p-10  bg-blue-500 text-white">
            <div className="text-lg  font-sansSerif font-semibold">
              <h1>Automated Notifications</h1>
            </div>
            <div className="text-sm  font-rubik">
              <p>
                receive instant alerts and reminders for important deadlines,
                payments, and room assignments.
              </p>
            </div>
          </div>
          <div className="space-y-4 shadow p-10  bg-blue-500 text-white">
            <div className="text-lg font-sansSerif font-semibold">
              <h1>Secure Payment Gateway</h1>
            </div>
            <div className="text-sm  font-rubik">
              <p>
                Process payments securely within the platform, ensuring data
                protection and ease of transaction.
              </p>
            </div>
          </div>
          <div className="space-y-4 shadow p-10  shadow-blue-300 border-none opacity-95">
            <div className="text-lg text-[#4a4a4a]  font-sansSerif font-semibold">
              <h1>Customizable Forms</h1>
            </div>
            <div className="text-sm  font-rubik">
              <p>
                Tailor application forms to collect the exact information needed
                from students, simplifying the onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
