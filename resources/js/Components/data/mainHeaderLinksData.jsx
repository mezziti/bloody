import { CalendarHeart, FileHeart, FolderHeart, HandHeart, Home } from "lucide-react";

export const MainHeaderLinkData = [
  {
    name: "Banks",
    route: "banks",
    icon: <FolderHeart className="h-5 w-5" />,
  },
  {
    name: "Donors",
    route: "donors",
    icon: <HandHeart className="h-5 w-5" />,
  },
  {
    name: "Drives",
    route: "drives",
    icon: <CalendarHeart className="h-5 w-5" />,
  },
  {
    name: "Requests",
    route: "requests",
    icon: <FileHeart className="h-5 w-5" />,
  },
];
