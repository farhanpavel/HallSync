"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { url } from "../Url/page";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

export function Studentform({ className, ...props }: CardProps) {
  const id = Cookies.get("id");
  const router = useRouter();
  const [formData, setFormData] = useState({
    registration_num: "",
    student_id: id,
    department: "",
    enroll_year: "",
    expected_grad: "",
    hall_id: "",
    active: 1,
    name: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(files ? files[0] : null);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, String(formData[key as keyof typeof formData]));
    });
    if (image) {
      formDataObj.append("image", image);
    }

    const response = await fetch(`${url}/api/form`, {
      method: "POST",
      body: formDataObj,
    });

    if (response.ok) {
      setLoading(false);
      router.back();
    } else {
      alert("Failed to submit form.");
    }
  };

  return (
    <Card
      className={cn(
        "w-full max-w-4xl mx-auto border border-gray-300 bg-white shadow-lg rounded-lg",
        className
      )}
      {...props}
    >
      <CardHeader className="text-center border-b border-gray-200 pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Hall Form
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Please fill out the form to assign your hall.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Photo
              </Label>
              <Input
                id="picture"
                type="file"
                name="image"
                className="bg-gray-50 w-1/5 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </Label>
                <Input
                  type="number"
                  name="registration_num"
                  className="bg-gray-50 border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Enrolled Department
                </Label>
                <Input
                  type="text"
                  name="department"
                  className="bg-gray-50 border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Enrolled Year
                </Label>
                <Input
                  type="date"
                  name="enroll_year"
                  className="bg-gray-50 border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Expected Graduation
                </Label>
                <Input
                  type="date"
                  name="expected_grad"
                  className="bg-gray-50 border border-gray-300 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-6 border-t border-gray-200">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
