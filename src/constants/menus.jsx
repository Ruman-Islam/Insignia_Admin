import { RiDashboardLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiPackage } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

export const sidebarOverviews = [
  {
    route: "dashboard",
    title: "Dashboard",
    icon: <RiDashboardLine />,
  },
  {
    route: "",
    title: "Analytics",
    icon: <TbBrandGoogleAnalytics />,
  },
];

export const sidebarManagements = [
  {
    route: "",
    title: "Packages",
    icon: <BiPackage />,
  },
  {
    route: "",
    title: "Bookings",
    icon: <BsBookmark />,
  },
  {
    route: "faq",
    title: "FAQ",
    icon: <BsBookmark />,
  },
];

export const userMenuDropdownLinks = [
  {
    title: "Profile",
    route: "/profile",
  },
  {
    title: "Settings",
    route: "/",
  },
  {
    title: "Logout",
    route: "/",
  },
];
