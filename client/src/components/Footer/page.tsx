import React from "react";
import Image from "next/image";
export default function Footer() {
  return (
    <div>
      <div>
        <Image
          src="/images/logo2.png"
          width={200}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
      </div>
      <div className="mt-6 sm:flex sm:flex-wrap sm:justify-center sm:flex-row">
        <ul className="sm:flex text-center gap-x-6 text-[#4a4a4a] font-rubik">
          <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
            Contact
          </li>
          <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
            FAQ
          </li>
          <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
            Support
          </li>
          <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
            Terms & Condition
          </li>
          <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
            Privacy Policy
          </li>
        </ul>
      </div>
      <div className="p-7 mt-5 ">
        <div className="border-t-[0.1px] p-4 mb-7 border-[#e0dede]">
          <div className="sm:flex sm:flex-wrap sm:justify-between font-rubik text-[#4a4a4a]">
            <div className="text-center">
              <p>Copyright © 2024 | Pavel, All rights reserved.</p>
            </div>
            <div>
              <ul className="sm:flex sm:flex-wrap text-center  gap-x-7">
                <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
                  Contact
                </li>
                <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
                  Terms & Condition
                </li>
                <li className="hover:text-blue-600 cursor-pointer hover:transition-colors hover:delay-150">
                  Cookies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
