import { Head, Link, useForm } from "@inertiajs/react";
import { Authenticated } from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
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
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useEffect, useState } from "react";

const show = ({ auth, post }) => {
  
  const [id, setId] = useState("");

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
      put(route("donations.update", id));
    }
  }, [data.status, id]);

  console.log(post);
  console.log(id);

  return (
    <Authenticated user={auth.user} pageName={"All Donations"}>
      <Head title="All Donations" />
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <Badge
            className={
              post.urgency_level == "normal"
                ? "bg-green-500 text-sm hover:bg-green-500"
                : "bg-red-500 text-sm hover:bg-red-500"
            }
          >
            {post.urgency_level}
          </Badge>
          <span className="bg-red-100 text-red-800 text-xs sm:text-lg font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">{`Blood Type: ${post.blood_type}`}</span>
        </div>
        <h2 className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hospital Name: {post.hospital_name}
        </h2>
        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {/* City: {post.city.name} */}
        </h2>
        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Location: {post.location}
        </h2>
        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Quantity: {post.quantity}
        </h2>
        <div className="mt-4">
          {post.donors.length > 0 ? (
            <section className=" dark:bg-gray-900">
              <div className="mx-auto">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="overflow-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Gender
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Blood Type
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Phone 1
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Phone 2
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Last Donation
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
                        {post.donors.map((donor) => (
                          <tr
                            key={donor.id}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link href={route("donors.show", donor.id)}>
                                {donor.name}
                              </Link>
                            </th>
                            <td className="px-4 py-3">{donor.gender}</td>
                            <td className="px-4 py-3">{donor.blood_type}</td>
                            <td className="px-4 py-3 text-nowrap">
                              {donor.phone1}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donor.phone2}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donor.last_donation_date.split(" ")[0]}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {donor.pivot.status == "pending" ? (
                                <Badge
                                  className={
                                    "bg-orange-500 hover:bg-orange-500"
                                  }
                                >
                                  Pending
                                </Badge>
                              ) : donor.pivot.status == "approved" ? (
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
                            <td className="px-4 py-3 flex items-center justify-end">
                              {donor.pivot.status == "pending" && (
                                <div className="flex gap-2">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Button disabled={processing}>
                                        Approve
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        Approve
                                      </AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to Approve this
                                        donor?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handelApprove(donor.pivot.id)
                                          }
                                        >
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Button
                                        variant="outline"
                                        disabled={processing}
                                      >
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogTitle>
                                        Are you sure you want to reject this
                                        donor?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. <br />
                                        <br />
                                        <Label htmlFor="message">
                                          Reject Message:
                                        </Label>
                                        <Textarea
                                          id="message"
                                          type="text"
                                          name="message"
                                          value={data.message}
                                          className="mt-1 block w-full"
                                          autoComplete="message"
                                          onChange={(e) =>
                                            setData("message", e.target.value)
                                          }
                                        />
                                      </AlertDialogDescription>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handelReject(donor.pivot.id)
                                          }
                                        >
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
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
                No Donations found.
              </p>
            </div>
          )}
        </div>
      </article>
    </Authenticated>
  );
};

export default show;
