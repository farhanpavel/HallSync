import Link from "next/link";
import React from "react";

export default function Bottom() {
  return (
    <div>
      <div className="mt-20 bg-blue-200 rounded-xl p-14 w-[90%] mx-auto">
        <div className="text-center  space-y-6">
          <div>
            <h1 className="text-3xl   font-semibold text-[#4a4a4a] font-sansSerif">
              Enhance Your Hall Living Experience with HallSync Today
            </h1>
          </div>
          <div>
            <p className="text-lg font-rubik text-[#4a4a4a]">
              HallSync is the ultimate hall management solution, providing
              powerful tools to simplify room assignments, streamline payments,
              and keep students informed, ensuring a smooth and efficient
              housing experience..
            </p>
          </div>
          <div>
            <button className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold">
              <Link href={"/signup"} className="font-rubik">
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
