import { Head, Link, router, useForm } from "@inertiajs/react";
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

const show = ({ auth, drive }) => {

  const { data, setData, put, processing } = useForm({
    message: "",
  });

  const handelReject = (id) => {
    if (data.message == "") setData("message", "Rejected by the organizer");
    put(route("reject", id));
  };

  return (
    <Authenticated user={auth.user} pageName={"All participiats"}>
      <Head title="My participiats" />
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          {drive.status == "upcoming" ? (
            <Badge className={"bg-orange-500 hover:bg-orange-500"}>
              Upcoming
            </Badge>
          ) : drive.status == "active" ? (
            <Badge className={"bg-green-500 hover:bg-green-500"}>Active</Badge>
          ) : (
            ""
          )}
          <span className="bg-red-100 text-red-800 text-xs sm:text-lg font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">
            {`From : ${drive.begin_date.split(" ")[0]}`} <br />
          </span>
          <span className="bg-red-100 text-red-800 text-xs sm:text-lg font-medium px-2.5 py-0.5 rounded-lg dark:bg-red-200 dark:text-red-800">
            {`To : ${drive.end_date.split(" ")[0]}`}
          </span>
        </div>
        <h2 className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Drive Name: {drive.name}
        </h2>
        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          City: {drive.city.name}
        </h2>
        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Location: {drive.location}
        </h2>
        <div className="mt-4">
          {drive.participants.length > 0 ? (
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
                        {drive.participants.map((participant) => (
                          <tr
                            key={participant.id}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link href={route("donors.show", participant.id)}>
                                {participant.name}
                              </Link>
                            </th>
                            <td className="px-4 py-3">{participant.gender}</td>
                            <td className="px-4 py-3">
                              {participant.blood_type}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participant.phone1}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participant.phone2}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participant.last_donation_date.split(" ")[0]}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participant.pivot.status == "pending" ? (
                                <Badge
                                  className={
                                    "bg-orange-500 hover:bg-orange-500"
                                  }
                                >
                                  Pending
                                </Badge>
                              ) : participant.pivot.status == "approved" ? (
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
                              {participant.pivot.status =='pending' && <div className="flex gap-2">
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
                                      participant?
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
                                          put(
                                            route(
                                              "approve",
                                              participant.pivot.id
                                            )
                                          )
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
                                      participant?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. <br /><br />
                                      <Label htmlFor="message">Reject Message:</Label>
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
                                          handelReject(
                                            participant.pivot.id
                                          )
                                        }
                                      >
                                        Reject
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>}
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
                No participiats found.
              </p>
            </div>
          )}
        </div>
      </article>
    </Authenticated>
  );
};

export default show;
