import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Guest from "@/Layouts/GuestLayout";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Guest>
      <Head title="Log in" />
      <form onSubmit={submit}>
        {/* <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="email"
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href={route("password.request")}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>
            <Button disabled={processing} className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline" href={route("register")}>
              Register
            </Link>
          </div>
        </div>
      </div> */}

        <div className=" bg-gray-100 flex flex-col items-center justify-center h-full py-12 px-4 space-y-4 md:px-6">
          <Card className="mx-auto max-w-[500px]">
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>
                Enter your information to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="grid md:grid-cols-2 gap-10"> */}
              <div className="grid gap-2 mb-4">
                <Label htmlFor="email">
                  Email<span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="email"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} />
              </div>
              <div className="grid gap-2 mb-4">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Password<span className="text-primary">*</span>
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="current-password"
                  onChange={(e) => setData("password", e.target.value)}
                />

                <InputError message={errors.password} />
              </div>
              {/* </div> */}
              <div className="mt-4 text-center items-center text-sm">
                <Button disabled={processing} className="w-20 block">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link className="underline" href={route("register")}>
                  Register
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Guest>
  );
}
