import { useRef } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

export default function UpdatePasswordForm({ className = "" }) {

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
        }

        if (errors.current_password) {
          reset("current_password");
        }
      },
    });
  };

  return (
    <section className={className}>
      {recentlySuccessful && (
        <Alert variant="success">
          <AlertTitle>Password updated!</AlertTitle>
        </Alert>
      )}
      <header>
        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="current_password">Current Password</Label>
          </div>
          <Input
            id="current_password"
            type="password"
            name="current_password"
            value={data.current_password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("current_password", e.target.value)}
          />

          <InputError message={errors.current_password} className="mt-2" />
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
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password_confirmation">Password Confirmation</Label>
          </div>
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={processing}>Update</Button>
        </div>
      </form>
    </section>
  );
}
