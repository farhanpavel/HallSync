"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { url } from "@/components/Url/page";

// Define types for payment and student data
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
  form_id: string;
  registration_num: string;
  student_id: string;
  department: string;
  enroll_year: string;
  expected_grad: string;
  hall_id: string;
  imageUrl: string;
  active: number;
  hall_active: number;
  payment: Payment[];
}

export default function Payment() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [unpaidPayments, setUnpaidPayments] = useState<Payment[]>([]);
  const studentId = Cookies.get("id");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/form/${studentId}`);
        const data: StudentData = await response.json();

        if (response.ok) {
          console.log(data);
          setStudentData(data);

          // Filter payments with status 0 (unpaid)
          const unpaidPaymentsList = data.payment.filter(
            (payment) => payment.status === 0
          );

          // Calculate the total amount due for unpaid payments
          const total = unpaidPaymentsList.reduce(
            (acc, payment) => acc + parseFloat(payment.fee),
            0
          );

          setUnpaidPayments(unpaidPaymentsList);
          setTotalAmount(total);
        } else {
          console.error("Failed to fetch data:");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [studentId]);

  const handlePay = async (paymentId: string) => {
    try {
      const response = await fetch(`${url}/api/ssl/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push(result.url); // Use router.push for redirection
      } else {
        console.error("Payment initiation failed:", result.error);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-bold text-blue-700 mb-4">
        Student Payment Dashboard
      </h1>
      {studentData ? (
        <>
          <div className="flex items-center mb-6">
            <img
              src={studentData.imageUrl}
              alt={studentData.name}
              className="w-24 h-24 rounded-full shadow-md mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {studentData.name}
              </h2>
              <p className="text-gray-600">
                Registration Number: {studentData.registration_num}
              </p>
              <p className="text-gray-600">
                Department: {studentData.department}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Details
            </h3>
            {unpaidPayments.length > 0 ? (
              <ul className="space-y-4">
                {unpaidPayments.map((payment) => (
                  <li
                    key={payment.payment_id}
                    className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {payment.month} {payment.year}
                      </p>
                      <p className="text-gray-600">Fee: ৳{payment.fee}</p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handlePay(payment.payment_id)}
                    >
                      Pay
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No payment due</p>
            )}
          </div>

          <div className="flex justify-end items-center">
            <p className="text-xl font-semibold text-gray-800">
              Total Due: ৳{totalAmount}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Loading student data...</p>
      )}
    </div>
  );
}
