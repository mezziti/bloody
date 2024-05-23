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
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";

const index = ({ auth, bag, records }) => {
  
  bag.donation_record_id = bag.donation_record_id.toString();

  const [expiration_date, setExpirationDate] = useState(
    bag.expiration_date
  );

  useEffect(() => {
    expiration_date
      ? setData("expiration_date", format(expiration_date, "yyyy-MM-dd"))
      : "";
  }, [expiration_date]);

  const { data, setData, put, processing, errors } = useForm({
    bag_code: bag.bag_code,
    donation_record_id: bag.donation_record_id,
    expiration_date: bag.expiration_date,
    storage_location: bag.storage_location,
    status: bag.status,
    description: bag.description,
  });

  records = records.map((record) => ({
    ...record,
    id: record.id.toString(),
  }));

  const submit = (e) => {
    e.preventDefault();

    put(route("bags.update", bag.id));
  };

  console.log(bag);

  return (
    <>
      <Head title="Edit Bag" />
      <Authenticated user={auth.user} pageName={"Edit Bag"}>
        <form onSubmit={submit}>
          <div className="bg-white rounded-lg">
            <div className="grid gap-4 p-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bag_code">Bag Code</Label>
                  <Input
                    id="bag_code"
                    type="text"
                    name="bag_code"
                    value={data.bag_code}
                    className="mt-1 block w-full"
                    autoComplete="bag_code"
                    onChange={(e) => setData("bag_code", e.target.value)}
                  />
                  <InputError message={errors.bag_code} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="donation_record_id">Record Id</Label>
                  <Select
                    value={data.donation_record_id}
                    onValueChange={(value) => setData("donation_record_id", value)}
                  >
                    <SelectTrigger className="ml-auto ">
                      <SelectValue placeholder="Select Record Id" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <ScrollArea className="max-h-40 z-10">
                        <SelectGroup>
                          {records.map((record) => (
                            <SelectItem key={record.id} value={record.id}>
                              {record.id}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.donation_record_id} className="mt-2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiration_date">Expiration Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !expiration_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiration_date ? (
                          format(expiration_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={expiration_date}
                        onSelect={setExpirationDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <InputError
                    message={errors.expiration_date}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storage_location">Storage Location</Label>
                  <Input
                    id="storage_location"
                    type="text"
                    name="storage_location"
                    value={data.storage_location}
                    className="mt-1 block w-full"
                    autoComplete="storage_location"
                    onChange={(e) =>
                      setData("storage_location", e.target.value)
                    }
                  />
                  <InputError
                    message={errors.storage_location}
                    className="mt-2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    id="status"
                    name="status"
                    value={data.status}
                    onValueChange={(value) => setData("status", value)}
                    className="ml-auto "
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <ScrollArea className="h-40">
                        <SelectGroup>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">
                            Unavailable
                          </SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.status} className="mt-2" />
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
                  href={route("bags.index")}
                >
                  Cancel
                </Link>
                <Button disabled={processing} className="w-20">
                  Edit
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
