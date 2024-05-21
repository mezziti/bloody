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

const index = ({ auth, posts, cities }) => {

  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  let postsData = posts.data;

  postsData = city
    ? posts.data.filter((post) => post.city_id == city)
    : posts.data;

  postsData = status
    ? postsData.filter((post) => post.status == status)
    : postsData;

  const handleDelete = (post) => {
    router.delete(route("posts.destroy", post));
  };

  console.log(city);

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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
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
          <Link
            className="bg-primary w-auto px-5 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href={route("posts.create")}
          >
            Create post
          </Link>
        </div>
        <div className="mt-4">
          {postsData.length > 0 ? (
            <>
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto">
                  <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="overflow-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Hospital Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Blood Type
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Qt.
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Urgency
                            </th>
                            <th scope="col" className="px-4 py-3">
                              City
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Location
                            </th>
                            <th scope="col" className="px-4 py-3 text-end">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {postsData.map((p) => (
                            <tr
                              key={p.id}
                              className="border-b dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <Link href={route("posts.show", p)}>
                                  {p.hospital_name}
                                </Link>
                              </th>
                              <td className="px-4 py-3">{p.blood_type}</td>
                              <td className="px-4 py-3">
                                {p.status == "active" ? (
                                  <Badge
                                    className={
                                      "bg-green-500 hover:bg-green-500"
                                    }
                                  >
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge
                                    className={"bg-red-500 hover:bg-red-500"}
                                  >
                                    Inactive
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-nowrap">
                                {p.quantity}
                              </td>
                              <td className="px-4 py-3 text-nowrap">
                                {p.urgency_level == "normal" ? (
                                  <Badge
                                    className={
                                      "bg-green-500 hover:bg-green-500"
                                    }
                                  >
                                    Normal
                                  </Badge>
                                ) : (
                                  <Badge
                                    className={"bg-red-500 hover:bg-red-500"}
                                  >
                                    Urgent
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3">{p.city.name}</td>
                              <td className="px-4 py-3">{p.location}</td>
                              <td className="px-4 py-3 flex items-center justify-end">
                                <div className="flex gap-2">
                                  <Link
                                    className="w-auto px-5 py-[10px] border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                    href={route("posts.edit", p)}
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
                                          This action cannot be undone. This
                                          will permanently delete this post and
                                          remove it from our servers.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={(e) => handleDelete(p)}
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
                        <Paginate links={posts.links} />
                      </div>
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
