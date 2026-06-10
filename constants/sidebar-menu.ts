import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

export const sidebarMenu = [
  {
    section: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: FiHome,
      },
    ],
  },
  {
    section: "Features",
    items: [
      {
        title: "Companies",
        href: "/companies",
        icon: FiUsers,
      },
    ],
  },
  {
    section: "Account Management",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: FiSettings,
      },
    ],
  },
];
