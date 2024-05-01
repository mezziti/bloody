import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";

const Index = ({ auth, bank }) => {
  const user = auth.user;
  return (
    <Guest user={user}>
      <Head title={"@" + bank.name.split(" ")[0]} />
      <article className="p-6 md:w-1/2 lg:w-1/3 mx-auto mt-20 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-4 text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          bank Name: {bank.name}
        </h2>
        <h2 className="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          City: {bank.city.name}
        </h2>
        <h2 className="mb-2  text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Location: {bank.location}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="my-4  text-md sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"></span>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Request Blood</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                {user ? (
                  <div className="font-medium mx-auto py-4">
                    Are you sur you want to request blood?
                  </div>
                ) : (
                  <div className="font-medium mx-auto py-4">
                    You must login to request blood
                  </div>
                )}
                <DialogFooter className="mx-auto">
                  {user ? (
                    <Link href="/">
                      <Badge className={"rounded-sm text-lg"}>Request</Badge>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Badge className={"rounded-sm text-lg"}>Login</Badge>
                    </Link>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </article>
    </Guest>
  );
};

export default Index;
