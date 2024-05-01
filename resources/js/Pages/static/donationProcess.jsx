import { Head, Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";

const donationProcess = ({ auth }) => {
  return (
    <Guest user={auth.user}>
      <Head title="Donation Process" />
      <section className="bg-white dark:bg-gray-900">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-8 lg:px-12">
          <h1 className="sm:text-5xl text-xl font-black">
            The Blood Donation Process
          </h1>
          <p className="text-lg font-normal text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            Donating blood is a simple and safe process that can save lives.
            Here’s what you can expect when you donate blood.
          </p>
          <div className="sm:m-20 px-10 text-start">
            <div>
              <h2 className="text-xl font-bold">
                The Blood Donation Process: Saving Lives One Donation at a Time
              </h2>
              <p className="text-lg font-normal text-gray-500 lg:my-5 md:text-lg lg:text-xl dark:text-gray-400">
                Blood donation is a crucial aspect of healthcare systems
                worldwide, playing a pivotal role in saving countless lives
                every day. Whether for emergency transfusions, surgeries, or
                treating chronic conditions, donated blood remains an
                indispensable resource. Understanding the blood donation process
                is essential for both donors and recipients, ensuring safe and
                efficient collection, testing, and distribution of this
                life-sustaining fluid.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                The Blood Donation Process: Saving Lives One Donation at a Time
              </h2>
              <p className="text-lg font-normal text-gray-500 lg:my-5 md:text-lg lg:text-xl dark:text-gray-400">
                Blood donation is a crucial aspect of healthcare systems
                worldwide, playing a pivotal role in saving countless lives
                every day. Whether for emergency transfusions, surgeries, or
                treating chronic conditions, donated blood remains an
                indispensable resource. Understanding the blood donation process
                is essential for both donors and recipients, ensuring safe and
                efficient collection, testing, and distribution of this
                life-sustaining fluid.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Guest>
  );
};

export default donationProcess;
