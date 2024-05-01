import { Head, Link, router } from "@inertiajs/react";
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

const show = ({ auth, drive }) => {
  console.log(drive.participants);

  return (
    <Authenticated user={auth.user} pageName={"All participients"}>
      <Head title="My participients" />
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
                        {drive.participants.map((participient) => (
                          <tr
                            key={participient.id}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link
                                href={route("donors.show", participient.id)}
                              >
                                {participient.name}
                              </Link>
                            </th>
                            <td className="px-4 py-3">{participient.gender}</td>
                            <td className="px-4 py-3">
                              {participient.blood_type}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participient.phone1}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participient.phone2}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participient.last_donation_date.split(" ")[0]}
                            </td>
                            <td className="px-4 py-3 text-nowrap">
                              {participient.pivot.status == "pending" ? (
                                <Badge
                                  className={
                                    "bg-orange-500 hover:bg-orange-500"
                                  }
                                >
                                  Pending
                                </Badge>
                              ) : participient.pivot.status == "approved" ? (
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
                              <div className="flex gap-2">
                                <Link
                                  className="w-auto px-5 py-[10px] border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                  href=""
                                >
                                  Reject
                                </Link>
                                <Button onclick={(e) => {}}>Approve</Button>
                              </div>
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
                No participients found.
              </p>
            </div>
          )}
        </div>
      </article>
    </Authenticated>
  );
};

export default show;
