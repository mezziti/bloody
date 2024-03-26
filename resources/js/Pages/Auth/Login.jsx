import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";

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

        <form onSubmit={submit}>

            <Head title="Log in" />
            <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    className="ml-auto inline-block text-sm underline"
                                    href="#"
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
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <Button disabled={processing} className="w-full">Login</Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?
                        <Link className="underline" href="#">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
