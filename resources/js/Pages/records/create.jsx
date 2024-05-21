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
import { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";

const index = ({ auth, record, donors, drives }) => {

  const [donation_date, setDonationDate] = useState();
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

  useEffect(() => {
    donation_date ? setData("donation_date", format(donation_date, "yyyy-MM-dd")) : "";
  }, [donation_date]);

  const { data, setData, post, processing, errors } = useForm({
    donor_id: "",
    drive_id: "",
    donation_date: "",
    blood_type: "",
    description: "",
  });
  
  donors = donors.map((donor) => ({
    ...donor,
    id: donor.id.toString(),
  }));
  
  drives = drives.map((drive) => ({
    ...drive,
    id: drive.id.toString(),
  }));

  const submit = (e) => {
    e.preventDefault();

    post(route("records.store"));
  };

  console.log(data)

  

  return (
    <>
      <Head title="Create Drive" />
      <Authenticated user={auth.user} pageName={"Create New Drive"}>
        <form onSubmit={submit}>
          <div className="bg-white rounded-lg">
            <div className="grid gap-4 p-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="donor">donor</Label>
                  <Select onValueChange={(value) => setData("donor_id", value)}>
                    <SelectTrigger className="ml-auto ">
                      <SelectValue placeholder="Select donor" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <ScrollArea className="max-h-40 z-10">
                        <SelectGroup>
                          {donors.map((donor) => (
                            <SelectItem key={donor.id} value={donor.id}>
                              {donor.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.donor_id} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="drive">drive</Label>
                  <Select onValueChange={(value) => setData("drive_id", value)}>
                    <SelectTrigger className="ml-auto ">
                      <SelectValue placeholder="Select drive" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <ScrollArea className="max-h-40 z-10">
                        <SelectGroup>
                          {drives.map((drive) => (
                            <SelectItem key={drive.id} value={drive.id}>
                              {drive.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.drive_id} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="donation_date">Donation Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !donation_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {donation_date ? (
                          format(donation_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={donation_date}
                        onSelect={setDonationDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <InputError message={errors.donation_date} className="mt-2" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
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
              </div>
              <div className="flex gap-2">
                <Link
                  className="w-auto px-5 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href={route("records.index")}
                >
                  Cancel
                </Link>
                <Button disabled={processing} className="w-20">
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Authenticated>
    </>
  );
};

export default index;


