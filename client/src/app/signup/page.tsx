"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { url } from "@/components/Url/page";
export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "student",
  });
  const router = useRouter();
  const { name, email, password, confirmpassword, role } = user;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (!email || !password || !name || !confirmpassword) {
      alert("Please fill everything.");
      return;
    }
    if (password == confirmpassword) {
      try {
        const response = await fetch(`${url}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          alert("Server Error");
          throw new Error("Failed to submit data");
        } else {
          alert("Success");
          router.push("/signin");
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      alert("Password Doesnot Match");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[80%] sm:w-3/4 m-auto  flex flex-wrap sm:flex-nowrap  shadow-lg shadow-blue-600 justify-around text-center p-16 ">
          <div className="space-y-7 flex flex-wrap flex-col justify-center items-center">
            <div>
              <Image
                src="/images/logo2.png"
                width={200}
                height={200}
                alt="logo"
              />
            </div>
            <div className="text-center space-y-1 2xl:text-2xl text-md  text-xl font-semibold">
              <h1>Welcome back!</h1>
              <p>Please Signup To Your Account</p>
            </div>
            <div className="2xl:w-3/4 w-full">
              <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmpassword"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />

                <div className="space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 w-full text-white hover:bg-green-500 hover:transition-all hover:delay-200"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="order-first sm:order-last lg:flex items-center hidden">
            <Image
              src="/images/signup.png"
              width={400}
              height={400}
              alt="logo"
              className="lg:w-[400px] md:w-[300px] 2xl:w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
