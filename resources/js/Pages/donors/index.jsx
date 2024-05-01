import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
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
const Index = ({ auth, donors, cities }) => {

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

  const [city, setCity] = useState("");
  const [blood_type, setBloodType] = useState("");

  donors = city ? donors.filter((donor) => donor.city.id === city) : donors;
  donors = blood_type ? donors.filter((donor) => donor.blood_type === blood_type) : donors;
  return (
    <Guest user={user}>
      <Head title="All donors" />
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
                          className="ml-auto z-20 sm:z-20"
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent className="z-20 sm:z-20">
                            <ScrollArea className="max-h-40 z-10">
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
                          className="ml-auto z-20 sm:z-20"
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Blood Type" />
                          </SelectTrigger>
                          <SelectContent className="z-20 sm:z-20">
                            <ScrollArea className="max-h-40 z-10">
                              <SelectGroup>
                                <ScrollArea className="h-40">
                                  {bloodTypes.map((bloodType) => (
                                    <SelectItem
                                      key={bloodType.name}
                                      value={bloodType.name}
                                    >
                                      {bloodType.name}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
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
            <section className="dark:bg-gray-900">
              <div className="px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-4">
                  <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    All donors
                  </h2>
                  <p className="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Find a donor near you
                  </p>
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
                                  <SelectContent className="">
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
                            <Button
                              className="w-[100px] mx-auto"
                              onClick={() => {
                                setCity("");
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
                <div className="grid gap-8 lg:grid-cols-2">
                  {donors.length > 0 ? (
                    donors.map((donor) => (
                      <article
                        key={donor.id}
                        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                          <Badge className={"bg-green-500 hover:bg-green-500"}>
                            {`Blood Type : ${donor.blood_type}`}
                          </Badge>
                          <span className="bg-red-100 text-red-800 text-xs sm:text-base font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">
                            Last Donation : <br className="lg:hidden" />
                            {donor.last_donation_date.split(" ")[0]}
                          </span>
                        </div>
                        <Link
                          href={`/donors/${donor.id}`}
                          className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                          Name: {donor.name}
                        </Link>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Gender: {donor.gender}
                        </h2>
                        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          City: {donor.city.name}
                        </h2>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Phone 1: {donor.phone1}
                        </h2>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Phone 2: {donor.phone2}
                        </h2>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <span className="my-4  text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {/* By: {donor.donor.name} */}
                            </span>
                          </div>
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>Request Donation</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                {user ? (
                                  <div className="font-medium mx-auto py-4">
                                    Are you sur you want to request donation?
                                  </div>
                                ) : (
                                  <div className="font-medium mx-auto py-4">
                                    You must login to request donation
                                  </div>
                                )}
                                <DialogFooter className="mx-auto">
                                  {user ? (
                                    <Link href="/">
                                      <Badge className={"rounded-sm text-lg"}>
                                        Request
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
                      </article>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        No donors found{city ? ` for the selected city` : ""}.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default Index;
