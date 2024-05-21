import Guest from "@/Layouts/GuestLayout";
import { Head, router, useForm } from "@inertiajs/react";
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
  SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import Paginate from "@/Components/Paginate";
import InputError from "@/Components/InputError";

const Index = ({ auth, allDrives, cities, session }) => {
  const now = new Date();
  let drives = allDrives.data;

  drives = drives.map((drive) => {
    return new Date(drive.begin_date) > now
      ? { ...drive, status: "upcoming" }
      : new Date(drive.end_date) < now
      ? { ...drive, status: "ended" }
      : { ...drive, status: "active" };
  });
  drives = drives.filter((drive) => drive.status != "ended");
  const user = auth.user;

  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  drives = city ? drives.filter((drive) => drive.city.id === city) : drives;
  drives = status ? drives.filter((drive) => drive.status === status) : drives;

  const { data, setData, post, processing } = useForm({
    drive_id: null,
  });

  const participate = (id) => {
    setData("drive_id", id);
  };

  useEffect(() => {
    if (data.drive_id !== null) {
      post(route("participants.store"));
    }
  }, [data.drive_id]);


  return (
    <Guest user={user}>
      <Head title="All Drives" />
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
                      <h3 className="text-sm font-semibold">status</h3>
                      <div className="mt-2 flex flex-col gap-4">
                        <Select
                          value={status}
                          onValueChange={(value) => setStatus(value)}
                          className="ml-auto z-20 sm:z-20"
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent className="z-20 sm:z-20">
                            <ScrollArea className="max-h-40 z-10">
                              <SelectGroup>
                                <SelectItem value="upcoming">
                                  Upcoming
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
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
                        setStatus("");
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
            <section className=" dark:bg-gray-900">
              <div className="px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-4">
                  <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    All Drives
                  </h2>
                  <p className="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Find a drive near you
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
                            <div className="flex flex-col gap-1">
                              <h3 className="text-sm font-semibold">Status</h3>
                              <div className="grid gap-2">
                                <Select
                                  value={status}
                                  onValueChange={(value) => setStatus(value)}
                                  className="ml-auto "
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                  <SelectContent className="">
                                    <ScrollArea className="max-h-40 z-10">
                                      <SelectGroup>
                                        <SelectItem value="upcoming">
                                          Upcoming
                                        </SelectItem>
                                        <SelectItem value="active">
                                          Active
                                        </SelectItem>
                                      </SelectGroup>
                                    </ScrollArea>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                className="w-[100px] mx-auto"
                                onClick={() => {
                                  setCity("");
                                  setStatus("");
                                }}
                              >
                                reset
                              </Button>
                            </div>
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
                  {drives.length > 0 ? (
                    drives.map((drive) => (
                      <article
                        key={drive.id}
                        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                          {drive.status == "upcoming" ? (
                            <Badge
                              className={"bg-orange-500 hover:bg-orange-500"}
                            >
                              Upcoming
                            </Badge>
                          ) : drive.status == "active" ? (
                            <Badge
                              className={"bg-green-500 hover:bg-green-500"}
                            >
                              Active
                            </Badge>
                          ) : (
                            ""
                          )}
                          <span className="bg-red-100 text-red-800 text-xs sm:text-lg font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">
                            {`From : ${drive.begin_date.split(" ")[0]}`} <br />
                            {`To : ${drive.end_date.split(" ")[0]}`}
                          </span>
                        </div>
                        <h2 className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Drive Name: {drive.name}
                        </h2>
                        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          City: {drive.city.name}
                        </h2>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Location: {drive.location}
                        </h2>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <Link
                              href={`/banks/${drive.bank.id}`}
                              className="my-4  text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                            >
                              By: {drive.bank.name}
                            </Link>
                          </div>
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>Participate</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                {user ? (
                                  session ? (
                                    session.id == drive.id ? (
                                      <div className={`font-medium mx-auto py-4 ${session.type}`}>
                                        {session.message}
                                      </div>
                                    ) : (
                                      <div className="font-medium mx-auto py-4">
                                        Are you sur you want to participate?
                                      </div>
                                    )
                                  ) : (
                                    <div className="font-medium mx-auto py-4">
                                      Are you sur you want to participate?
                                    </div>
                                  )
                                ) : (
                                  <div className="font-medium mx-auto py-4">
                                    You must login to participate
                                  </div>
                                )}
                                <DialogFooter className="mx-auto">
                                  {user ? (
                                    session ? (
                                      session.id == drive.id ? (
                                        ""
                                      ) : (
                                        <Button
                                          disabled={processing}
                                          onClick={() => participate(drive.id)}
                                        >
                                          Participate
                                        </Button>
                                      )
                                    ) : (
                                      <Button
                                        disabled={processing}
                                        onClick={() => participate(drive.id)}
                                      >
                                        Participate
                                      </Button>
                                    )
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
                        No drives found{city ? ` for the selected city` : ""}.
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <Paginate links={allDrives.links} />
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
