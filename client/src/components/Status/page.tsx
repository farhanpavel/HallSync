"use client";
import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { url } from "../Url/page";
import Cookies from "js-cookie";
interface FormData {
  form_id: String;
  registration_num: String;
  student_id: String;
  department: String;
  enroll_year: String;
  expected_grad: String;
  hall_id: String;
  imageUrl: String;
  active: Number;
}

const notifications = [
  {
    title: "Submission May Be Rejected",
    description: "Please ensure all details are accurate before submission.",
  },
  {
    title: "Upload a Recent Photograph",
    description:
      "The photograph must be recent and should not exceed 1 MB in size.",
  },
  {
    title: "Approval Process Duration",
    description:
      "The approval process may take 2 to 3 working days. We appreciate your patience.",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Statuscard({ className, ...props }: CardProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Add loading state
  const id = Cookies.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/api/form/${id}`);
      if (response.ok) {
        const json = await response.json();
        setFormData(json);
      } else {
        console.error("Failed to fetch data");
      }
      setLoading(false); // Set loading to false once data is fetched
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={cn("bg-[#F0F4F4]", className)}>
        <CardContent className="text-center py-6 text-gray-500">
          <div className="flex justify-center items-center">
            <div className="relative inline-flex">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </div>
    );
  }

  const activeStatus = formData?.active || 0;

  return (
    <Card
      className={cn(
        "w-[55%] border-[1px] border-gray-300 shadow-xl bg-gradient-to-r from-white via-gray-50 to-gray-100",
        className
      )}
      {...props}
    >
      {activeStatus === 0 && (
        <Card>
          <CardHeader className="text-center py-6">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Form Request
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              A form to allocate your hall
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4 space-y-6">
            <div className="flex justify-center w-1/2 mx-auto items-center space-x-4 rounded-md p-4 bg-gray-100 border-[1px] border-gray-300">
              <BellRing className="text-blue-500" />
              <p className="text-sm font-medium leading-none text-gray-800">
                Form Fill-up Request
              </p>
            </div>
            <div className="space-y-5">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-4 last:mb-0 last:pb-0"
                >
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-700">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="py-6">
            <Button
              onClick={() => {
                router.push("/studentdashboard/status/form");
              }}
              className="w-1/2 mx-auto bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-400 hover:to-blue-300"
            >
              Start
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeStatus === 1 && (
        <Card>
          <CardHeader className="text-center py-6">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Form Submitted
            </CardTitle>
            <CardDescription className="text-xs text-gray-600">
              Please wait for the provosts response.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="text-center text-gray-700">
              Your form has been submitted successfully. The provost will review
              your application and respond shortly.
            </div>
          </CardContent>
        </Card>
      )}

      {activeStatus === 2 && (
        <div className="text-center text-2xl font-bold text-gray-800">
          Hello, World!
        </div>
      )}
    </Card>
  );
}
