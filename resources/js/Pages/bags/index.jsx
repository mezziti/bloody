import { Head, Link, router } from "@inertiajs/react";
import { Authenticated } from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
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
import Paginate from "@/Components/Paginate";
import { Badge } from "@/Components/ui/badge";

const index = ({ auth, bags }) => {
  const [status, setStatus] = useState("");

  let bagsData = bags.data;

  bagsData = status
    ? bags.data.filter((bag) => bag.status == status)
    : bags.data;

  // console.log(bags);

  return (
    <Authenticated user={auth.user} pageName={"All bags"}>
      <Head title="All bags" />
      <div className="flex w-full gap-2">
        <div className="gap-2 flex">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Filters</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mt-10 mx-auto">Filters</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 mx-auto">
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
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="unavailable">Unavailable</SelectItem>
                              <SelectItem value="reserved">Reserved</SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="mx-auto"
                    onClick={() => {
                      setStatus("");
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button
            className="mx-auto"
            onClick={() => {
              setStatus("");
            }}
          >
            Reset
          </Button>
        </div>
        <Link
          className="bg-primary w-auto px-5 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href={route("bags.create")}
        >
          Create bag
        </Link>
      </div>
      <div className="mt-4">
        {bagsData.length > 0 ? (
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Bag Code
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Record Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Expiration Date
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Storage Location
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3 text-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bagsData.map((bag) => (
                        <tr
                          key={bag.id}
                          className="border-b dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {bag.bag_code}
                          </th>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {bag.record.id}
                          </th>
                          <td className="px-4 py-3 text-nowrap">
                            {bag.expiration_date.split(" ")[0]}
                          </td>
                          <td className="px-4 py-3 text-nowrap">
                            {bag.storage_location}
                          </td>
                          <td className="px-4 py-3">
                            {bag.description && bag.description.length > 30
                              ? bag.description.slice(0, 30) + "..."
                              : bag.description}
                          </td>
                          <td className="px-4 py-3 text-nowrap">
                            {bag.status == "unavailable" ? (
                              <Badge
                                className={"bg-orange-500 hover:bg-orange-500"}
                              >
                                Unavailable
                              </Badge>
                            ) : bag.status == "available" ? (
                              <Badge
                                className={"bg-green-500 hover:bg-green-500"}
                              >
                                Available
                              </Badge>
                            ) : bag.status == "reserved" ? (
                              <Badge
                                className={"bg-amber-500 hover:bg-amber-500"}
                              >
                                Reserved
                              </Badge>
                            ) : (
                              <Badge className={"bg-red-500 hover:bg-red-500"}>
                                Expired
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <div className="flex gap-2">
                              <Link
                                className="w-auto px-5 py-[10px] border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                href={route("bags.edit", bag.id)}
                              >
                                Edit
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button>Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete this bag and remove it
                                      from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        router.delete(
                                          route("bags.destroy", bag.id)
                                        )
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-2">
                    <Paginate links={bags.links} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">No bags found.</p>
          </div>
        )}
      </div>
    </Authenticated>
  );
};

export default index;
