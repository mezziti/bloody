import { Head, Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/Components/ui/collapsible";
import { Button } from "@/Components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { FAQ } from "@/Components/data/FAQ";

const Home = ({ auth }) => {
  const faq = FAQ;
  return (
    <Guest user={auth.user}>
      <Head title="Home" />
      <section className="bg-white dark:bg-gray-900">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-8 lg:px-12">
          <Link
            href="/drives"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
              New
            </span>
            <span className="text-sm font-medium">
              Find a blood drive near you
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="grid max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:pb-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Every Drop Counts:
              <br />
              Be a Lifesaver Today!
            </h1>
            <p className="max-w-2xl mb-6 font-normal text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Join us in our blood donation drive and be a hero! Every drop of
              blood you donate has the power to save lives. Let’s come together,
              roll up our sleeves, and give the gift of life. Be part of this
              life-saving mission and spread the word. Together, we can make the
              difference!
            </p>
            <Link
              href="/donation-process"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            >
              Reade more
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="#eligible"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Check Eligibility
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/img/BloodyHero.svg" alt="mockup" />
          </div>
        </div>
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get answers to the most common questions about the blood
                donation process.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4" id="eligible">
              {faq.map((item, index) => (
                <Collapsible
                  key={index}
                  className="rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between space-x-4 px-4 py-3">
                    <h3 className="text-base font-medium">{item.q}</h3>
                    <CollapsibleTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <ChevronDownIcon className="h-4 w-4 transition-transform group-[data-state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t border-gray-200 px-4 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <div dangerouslySetInnerHTML={{ __html: item.a }} />
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>
      </section>
    </Guest>
  );
};

export default Home;
