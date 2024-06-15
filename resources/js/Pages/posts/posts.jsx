import Guest from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
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
import { BloodTypes } from "@/Components/data/BloodTypes";
const posts = ({ auth, allPosts, cities, session }) => {
  const bloodTypes = BloodTypes

  let posts = allPosts.data;

  const user = auth.user;
  posts = posts.filter((post) => post.status != "inactive");

  const [city, setCity] = useState("");
  const [urgency, setUrgency] = useState("");
  const [blood_type, setBloodType] = useState("");

  posts = city ? posts.filter((post) => post.city.id === city) : posts;
  posts = blood_type
    ? posts.filter((post) => post.blood_type === blood_type)
    : posts;
  posts = urgency
    ? posts.filter((post) => post.urgency_level === urgency)
    : posts;

    const { data, setData, post, processing } = useForm({
      post_id: null,
    });

  const donate = (id) => {
    setData("post_id", id);
  };

  useEffect(() => {
    if (data.post_id !== null) {
      post(route("donations.store"));
    }
  }, [data.post_id]);

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
            <section className=" dark:bg-gray-900">
              <div className="px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-4">
                  <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    All Requests
                  </h2>
                  <p className="mb-4 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Find a post near you
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
                <div className="grid gap-8 lg:grid-cols-2">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <article
                        key={post.id}
                        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                          <Badge
                            className={
                              post.urgency_level == "normal"
                                ? "bg-green-500 text-sm hover:bg-green-500"
                                : "bg-red-500 text-sm hover:bg-red-500"
                            }
                          >
                            {post.urgency_level}
                          </Badge>
                          <span className="bg-red-100 text-red-800 text-xs sm:text-lg font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">{`Blood Type: ${post.blood_type}`}</span>
                        </div>
                        <h2 className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Hospital Name: {post.hospital_name}
                        </h2>
                        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          City: {post.city.name}
                        </h2>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Location: {post.location}
                        </h2>
                        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          Quantity: {post.quantity}
                        </h2>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <Link
                              href={
                                post.requester.role == "bank"
                                  ? `/banks/${post.requester.id}`
                                  : `/donors/${post.requester.id}`
                              }
                              className="my-4  text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                            >
                              By: {post.requester.name}
                            </Link>
                          </div>
                          <div>
                            {
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>donate</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  {user ? (
                                    session ? (
                                      session.id == post.id ? (
                                        <div
                                          className={`font-medium mx-auto py-4 ${session.type}`}
                                        >
                                          {session.message}
                                        </div>
                                      ) : (
                                        <div className="font-medium mx-auto py-4">
                                          Are you sur you want to donate?
                                        </div>
                                      )
                                    ) : (
                                      <div className="font-medium mx-auto py-4">
                                        Are you sur you want to donate?
                                      </div>
                                    )
                                  ) : (
                                    <div className="font-medium mx-auto py-4">
                                      You must login to donate
                                    </div>
                                  )}
                                  <DialogFooter className="mx-auto">
                                    {user ? (
                                      session ? (
                                        session.id == post.id ? (
                                          ""
                                        ) : (
                                          <Button
                                            disabled={processing}
                                            onClick={() =>
                                              donate(post.id)
                                            }
                                          >
                                            donate
                                          </Button>
                                        )
                                      ) : (
                                        <Button
                                          disabled={processing}
                                          onClick={() => donate(post.id)}
                                        >
                                          donate
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
                            }
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        No posts found{city ? ` for the selected city` : ""}.
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <Paginate links={allPosts.links} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default posts;
