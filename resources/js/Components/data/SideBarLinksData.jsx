export const sideBarLinksData = [
  {
    name: "Dashboard",
    route: "dashboard",
    roles: ["bank", "donor", "recipient"],
  },
  {
    name: "My Drives",
    route: "drives.index",
    roles: ["bank"],
  },
  {
    name: "Records",
    route: "records.index",
    roles: ["bank"],
  },
  {
    name: "Bags",
    route: "bags.index",
    roles: ["bank"],
  },
  {
    name: "My Participations",
    route: "participations",
    roles: ["donor"],
  },
  {
    name: "Blood Requests",
    route: "bloodRequests.index",
    roles: ["donor", "recipient", "bank"],
  },
  {
    name: "Donation Requests",
    route: "donationRequests.index",
    roles: ["donor"],
  },
  {
    name: "My Donation Requests",
    route: "donationRequests.myRequests",
    roles: ["donor", "recipient", "bank"],
  },
  {
    name: "My Posts",
    route: "posts.index",
    roles: ["bank", "donor", "recipient"],
  },
  {
    name: "Donations",
    route: "donations",
    roles: ["donor"],
  },
];
