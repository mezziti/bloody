import Guest from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
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
  SelectValue,
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
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { BloodTypes } from "@/Components/data/BloodTypes";


const Index = ({ auth, donors, cities, session }) => {
  const bloodTypes = BloodTypes

  const user = auth.user;

  const [city, setCity] = useState("");
  const [blood_type, setBloodType] = useState("");

  donors = city ? donors.filter((donor) => donor.city.id === city) : donors;
  donors = blood_type
    ? donors.filter((donor) => donor.blood_type === blood_type)
    : donors;

  const { data, setData, post, processing, errors } = useForm({
    donor_id: null,
    hospital_name: "",
    blood_type: "",
    quantity: "",
    city_id: "",
    location: "",
    urgency_level: "",
  });

  console.log(data)

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
                                <Button
                                  onClick={() => setData("donor_id", donor.id)}
                                >
                                  Request Donation
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                {user ? (
                                  session ? (
                                    session.id == donor.id ? (
                                      <div
                                        className={`font-medium mx-auto py-4 ${session.type}`}
                                      >
                                        {session.message}
                                      </div>
                                    ) : (
                                      <ScrollArea className="h-[300px]">
                                        <div className="font-medium mx-auto py-4">
                                          Are you sur you want to request blood?
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-10">
                                          <div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="hospital_name">
                                                Hospital Name
                                                <span className="text-primary">
                                                  *
                                                </span>
                                              </Label>
                                              <Input
                                                id="hospital_name"
                                                type="text"
                                                name="hospital_name"
                                                value={data.hospital_name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                onChange={(e) => {
                                                  setData(
                                                    "hospital_name",
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                              <InputError
                                                message={errors.hospital_name}
                                              />
                                              <InputError
                                                message={errors.donor_id}
                                              />
                                            </div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="city">City</Label>
                                              <Select
                                                value={data.city_id}
                                                onValueChange={(value) =>
                                                  setData("city_id", value)
                                                }
                                                className="ml-auto "
                                              >
                                                <SelectTrigger>
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
                                              <InputError
                                                message={errors.city_id}
                                                className="mt-2"
                                              />
                                            </div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="location">
                                                location
                                              </Label>
                                              <Input
                                                id="location"
                                                type="text"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                onChange={(e) =>
                                                  setData(
                                                    "location",
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              <InputError
                                                message={errors.location}
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="blood_type">
                                                Blood Type
                                                <span className="text-primary">
                                                  *
                                                </span>
                                              </Label>
                                              <Select
                                                name="blood_type"
                                                id="blood_type"
                                                value={data.blood_type}
                                                onValueChange={(value) =>
                                                  setData("blood_type", value)
                                                }
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select Blood Type">
                                                    {data.blood_type}
                                                  </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectGroup>
                                                    {bloodTypes.map(
                                                      (bloodType) => (
                                                        <SelectItem
                                                          key={bloodType.name}
                                                          value={bloodType.name}
                                                        >
                                                          {bloodType.name}
                                                        </SelectItem>
                                                      )
                                                    )}
                                                  </SelectGroup>
                                                </SelectContent>
                                              </Select>
                                              <InputError
                                                message={errors.blood_type}
                                                className="mt-2"
                                              />
                                            </div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="quantity">
                                                Quantity
                                                <span className="text-primary">
                                                  *
                                                </span>
                                              </Label>
                                              <Input
                                                id="quantity"
                                                type="number"
                                                name="quantity"
                                                value={data.quantity}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                onChange={(e) =>
                                                  setData(
                                                    "quantity",
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              <InputError
                                                message={errors.quantity}
                                              />
                                            </div>
                                            <div className="grid gap-2 mb-4">
                                              <Label htmlFor="urgency_level">
                                                Urgency
                                                <span className="text-primary">
                                                  *
                                                </span>
                                              </Label>
                                              <Select
                                                name="urgency_level"
                                                id="urgency_level"
                                                value={data.urgency_level}
                                                onValueChange={(value) =>
                                                  setData(
                                                    "urgency_level",
                                                    value
                                                  )
                                                }
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select Your urgency_level">
                                                    {data.urgency_level}
                                                  </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectGroup>
                                                    <SelectItem value="normal">
                                                      normal
                                                    </SelectItem>
                                                    <SelectItem value="urgent">
                                                      Urgent
                                                    </SelectItem>
                                                  </SelectGroup>
                                                </SelectContent>
                                              </Select>
                                              <InputError
                                                message={errors.urgency_level}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    )
                                  ) : (
                                    <ScrollArea className="h-[300px]">
                                      <div className="font-medium mx-auto py-4">
                                        Are you sur you want to request blood?
                                      </div>
                                      <div className="grid md:grid-cols-2 gap-10">
                                        <div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="hospital_name">
                                              Hospital Name
                                              <span className="text-primary">
                                                *
                                              </span>
                                            </Label>
                                            <Input
                                              id="hospital_name"
                                              type="text"
                                              name="hospital_name"
                                              value={data.hospital_name}
                                              className="mt-1 block w-full"
                                              autoComplete="name"
                                              onChange={(e) => {
                                                setData(
                                                  "hospital_name",
                                                  e.target.value
                                                );
                                              }}
                                            />
                                            <InputError
                                              message={errors.hospital_name}
                                            />
                                            <InputError
                                              message={errors.donor_id}
                                            />
                                          </div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="city">City</Label>
                                            <Select
                                              value={data.city_id}
                                              onValueChange={(value) =>
                                                setData("city_id", value)
                                              }
                                              className="ml-auto "
                                            >
                                              <SelectTrigger>
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
                                            <InputError
                                              message={errors.city_id}
                                              className="mt-2"
                                            />
                                          </div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="location">
                                              location
                                            </Label>
                                            <Input
                                              id="location"
                                              type="text"
                                              name="location"
                                              value={data.location}
                                              className="mt-1 block w-full"
                                              autoComplete="name"
                                              onChange={(e) =>
                                                setData(
                                                  "location",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <InputError
                                              message={errors.location}
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="blood_type">
                                              Blood Type
                                              <span className="text-primary">
                                                *
                                              </span>
                                            </Label>
                                            <Select
                                              name="blood_type"
                                              id="blood_type"
                                              value={data.blood_type}
                                              onValueChange={(value) =>
                                                setData("blood_type", value)
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select Blood Type">
                                                  {data.blood_type}
                                                </SelectValue>
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  {bloodTypes.map(
                                                    (bloodType) => (
                                                      <SelectItem
                                                        key={bloodType.name}
                                                        value={bloodType.name}
                                                      >
                                                        {bloodType.name}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                                            <InputError
                                              message={errors.blood_type}
                                              className="mt-2"
                                            />
                                          </div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="quantity">
                                              Quantity
                                              <span className="text-primary">
                                                *
                                              </span>
                                            </Label>
                                            <Input
                                              id="quantity"
                                              type="number"
                                              name="quantity"
                                              value={data.quantity}
                                              className="mt-1 block w-full"
                                              autoComplete="name"
                                              onChange={(e) =>
                                                setData(
                                                  "quantity",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <InputError
                                              message={errors.quantity}
                                            />
                                          </div>
                                          <div className="grid gap-2 mb-4">
                                            <Label htmlFor="urgency_level">
                                              Urgency
                                              <span className="text-primary">
                                                *
                                              </span>
                                            </Label>
                                            <Select
                                              name="urgency_level"
                                              id="urgency_level"
                                              value={data.urgency_level}
                                              onValueChange={(value) =>
                                                setData("urgency_level", value)
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select Your urgency_level">
                                                  {data.urgency_level}
                                                </SelectValue>
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  <SelectItem value="normal">
                                                    normal
                                                  </SelectItem>
                                                  <SelectItem value="urgent">
                                                    Urgent
                                                  </SelectItem>
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                                            <InputError
                                              message={errors.urgency_level}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  )
                                ) : (
                                  <div className="font-medium mx-auto py-4">
                                    You must login to request blood
                                  </div>
                                )}
                                <DialogFooter className="mx-auto">
                                  {user ? (
                                    session ? (
                                      session.id == donor.id ? (
                                        ""
                                      ) : (
                                        <Button
                                          disabled={processing}
                                          onClick={() =>
                                            post(route("donationRequests.store"))
                                          }
                                        >
                                          Request
                                        </Button>
                                      )
                                    ) : (
                                      <Button
                                        disabled={processing}
                                        onClick={() =>
                                          post(route("donationRequests.store"))
                                        }
                                      >
                                        Request
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
