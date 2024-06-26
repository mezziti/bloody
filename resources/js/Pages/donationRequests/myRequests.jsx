import { Head, Link, useForm } from "@inertiajs/react";
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
import { useEffect, useState } from "react";

const index = ({ auth, donationRequests, cities }) => {
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const donationRequestsData = donationRequests.data
    .filter((req) => !city || req.city_id == city)
    .filter((req) => !status || req.status == status);

  const { data, setData, put, processing } = useForm({
    status: "",
    message: "",
  });

  const handelApprove = (id) => {
    setId(id);
    setData("status", "approved");
  };
  const handelReject = (id) => {
    setId(id);
    if (data.message == "") setData("message", "Rejected by the blood bank");
    setData("status", "rejected");
  };

  useEffect(() => {
    if (data.status) {
      put(route("donationRequests.update", id));
    }
  }, [data.status, id]);

  console.log(donationRequests);

  return (
    <>
      <Head title="Blood Requests" />
      <Authenticated user={auth.user} pageName={"All Requests"}>
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
                                <SelectItem value="approved">
                                  Approved
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="rejected">
                                  Rejected
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
        </div>
        <div className="mt-4">
          {donationRequestsData.length > 0 ? (
            <section className=" dark:bg-gray-900">
              <div className="mx-auto">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Donor Name
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Hospital Name
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Blood Type
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Qt.
                          </th>
                          <th scope="col" className="px-4 py-3">
                            City
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Location
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Donation Date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Urgency
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {donationRequestsData.map((donationRequest) => (
                          <tr
                            key={donationRequest.id}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link
                                href={route(
                                  "donors.show",
                                  donationRequest.donor.id
                                )}
                              >
                                {donationRequest.donor.name}
                              </Link>
                            </th>
                            <td className="px-4 py-3">
                              {donationRequest.hospital_name}
                            </td>
                            <td className="px-4 py-3">
                              {donationRequest.blood_type}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.quantity}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.city.name}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.location}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.donation_date ? donationRequest.donation_date.split(' ')[0]: ''}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.urgency_level == "normale" ? (
                                <Badge
                                  className={"bg-green-500 hover:bg-green-500"}
                                >
                                  Normale
                                </Badge>
                              ) : (
                                <Badge
                                  className={"bg-red-500 hover:bg-red-500"}
                                >
                                  Urgent
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donationRequest.status == "pending" ? (
                                <Badge
                                  className={
                                    "bg-orange-500 hover:bg-orange-500"
                                  }
                                >
                                  Pending
                                </Badge>
                              ) : donationRequest.status == "approved" ? (
                                <Badge
                                  className={"bg-green-500 hover:bg-green-500"}
                                >
                                  Approved
                                </Badge>
                              ) : (
                                <Badge
                                  className={"bg-red-500 hover:bg-red-500"}
                                >
                                  Rejected
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">
                No donation requests found.
              </p>
            </div>
          )}
        </div>
      </Authenticated>
    </>
  );
};

export default index;
