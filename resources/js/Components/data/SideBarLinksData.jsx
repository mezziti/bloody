import { FolderHeart, HandHeart, CalendarHeart, FileHeart } from "lucide-react";

export const navBarLinksData = [
  {
    name: "My Drives",
    route: "mydrives",
    icon: <CalendarHeart className="h-5 w-5" />,
  },
  {
    name: "Posts",
    route: "posts.index",
    icon: <FileHeart className="h-5 w-5" />,
  },
];