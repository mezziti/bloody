import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Guest from "@/Layouts/GuestLayout";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Register({ cities }) {
  const [city, setCity] = useState();
  const selectedCity = city ? cities.filter((c) => c.name === city) : "";
  const [last_donation_date, setDate] = useState();

  useEffect(() => {
    selectedCity ? setData("city_id", selectedCity[0].id +"") : "";
  }, [city]);

  useEffect(() => {
    last_donation_date
      ? setData("last_donation_date", format(last_donation_date, "yyyy-MM-dd"))
      : "";
  }, [last_donation_date]);

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    age: "",
    role: "recipient",
    gender: "",
    blood_type: "",
    phone1: "",
    phone2: "",
    city_id: "",
    address: "",
    email: "",
    password: "",
    last_donation_date: "",
  });


  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

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

  return (
    <Guest>
      <form onSubmit={submit}>
        <Head title="Register" />
        <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
          <Card className="mx-auto max-w-[500px]">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="role">
                      Account Role<span className="text-primary">*</span>
                    </Label>
                    <Select
                      name="role"
                      id="role"
                      value={data.role}
                      onValueChange={(value) => setData("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue>{data.role}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="recipient">Recipient</SelectItem>
                          <SelectItem value="donor">Donor</SelectItem>
                          <SelectItem value="bank">Bank</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.role} />
                  </div>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="name">
                      {data.role != "bank" ? "Full" : ""} Name
                      <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full"
                      autoComplete="name"
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                  </div>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="city">
                      City<span className="text-primary">*</span>
                    </Label>
                    <Select
                      name="city"
                      id="city"
                      value={city}
                      onValueChange={(value) => setCity(value)}
                      className="ml-auto z-20 sm:z-20"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent className="z-20 sm:z-20">
                        <ScrollArea className="max-h-40 z-10">
                          <SelectGroup>
                            {cities.map((city) => (
                              <SelectItem key={city.id} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.city_id} />
                  </div>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      name="address"
                      value={data.address}
                      className="mt-1 block w-full"
                      autoComplete="name"
                      onChange={(e) => setData("address", e.target.value)}
                    />
                    <InputError message={errors.address} />
                  </div>
                  {data.role != "bank" ? (
                    <>
                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="age">
                          Age<span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          name="age"
                          value={data.age}
                          className="mt-1 block w-full"
                          autoComplete="name"
                          onChange={(e) => setData("age", e.target.value)}
                        />
                        <InputError message={errors.age} />
                      </div>
                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="blood_type">
                          Blood Type<span className="text-primary">*</span>
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
                              {bloodTypes.map((bloodType) => (
                                <SelectItem
                                  key={bloodType.name}
                                  value={bloodType.name}
                                >
                                  {bloodType.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <InputError
                          message={errors.blood_type}
                          className="mt-2"
                        />
                      </div>
                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="gender">
                          Gender<span className="text-primary">*</span>
                        </Label>
                        <Select
                          name="gender"
                          id="gender"
                          value={data.gender}
                          onValueChange={(value) => setData("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Your Gender">
                              {data.gender}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <InputError message={errors.gender} />
                      </div>
                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="last_donation_date">
                          Last Donation Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "justify-start text-left font-normal",
                                !last_donation_date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {last_donation_date ? (
                                format(last_donation_date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={last_donation_date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <InputError
                          message={errors.last_donation_date}
                          className="mt-2"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="phone1">
                      Phone 1<span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="phone1"
                      type="string"
                      name="phone1"
                      value={data.phone1}
                      className="mt-1 block w-full"
                      autoComplete="name"
                      onChange={(e) => setData("phone1", e.target.value)}
                    />
                    <InputError message={errors.phone1} />
                  </div>

                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="phone2">Phone 2</Label>
                    <Input
                      id="phone2"
                      type="string"
                      name="phone2"
                      value={data.phone2}
                      className="mt-1 block w-full"
                      autoComplete="name"
                      onChange={(e) => setData("phone2", e.target.value)}
                    />
                    <InputError message={errors.phone2} />
                  </div>

                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="email">
                      Email<span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full"
                      autoComplete="email"
                      onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} />
                  </div>
                  <div className="grid gap-2 mb-4">
                    <div className="flex items-center">
                      <Label htmlFor="password">
                        Password<span className="text-primary">*</span>
                      </Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full"
                      autoComplete="current-password"
                      onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center items-center text-sm">
                <Button disabled={processing} className="w-20 block">
                  Register
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link className="underline" href={route("login")}>
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Guest>
  );
}
