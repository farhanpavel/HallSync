import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>User Details</CardTitle>
        <CardDescription>
          Please select the role of the user and fill in the required
          information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col w-1/4 space-y-1.5">
              <Label htmlFor="framework">Select role</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="astro">Hall Provost</SelectItem>
                  <SelectItem value="nuxt">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <h1>Enter User Informations</h1>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
