import { FolderHeart, HandHeart, CalendarHeart, FileHeart } from "lucide-react";

export const sideBarLinksData = [
  {
    name: "My Drives",
    route: "drives.index",
    roles: ["bank"],
    icon: <CalendarHeart className="h-5 w-5" />,
  },
  {
    name: "My Posts",
    route: "posts.index",
    roles: ["bank", "donor", "recipient"],
    icon: <FileHeart className="h-5 w-5" />,
  },
];
