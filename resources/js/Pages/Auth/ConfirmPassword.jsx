import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <form onSubmit={submit}>
            <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
                <div className="w-full max-w-[400px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Confirm Password</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
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
                        <Button disabled={processing} className="w-full">Confirm Password</Button>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
