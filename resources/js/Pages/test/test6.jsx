import { Head } from "@inertiajs/react";
import { SideBar } from "@/Layouts/SideBar.jsx";

export default function Test() {
    return (
        <>
            <Head title="Dashboard" />
            <SideBar pageName={"test 6"}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    );
}
