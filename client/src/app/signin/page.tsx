"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Signin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isvalid, setvalid] = useState(false);
  const { email, password } = user;
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((x) => ({
      ...x,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/user/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        if (response.status === 401) {
          setvalid(true);
        } else {
          throw new Error("invalid");
        }
        return;
      }
      setvalid(false);
      const data = await response.json();
      alert("Login successful!");
      if (data.role === "student") {
        Cookies.set("id", data.id);
        router.push("/studentdashboard/overview");
      } else if (data.role === "admin") {
        Cookies.set("id", data.id);
        router.push("/admindashboard/overview");
      } else {
        Cookies.set("id", data.id);
        Cookies.set("hallId", data.hall_id);
        router.push("/provostdashboard/overview");
      }
    } catch (err) {
      console.log("error", err);
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
            <div className="text-center space-y-1 2xl:text-2xl text-md font- text-xl font-semibold">
              <h1>Welcome back!</h1>
              <p>Please Login To Your Account</p>
            </div>
            <div className="2xl:w-3/4 w-full">
              <form
                action=""
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Email"
                  onChange={handleChange}
                />
                {isvalid && (
                  <div className="text-left text-sm text-red-600 mx-1">
                    <p>Invalid Email</p>
                  </div>
                )}
                <input
                  type="password"
                  name="password"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="Password"
                  onChange={handleChange}
                />
                {isvalid && (
                  <div className="text-left text-sm text-red-600 mx-1">
                    <p>Invalid Password</p>
                  </div>
                )}
                <div className="space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 w-full text-white"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div>
                <h1 className="text-sm  text-center mt-4">
                  Forgot Password?{" "}
                  <Link href={"/signup"} className="font-bold text-blue-500">
                    Signup
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          <div className="order-first sm:order-last lg:flex items-center hidden">
            <Image
              src="/images/login.png"
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
