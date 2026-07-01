import {
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
  FiBriefcase,
  FiFileText,
  FiDollarSign,
  FiBell,
  FiSettings,
  FiHome,
} from "react-icons/fi";

export function categoryIcon(category: string) {
  switch (category) {
    case "dashboard":
      return FiHome;

    case "analytics":
      return FiBarChart2;

    case "employees":
      return FiUsers;

    case "companies":
      return FiBriefcase;

    case "tasks":
      return FiCheckSquare;

    case "reports":
      return FiFileText;

    case "finance":
      return FiDollarSign;

    case "notifications":
      return FiBell;

    case "settings":
      return FiSettings;

    default:
      return FiFileText;
  }
}