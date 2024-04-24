import { Head, useForm, Link } from "@inertiajs/react";
import { Authenticated } from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Badge } from "@/Components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";

const index = ({ auth, cities }) => {

  
  const [city, setCity] = useState("");

  const { data, setData, post, put, processing, errors } = useForm({
    name: "",
    description: "",
    city: "",
    location: "",
    begin_date: "",
    end_date: "",
    city: city,
  });

  const createDrive = (e) => {
    e.preventDefault();

    put(route("drives.store"));
  };

  const updateDrive = (e) => {
    e.preventDefault();

    put(route("drives.update"));
  };

  const user = auth.user
  const now = new Date();

  

  return (
    <>
      <Head title="My Drives" />
      <Authenticated user={auth.user} pageName={"All Drives"}>
        <div className="">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
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
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={data.location}
                  className="mt-1 block w-full"
                  autoComplete="location"
                  onChange={(e) => setData("location", e.target.value)}
                />
                <InputError message={errors.location} className="mt-2" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={data.description}
                className="mt-1 block w-full"
                autoComplete="description"
                onChange={(e) => setData("description", e.target.value)}
              />
              <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={data.location}
                  className="mt-1 block w-full"
                  autoComplete="location"
                  onChange={(e) => setData("location", e.target.value)}
                />
                <InputError message={errors.location} className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
};

export default index;


