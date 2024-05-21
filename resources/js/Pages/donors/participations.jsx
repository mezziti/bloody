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

const index = ({ auth, participant, cities }) => {
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  let participations = participant.participations;

  participations = city
    ? participant.participations.filter((post) => post.city_id == city)
    : participant.participations;

  participations = status
    ? participations.filter((post) => post.pivot.status == status)
    : participations;

  return (
    <>
      <Head title="My posts" />
      <Authenticated user={auth.user} pageName={"All posts"}>
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
                      <h3 className="text-sm font-semibold">City</h3>
                      <div className="grid gap-2">
                        <Select
                          value={city}
                          onValueChange={(value) => setCity(value)}
                          className="ml-auto "
                        >
                          <SelectTrigger className="">
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
                      </div>
                    </div>
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
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectGroup>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      className="mx-auto"
                      onClick={() => {
                        setCity("");
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
                setCity("");
                setStatus("");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="mt-4">
          {participations.length > 0 ? (
            <>
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto">
                  <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="overflow-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Drive Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                              City
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Message
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {participations.map((p) => (
                            <tr
                              key={p.id}
                              className="border-b dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {/* <Link href={route('drives.show', p.id)}> */}
                                {p.name}
                                {/* </Link> */}
                              </th>
                              <td className="px-4 py-3">
                                {
                                  cities.filter((c) => p.city_id == c.id)[0]
                                    .name
                                }
                              </td>
                              <td className="px-4 py-3">
                                {p.pivot.status == "approved" ? (
                                  <Badge
                                    className={
                                      "bg-green-500 hover:bg-green-500"
                                    }
                                  >
                                    Approved
                                  </Badge>
                                ) : p.pivot.status == "pending" ? (
                                  <Badge
                                    className={"bg-orange-500 hover:bg-orange-500"}
                                  >
                                    Pending
                                  </Badge>
                                ) : (
                                  <Badge
                                    className={"bg-red-500 hover:bg-red-500"}
                                  >
                                    Rejected
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3">{p.pivot.message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">
                No posts found.
              </p>
            </div>
          )}
        </div>
      </Authenticated>
    </>
  );
};

export default index;
