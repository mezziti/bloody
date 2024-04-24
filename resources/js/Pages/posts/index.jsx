import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/Components/ui/select";
import { useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/Components/ui/sheet";
const Index = ({ auth,posts, cities }) => {
  
  const bloodTypes = [
    {
      name: "A+",
    },
    {
      name: "A-",
    },
    {
      name: "B+",
    },
    {
      name: "B-",
    },
    {
      name: "AB+",
    },
    {
      name: "AB-",
    },
    {
      name: "O+",
    },
    {
      name: "O-",
    },
  ];

  const user = auth.user;
  posts = posts.filter((post) => post.status != "inactive");

  const [city, setCity] = useState("");
  const [urgency, setUrgency] = useState("");
  const [blood_type, setBloodType] = useState("");

  posts = city ? posts.filter((post) => post.city.id === city) : posts;
  posts = blood_type ? posts.filter((post) => post.blood_type === blood_type) : posts;
  posts = urgency ? posts.filter((post) => post.urgency_level === urgency) : posts;
  return (
    <Guest user={user}>
      <Head title="All posts" />
      <section className="pl-4 md:pl-6">
        <div className="flex flex-col md:flex-row gap-4 xl:gap-8 max-w-7xl mx-auto items-start">
          <div className="w-full md:w-[300px] order-last md:order-first">
            <div className="hidden md:block">
              <Card className="border-0 shadow-none shrink-0">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">City</h3>
                      <div className="mt-2 flex flex-col gap-4">
                        <Select
                          value={city}
                          onValueChange={(value) => setCity(value)}
                          className="ml-auto "
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <ScrollArea className="h-40">
                              <SelectGroup>
                                {cities.map((city) => (
                                  <SelectItem key={city.id} value={city.id}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Blood Type</h3>
                      <div className="mt-2 flex flex-col gap-4">
                        <Select
                          value={blood_type}
                          onValueChange={(value) => setBloodType(value)}
                          className="ml-auto "
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Blood Type" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <ScrollArea className="h-40">
                              <SelectGroup>
                                {bloodTypes.map((bloodType) => (
                                  <SelectItem
                                    key={bloodType.name}
                                    value={bloodType.name}
                                  >
                                    {bloodType.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Urgency Level</h3>
                      <div className="mt-2 flex flex-col gap-4">
                        <Select
                          value={urgency}
                          onValueChange={(value) => setUrgency(value)}
                          className="ml-auto "
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Urgency Level" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <ScrollArea className="max-h-40 z-10">
                              <SelectGroup>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectGroup>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      className="w-[100px]"
                      onClick={() => {
                        setCity("");
                        setBloodType("");
                        setUrgency("");
                      }}
                    >
                      reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full md:w-full pr-4 pb-4">
            <div className="grid gap-6 md:gap-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="grid gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">
                    All posts
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Find a post near you
                  </p>
                </div>
                <div className="flex w-full gap-2 md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>Filters</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle className="mt-10 mx-auto">
                          Filters
                        </SheetTitle>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-4 mx-auto">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold">City</h3>
                            <div className="grid gap-2">
                              <Select
                                value={city}
                                onValueChange={(value) => setCity(value)}
                                className="ml-auto "
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                                <SelectContent>
                                  <ScrollArea className="max-h-40 z-10">
                                    <SelectGroup>
                                      {cities.map((city) => (
                                        <SelectItem
                                          key={city.id}
                                          value={city.id}
                                        >
                                          {city.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold">
                              Blood Type
                            </h3>
                            <div className="grid gap-2">
                              <Select
                                value={blood_type}
                                onValueChange={(value) => setBloodType(value)}
                                className="ml-auto "
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Blood Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <ScrollArea className="max-h-40 z-10">
                                    <SelectGroup>
                                      {bloodTypes.map((bloodType) => (
                                        <SelectItem
                                          key={bloodType.name}
                                          value={bloodType.name}
                                        >
                                          {bloodType.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold">
                              Urgency Level
                            </h3>
                            <div className="mt-2 flex flex-col gap-4">
                              <Select
                                value={urgency}
                                onValueChange={(value) => setUrgency(value)}
                                className="ml-auto "
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Urgency Level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <ScrollArea className="max-h-40 z-10">
                                    <SelectGroup>
                                      <SelectItem value="normal">
                                        Normal
                                      </SelectItem>
                                      <SelectItem value="urgent">
                                        Urgent
                                      </SelectItem>
                                    </SelectGroup>
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button
                            className="w-[100px] mx-auto"
                            onClick={() => {
                              setCity("");
                              setBloodType("");
                              setUrgency("");
                            }}
                          >
                            reset
                          </Button>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild></SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="items-center justify-between my-2 w-full sm:flex bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="w-full">
                        <div className="flex w-full relative flex-col justify-between bg-white border border-gray-200 rounded-lg shadow sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <Badge
                            className={
                              post.urgency_level == "normal"
                                ? "absolute end-3 top-2 bg-green-500 hover:bg-green-500"
                                : "absolute end-3 top-2 bg-red-500 hover:bg-red-500"
                            }
                          >
                            {post.urgency_level}
                          </Badge>
                          <div className="flex w-full flex-col sm:flex-row">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                By : {post.requester.name}
                              </h5>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Hospital Name : {post.hospital}
                              </p>
                              <div className="flex-row sm:flex gap-10">
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  City : {post.city.name}
                                </h5>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  Location : {post.location}
                                </h5>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  Blood Type : {post.blood_type}
                                </h5>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  Quantity: <br className="hidden" />
                                  {post.quantity}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className=" sm:pt-6 ">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="m-5">Donate</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                {user ? (
                                  <div className="font-medium mx-auto py-4">
                                    Are you sur you want to donate?
                                  </div>
                                ) : (
                                  <div className="font-medium mx-auto py-4">
                                    You must login to donate
                                  </div>
                                )}
                                <DialogFooter className="mx-auto">
                                  {user ? (
                                    <Link href="/">
                                      <Badge className={"rounded-sm text-lg"}>
                                        post
                                      </Badge>
                                    </Link>
                                  ) : (
                                    <Link href="/login">
                                      <Badge className={"rounded-sm text-lg"}>
                                        Login
                                      </Badge>
                                    </Link>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      No posts found{city ? ` for the selected city` : ""}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default Index;