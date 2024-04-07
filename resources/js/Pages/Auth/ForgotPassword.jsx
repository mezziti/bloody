import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <form onSubmit={submit}>
            <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
                <div className="w-full max-w-[400px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Forgot your password?</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                        No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
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
                        <Button disabled={processing} className="w-full">Email Password Reset Link</Button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
