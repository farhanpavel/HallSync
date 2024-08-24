import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="lg:flex  justify-around items-center min-h-screen container ">
        <div className="flex flex-col justify-center order-last ">
          <Image
            src={"/images/hero.gif"}
            width={500}
            height={400}
            alt="hero"
            className="mx-auto"
          />
        </div>
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left ">
          <div>
            <h1 className="text-5xl font-bold  leading-[3.4rem] font-sansSerif text-[#4a4a4a]">
              Simplify <br /> Hall Life With Ease
            </h1>
          </div>
          <div>
            <p className="font-rubik text-center text-xl lg:text-left leading-[2rem] text-[#4a4a4a]">
              Welcome to HallSync, your all-in-one hall
              <br /> management tool. Manage hall seats, track
              <br /> payments, and send notices effortlessly.
              <br /> Students can sign up, submit forms, and pay
              <br /> securely in just a few clicks. Integrated with your
              <br /> campus system for instant updates. Start your <br />
              stress-free hall experience today!
            </p>
          </div>
          <div className="space-x-3 p-5 lg:p-0">
            <button className="px-6 font-rubik py-2 rounded-full bg-blue-600 text-white">
              Learn More
            </button>
            <button>
              <Link
                href={"/signup"}
                className="font-rubik px-6 py-2 border-[1px] rounded-full border-blue-600 text-blue-600"
              >
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
