import { Head } from "@inertiajs/react";
import { Authenticated } from "@/Layouts/AuthenticatedLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { BookHeart, CalendarHeart, FileHeart, FolderHeart, HandHeart, MessageSquareHeart, Syringe } from "lucide-react";

export default function Dashboard({
  auth,
  bags,
  bloodRequests,
  posts,
  records,
  donationRequests,
  myDonationRequests,
  drives,
  donations,
  participations,
}) {

  return (
    <Authenticated user={auth.user} pageName={"Dashboard"}>
      <Head title="Dashboard" />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {auth.user.role === "bank" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Drives</CardTitle>
                  <CalendarHeart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{drives}</div>
                  <p className="text-xs text-muted-foreground">
                    
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Records</CardTitle>
                  <BookHeart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{records}</div>
                  <p className="text-xs text-muted-foreground">
                    
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bags</CardTitle>
                  <FolderHeart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{bags}</div>
                  <p className="text-xs text-muted-foreground">

                  </p>
                </CardContent>
              </Card>
            </>
          )}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Blood Requests
              </CardTitle>
              <FileHeart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{bloodRequests}</div>
              <p className="text-xs text-muted-foreground">

              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                My Donation Requests
              </CardTitle>
              <HandHeart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{myDonationRequests}</div>
              <p className="text-xs text-muted-foreground">
                
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Posts</CardTitle>
              <FileHeart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{posts}</div>
              <p className="text-xs text-muted-foreground">

              </p>
            </CardContent>
          </Card>
          {auth.user.role === "donor" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    My Participations
                  </CardTitle>
                  <CalendarHeart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{participations}</div>
                  <p className="text-xs text-muted-foreground">
                    
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Donations
                  </CardTitle>
                  <Syringe className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{donations}</div>
                  <p className="text-xs text-muted-foreground">

                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Donation Requests
                  </CardTitle>
                  <MessageSquareHeart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{donationRequests}</div>
                  <p className="text-xs text-muted-foreground">

                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Authenticated>
  );
}
