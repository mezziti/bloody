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

const index = ({ auth, cities }) => {

  const [begin_date, setBeginDate] = useState()
  const [end_date, setEndDate] = useState();
  const [city, setCity] = useState("");
  const selectedCity = city ? cities.filter((c) => c.name === city) : "";

  useEffect(() => {
    selectedCity ? setData("city_id", selectedCity[0].id + "") : "";
  }, [city]);

  useEffect(() => {
    begin_date ? setData("begin_date", format(begin_date, "yyyy-MM-dd")) : "";
  }, [begin_date]);

  useEffect(() => {
    end_date
      ? setData("end_date", format(end_date, "yyyy-MM-dd"))
      : "";
  }, [end_date]);

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    location: "",
    begin_date: "",
    end_date: "",
    city_id: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("drives.store"));
  };

  const user = auth.user
  const now = new Date();

  

  return (
    <>
      <Head title="Create Drive" />
      <Authenticated user={auth.user} pageName={"Create New Drive"}>
        <form onSubmit={submit}>
          <div className="bg-white rounded-lg">
            <div className="grid gap-4 p-5">
              <div className="grid md:grid-cols-3 gap-4">
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
              <div className="grid md:grid-cols-3 gap-4">
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
                <div className="grid gap-2">
                  <Label htmlFor="begin_date">Begin Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !begin_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {begin_date ? (
                          format(begin_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={begin_date}
                        onSelect={setBeginDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <InputError message={errors.begin_date} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !end_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {end_date ? (
                          format(end_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={end_date}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <InputError message={errors.begin_date} className="mt-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  className="w-auto px-5 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href={route("drives.index")}
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


