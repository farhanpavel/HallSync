"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { url } from "@/components/Url/page";

interface Payment {
  payment_id: string;
  student_id: string;
  hall_id: string;
  status: number;
  month: string;
  year: string;
  payment_date: string;
  fee: string;
}

interface StudentData {
  name: string;
  imageUrl: string;
  payment: Payment[];
}

export default function Page() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const studentId = Cookies.get("studentid");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${url}/api/form/${studentId}`);
        if (response.ok) {
          const data: StudentData = await response.json();
          setStudentData(data);
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (!studentData)
    return <div className="text-center py-4 text-blue-500">Loading...</div>;

  const { name, imageUrl, payment } = studentData;

  // Filter payments with status 0 (unpaid) and calculate total due
  const unpaidPayments = payment.filter((pay) => pay.status === 0);
  const totalDue = unpaidPayments.reduce(
    (sum, { fee }) => sum + parseFloat(fee),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-8">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mr-6"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{name}</h1>
          <p className="text-lg text-gray-600">Student ID: {studentId}</p>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Payment Details
        </h2>
        {unpaidPayments.length === 0 ? (
          <p className="text-gray-500">No payment records found.</p>
        ) : (
          unpaidPayments.map((pay) => (
            <div key={pay.payment_id} className="py-4 border-b last:border-b-0">
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Month:</span> {pay.month}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Year:</span> {pay.year}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-red-600">Due</span>
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Fee:</span> ৳{pay.fee}
              </p>
            </div>
          ))
        )}
        <h3 className="text-xl font-semibold mt-4 text-red-600">
          Total Amount Due: ৳{totalDue.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
