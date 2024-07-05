import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import DashboardHeader from "@/Components/DashboardHeader.jsx";
import SideBarLinks from "@/Components/SideBarLinks";

export function Authenticated({ user, pageName, children }) {
  return ( 
    <div className="w-screen flex">
      <div className="bg-gray-100 sm:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden bg-white border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="mx-auto">
                <ApplicationLogo />
              </Link>
            </div>
            <ScrollArea>
              <div className="my-10">
                <SideBarLinks user={user} />
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex flex-col h-screen">
          <DashboardHeader user={user} />
          <ScrollArea className="w-full">
            <ScrollArea className="h-full">
              <main className="flex max-w-1/2 bg-gray-100 flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex items-center">
                  <h1 className="text-lg font-semibold md:text-2xl">
                    {pageName}
                  </h1>
                </div>
                <div className="overflow-x-auto">{children}</div>
              </main>
            </ScrollArea>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
