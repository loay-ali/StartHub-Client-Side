import { SearchResult } from "./GlobalSearchServie";

class SuggestionService {
  private readonly suggestions: Record<string, SearchResult[]> = {
    "/dashboard": [
      {
        id: "d1",
        title: "Open Analytics",
        subtitle: "View business insights",
        category: "analytics",
        url: "/analytics",
      },
      {
        id: "d2",
        title: "Generate Revenue Report",
        subtitle: "Finance",
        category: "reports",
        url: "/reports/revenue",
      },
      {
        id: "d3",
        title: "Show Today's Tasks",
        subtitle: "Quick overview",
        category: "tasks",
        url: "/tasks",
      },
    ],

    "/analytics": [
      {
        id: "a1",
        title: "Revenue Dashboard",
        subtitle: "Business Analytics",
        category: "analytics",
        url: "/analytics",
      },
      {
        id: "a2",
        title: "Monthly Report",
        subtitle: "Reports",
        category: "reports",
        url: "/reports/monthly",
      },
    ],

    "/recruitment": [
      {
        id: "r1",
        title: "Add Job Opening",
        subtitle: "Recruitment",
        category: "recruitment",
        url: "/recruitment/jobs/new",
      },
      {
        id: "r2",
        title: "Review Applicants",
        subtitle: "Hiring",
        category: "recruitment",
        url: "/recruitment/applicants",
      },
    ],

    "/finance": [
      {
        id: "f1",
        title: "Generate Monthly Report",
        subtitle: "Finance",
        category: "reports",
        url: "/reports",
      },
      {
        id: "f2",
        title: "Create Invoice",
        subtitle: "Finance",
        category: "finance",
        url: "/finance/invoices/new",
      },
      {
        id: "f3",
        title: "View Expenses",
        subtitle: "Finance",
        category: "finance",
        url: "/finance/expenses",
      },
    ],

    "/operations": [
      {
        id: "o1",
        title: "Operations Dashboard",
        subtitle: "Overview",
        category: "operations",
        url: "/operations",
      },
      {
        id: "o2",
        title: "Pending Requests",
        subtitle: "Operations",
        category: "operations",
        url: "/operations/requests",
      },
    ],

    "/reports": [
      {
        id: "rp1",
        title: "Generate New Report",
        subtitle: "Reports",
        category: "reports",
        url: "/reports/create",
      },
      {
        id: "rp2",
        title: "Revenue Report",
        subtitle: "Finance",
        category: "reports",
        url: "/reports/revenue",
      },
    ],

    "/tasks": [
      {
        id: "t1",
        title: "Create Task",
        subtitle: "Task Management",
        category: "tasks",
        url: "/tasks/create",
      },
      {
        id: "t2",
        title: "View Overdue Tasks",
        subtitle: "Tasks",
        category: "tasks",
        url: "/tasks?filter=overdue",
      },
    ],

    "/employees": [
      {
        id: "e1",
        title: "Invite Employee",
        subtitle: "Employees",
        category: "employees",
        url: "/employees/new",
      },
      {
        id: "e2",
        title: "Employee Directory",
        subtitle: "Employees",
        category: "employees",
        url: "/employees",
      },
    ],

    "/companies": [
      {
        id: "c1",
        title: "Add Company",
        subtitle: "Companies",
        category: "companies",
        url: "/companies/create",
      },
      {
        id: "c2",
        title: "Company Directory",
        subtitle: "Companies",
        category: "companies",
        url: "/companies",
      },
    ],

    "/notifications": [
      {
        id: "n1",
        title: "Unread Notifications",
        subtitle: "Notifications",
        category: "notifications",
        url: "/notifications",
      },
    ],

    "/settings": [
      {
        id: "s1",
        title: "Profile Settings",
        subtitle: "Account",
        category: "settings",
        url: "/settings/profile",
      },
      {
        id: "s2",
        title: "System Preferences",
        subtitle: "Settings",
        category: "settings",
        url: "/settings/preferences",
      },
    ],
  };

  private readonly defaultSuggestions: SearchResult[] = [
    {
      id: "default-1",
      title: "Dashboard",
      subtitle: "Go to Dashboard",
      category: "dashboard",
      url: "/dashboard",
    },
    {
      id: "default-2",
      title: "Analytics",
      subtitle: "View Analytics",
      category: "analytics",
      url: "/analytics",
    },
    {
      id: "default-3",
      title: "Employees",
      subtitle: "Manage Employees",
      category: "employees",
      url: "/employees",
    },
    {
      id: "default-4",
      title: "Generate Report",
      subtitle: "Reports",
      category: "reports",
      url: "/reports",
    },
    {
      id: "default-5",
      title: "Create Task",
      subtitle: "Quick Action",
      category: "tasks",
      url: "/tasks/create",
    },
  ];

  getSuggestions(pathname: string): SearchResult[] {
    return (
      this.suggestions[pathname] ??
      this.defaultSuggestions
    );
  }
}


const suggestionServices = new SuggestionService();
export default suggestionServices;