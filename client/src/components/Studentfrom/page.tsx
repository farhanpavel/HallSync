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
  const [isLoading, setLoading] = useState(true);
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
      setTimeout(() => {
        router.back();
      }, 3000);
    } else {
      alert("Failed to submit form.");
    }
  };

  return (
    <Card
      className={cn(
        "w-[90%] container mx-auto border-[1px] border-gray-300 bg-[#FFFFFF] shadow-xl",
        className
      )}
      {...props}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hall Form</CardTitle>
        <CardDescription className="text-xs">
          A Form to assign your hall
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="space-y-2">
            <Label className="text-sm mx-2">Photo</Label>
            <Input
              id="picture"
              type="file"
              name="image"
              className="bg-white w-1/6"
              onChange={handleChange}
            />
          </div>

          <div className="mt-8">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-10">
              <div className="flex items-center">
                <Label className="text-sm mx-2">Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="flex-1 bg-white"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <Label className="text-sm mx-2">Registration Number</Label>
                <Input
                  type="number"
                  name="registration_num"
                  className="flex-1 bg-white"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 mt-4 space-y-4 lg:space-y-0">
              <div className="flex items-center">
                <Label className="text-sm mx-2">Enrolled Department</Label>
                <Input
                  type="text"
                  name="department"
                  className="flex-1 bg-white"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <Label className="text-sm mx-2">Enrolled Year</Label>
                <Input
                  type="date"
                  name="enroll_year"
                  className="flex-1 bg-white"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <Label className="text-sm mx-2">Expected Graduation</Label>
                <Input
                  type="date"
                  name="expected_grad"
                  className="flex-1 bg-white"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <CardFooter className="flex justify-end mt-7">
            {isLoading ? (
              <Button
                type="submit"
                className=" bg-blue-500 text-xs hover:bg-blue-400 hover:transition-all hover:delay-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                disabled
                className=" bg-blue-500 hover:bg-blue-400 hover:transition-all hover:delay-100"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </CardFooter>
        </CardFooter>
      </form>
    </Card>
  );
}
