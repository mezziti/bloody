import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "mazen",
        age: "20",
        type: "Recipient",
        gender: "male",
        blood_type: "A+",
        phone1: "0660000000",
        phone2: "0660000000",
        city_id: "1",
        address: "",
        email: "m@sdsm.com",
        password: "azerty555",
        last_donation_date: "2024-04-01",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <form onSubmit={submit}>
            <Head title="Register" />
            <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-4 md:px-6">
                <div className="w-full max-w-[400px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter your information below to create your account
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                name="age"
                                value={data.age}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => setData("age", e.target.value)}
                            />
                            <InputError message={errors.age} className="mt-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className="inline-block">Account Type : </Label>
                            <RadioGroup defaultValue="Recipient" className="inline-block" >
                                <div className="inline-block px-8 items-center space-x-2">
                                    <RadioGroupItem value="Donor" id="r1" />
                                    <Label htmlFor="r1">Donor</Label>
                                </div>
                                <div className="inline-block items-center space-x-2">
                                    <RadioGroupItem value="Recipient" id="r2" />
                                    <Label htmlFor="r2">Recipient</Label>
                                </div>
                            </RadioGroup>
                            <Select
                                name="type"
                                id="type"
                                value={data.type}
                                onValueChange={(value) =>
                                    setData("type", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue>{data.type}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Donor">
                                            Donor
                                        </SelectItem>
                                        <SelectItem value="Recipient">
                                            Recipient
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone2">phone2</Label>
                            <Input
                                id="phone2"
                                type="string"
                                name="phone2"
                                value={data.phone2}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("phone2", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone2}
                                className="mt-2"
                            />
                        </div>

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
                        <Button disabled={processing} className="w-full">
                            Register
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link className="underline" href={route("login")}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
