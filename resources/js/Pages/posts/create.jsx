import { Head, useForm, Link } from "@inertiajs/react";
import { Authenticated } from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";

const index = ({ auth, cities }) => {

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
  
  const [city, setCity] = useState("");
  const selectedCity = city ? cities.filter((c) => c.name === city) : "";

  useEffect(() => {
    selectedCity ? setData("city_id", selectedCity[0].id + "") : "";
  }, [city]);

  const { data, setData, post, processing, errors } = useForm({
    hospital_name: "",
    blood_type: "",
    quantity: "",
    status: "",
    urgency_level: "",
    city_id: "",
    location: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("posts.store"));
  };

  

  return (
    <>
      <Head title="Create post" />
      <Authenticated user={auth.user} pageName={"Create New post"}>
        <form onSubmit={submit}>
          <div className="bg-white rounded-lg">
            <div className="grid gap-4 p-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="hospital_name">Hospital Name</Label>
                  <Input
                    id="hospital_name"
                    type="text"
                    name="hospital_name"
                    value={data.hospital_name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("hospital_name", e.target.value)}
                  />
                  <InputError message={errors.hospital_name} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={city}
                    onValueChange={(value) => setCity(value)}
                    className="ml-auto "
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className="">
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
                  <InputError message={errors.city_id} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={data.location}
                    className="mt-1 block w-full"
                    autoComplete="location"
                    onChange={(e) => setData("location", e.target.value)}
                  />
                  <InputError message={errors.location} className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={data.quantity}
                    className="mt-1 block w-full"
                    autoComplete="quantity"
                    onChange={(e) => setData("quantity", e.target.value)}
                  />
                  <InputError message={errors.quantity} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="blood_type">Blood Type</Label>
                  <Select
                    id="blood_type"
                    name="blood_type"
                    value={data.blood_type}
                    onValueChange={(value) => setData("blood_type", value)}
                    className="ml-auto "
                  >
                    <SelectTrigger className="">
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
                  <InputError message={errors.blood_type} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="urgency_level">Urgency</Label>
                  <Select
                    value={data.urgency_level}
                    onValueChange={(value) => setData("urgency_level", value)}
                    className="ml-auto "
                  >
                    <SelectTrigger className="">
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
                  <InputError message={errors.urgency_level} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setData("status", value)}
                    className="ml-auto "
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <ScrollArea className="max-h-40 z-10">
                        <SelectGroup>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.status} className="mt-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button disabled={processing} className="w-20">
                  Create
                </Button>
                <Link
                  className="w-auto px-5 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href={route("posts.index")}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Authenticated>
    </>
  );
};

export default index;


