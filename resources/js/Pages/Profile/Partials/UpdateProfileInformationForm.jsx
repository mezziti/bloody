import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
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
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/Components/ui/alert";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
  cities,
}) {


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
  const user = usePage().props.auth.user;

  const [city, setCity] = useState(user.city);
  const selectedCity = city
    ? cities.filter((c) => c.name === city)
    : cities.filter((c) => c.id === user.city_id);
  const [last_donation_date, setDate] = useState(user.last_donation_date);

  useEffect(() => {
    selectedCity ? setData("city_id", selectedCity[0].id + "") : "";
  }, [city]);

  useEffect(() => {
    last_donation_date
      ? setData("last_donation_date", format(last_donation_date, "yyyy-MM-dd"))
      : "";
  }, [last_donation_date]);

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
      gender: user.gender,
      blood_type: user.blood_type,
      phone1: user.phone1,
      phone2: user.phone2,
      city_id: user.city_id,
      address: user.address,
      last_donation_date: user.last_donation_date,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };
  

  return (
    <section className={className}>
      {recentlySuccessful && (
        <Alert variant="success">
          <AlertTitle>Profile info updated!</AlertTitle>
        </Alert>
      )}
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
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
                value={selectedCity[0].name}
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
                    onValueChange={(value) => setData("blood_type", value)}
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
                  <InputError message={errors.blood_type} className="mt-2" />
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
                  <Label htmlFor="last_donation_date">Last Donation Date</Label>
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
          </div>
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-medium text-sm text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button disabled={processing}>Save</Button>
        </div>
      </form>
    </section>
  );
}
