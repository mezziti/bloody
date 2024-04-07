import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowUpDownIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {  useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";

const Home = ({ auth, drives, cities }) => {
  const now = new Date();
  drives = drives.filter((drive) => new Date(drive.end_date) > now);
  const user = auth.user;
  // const cities = [
  //   {
  //     'name':'city',
  //     'id':'1',
  //   },
  //   {
  //     'name':'city',
  //     'id':'2',
  //   },
  //   {
  //     'name':'city',
  //     'id':'S',
  //   },
  //   {
  //     'name':'cit899y',
  //     'id':'SS',
  //   },
  //   {
  //     'name':'ci8878ty',
  //     'id':'iSd',
  //   },
  //   {
  //     'name':'789',
  //     'id':'iSSd',
  //   },
  //   {
  //     'name':'45345',
  //     'id':'Sid',
  //   },
  //   {
  //     'name':'city3434',
  //     'id':'SSid',
  //   },
  //   {
  //     'name':'city66',
  //     'id':'idD',
  //   },
  //   {
  //     'name':'city55',
  //     'id':'SiDd',
  //   },
  //   {
  //     'name':'city34',
  //     'id':'iSDDd',
  //   },
  //   {
  //     'name':'city22',
  //     'id':'id',
  //   },
  // ];

  const [city, setCity] = useState('')

  drives = city
    ? drives.filter((drive) => drive.city.id === city)
    : drives;
  return (
    <Guest user={user}>
      <Head title="All Drives" />
      <section className="pl-4 md:pl-6">
        <div className="flex flex-col md:flex-row gap-4 xl:gap-8 max-w-7xl mx-auto items-start">
          {/* <div className="w-full md:w-[300px] order-last md:order-first">
            <div className="hidden md:block">
              <Card className="border-0 shadow-none shrink-0">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Category</h3>
                      <div className="grid gap-2 ml-4">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-shoes" />
                          Shoes
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-tops" />
                          Tops & T-Shirts
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-shorts" />
                          Shorts
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-hoodies" />
                          Hoodies & Pullovers
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Category</h3>
                      <div className="grid gap-2 ml-4">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-shoes" />
                          Shoes
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-tops" />
                          Tops & T-Shirts
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-shorts" />
                          Shorts
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="category-hoodies" />
                          Hoodies & Pullovers
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Gender</h3>
                      <div className="grid gap-2 ml-4">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="gender-male" />
                          Male
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="gender-female" />
                          Female
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="gender-unisex" />
                          Unisex
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Kids</h3>
                      <div className="grid gap-2 ml-4">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="kids-boy" />
                          Boy
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="kids-girl" />
                          Girl
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">Color</h3>
                      <div className="grid gap-2 ml-4">
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="color-black" />
                          Black
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="color-red" />
                          Red
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                          <Checkbox id="color-blue" />
                          Blue
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> */}
          <div className="w-full md:w-full pr-4 pb-4">
            <div className="grid gap-6 md:gap-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="grid gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">
                    All Drives
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Find a blood drive near you
                  </p>
                </div>
                <div className="flex sm:absolute sm:end-10 sm:mt-10 gap-2">
                  <Select
                    value={city}
                    onValueChange={(value) => setCity(value)}
                    className="ml-auto z-20 sm:z-20"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className="z-20 sm:z-20">
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
                  <Button onClick={() => setCity("")}>reset</Button>
                </div>
              </div>
              <div>
                {drives.length != 0 ? (
                  drives.map((drive) => (
                    <div
                      key={drive.id}
                      className="items-center justify-between my-2 w-full sm:flex bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="w-full">
                        {new Date(drive.begin_date) > now ? (
                          <Badge
                            className={
                              "absolute end-5 mt-1 bg-orange-500 hover:bg-orange-500"
                            }
                          >
                            Upcoming
                          </Badge>
                        ) : new Date(drive.end_date) < now ? (
                          <Badge
                            className={
                              "absolute end-5 mt-1 bg-red-500 hover:bg-red-500"
                            }
                          >
                            Ended
                          </Badge>
                        ) : (
                          <Badge
                            className={
                              "absolute end-5 mt-1 bg-green-500 hover:bg-green-500"
                            }
                          >
                            Active
                          </Badge>
                        )}
                        <div className="flex w-full flex-col justify-between bg-white border border-gray-200 rounded-lg shadow sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <Link className="flex w-full flex-col sm:flex-row">
                            <img
                              className="object-cover sm:w-[150px] w-full rounded-t-lg md:rounded-none md:rounded-s-lg"
                              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                              alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {drive.name}
                              </h5>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {drive.description.length > 100
                                  ? drive.description.slice(0, 100) + "..."
                                  : drive.description}
                              </p>
                              <div className="flex-row sm:flex">
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  {`Organized by : ${drive.bloodBank.name}`}
                                </h5>
                                <span className="mx-4 sm:my-0"></span>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  {`At : ${drive.city.name} - ${drive.location}`}
                                </h5>
                                <span className="mx-4 sm:my-0"></span>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  {`From : ${drive.begin_date.split(" ")[0]}`}
                                </h5>
                                <span className="mx-4 sm:my-0"></span>
                                <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                  {`To : ${drive.end_date.split(" ")[0]}`}
                                </h5>
                              </div>
                            </div>
                          </Link>
                          <div className="items-center sm:pt-6 ">
                            {new Date(drive.end_date) > now ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="m-5">Participate</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  {user ? (
                                    <div className="font-medium mx-auto py-4">
                                      Are you sur you want to participate?
                                    </div>
                                  ) : (
                                    <div className="font-medium mx-auto py-4">
                                      You must login to participate
                                    </div>
                                  )}
                                  <DialogFooter className="mx-auto">
                                    {user ? (
                                      <Link href="/">
                                        <Badge className={"rounded-sm text-lg"}>
                                          Participate
                                        </Badge>
                                      </Link>
                                    ) : (
                                      <Link href="/login">
                                        <Badge className={"rounded-sm text-lg"}>
                                          Login
                                        </Badge>
                                      </Link>
                                    )}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      No drives found{city ? ` for the selected city` : ""}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default Home;
