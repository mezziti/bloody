import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const Home = ({ auth, donors }) => {
    return (
        <Guest user={auth.user}>
            <Head title="Donors List" />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Donors List
                        </h2>
                        <p className="font-normal text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                            Explore the drives and find the one that suits your
                            ability and preferences.
                        </p>
                    </div>
                    <div className="flex">
                        <div className="w-1/4 hidden bg-red-400 lg:flex">
                            hjhohyoij
                        </div>
                        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                            {donors.length != 0 ? (
                                donors.map((donor) => (
                                    <div
                                        key={donor.id}
                                        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                                    >
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                                            {donor.name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {donor.email}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-64 col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No donors found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Guest>
    );
};

export default Home;
