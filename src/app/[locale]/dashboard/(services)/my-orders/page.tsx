'use client';

import { useState } from "react";
import CollectionPage from "@/components/collection/CollectionPage";

    const initialCompanies = [
    {
        id: 1,
        name: "StartHub",
        users: 150,
        storage: "200 GB",
        price: 99,
        status: "Active",
    },
    {
        id: 2,
        name: "TechNova",
        users: 80,
        storage: "100 GB",
        price: 49,
        status: "Pending",
    },
    {
        id: 3,
        name: "ByteForge",
        users: 220,
        storage: "500 GB",
        price: 199,
        status: "Active",
    },
    {
        id: 4,
        name: "CloudNet",
        users: 45,
        storage: "50 GB",
        price: 29,
        status: "Inactive",
    },
    ];

export default function MyOrders() {

    const [companies, setCompanies] = useState(initialCompanies);

    const handleDelete = (company: (typeof initialCompanies)[number]) => {
    setCompanies((prev) => prev.filter((item) => item.id !== company.id));
    };

    const handleEdit = (company: (typeof initialCompanies)[number]) => {
    console.log("Edit company:", company);

    // هنا بعدين ممكن:
    // router.push(`/companies/${company.id}/edit`);
    };

    return (
    <CollectionPage
        title="Companies"
        data={companies}
        columns={[
        {
            key: "name",
            label: "Company Name",
            sortable: true,
        },

        {
            key: "users",
            label: "Users",
            sortable: true,

            value: (row) => <strong>{row.users} Users</strong>,
        },

        {
            key: "storage",
            label: "Storage",
            sortable: true,
        },

        {
            key: "price",
            label: "Price",
            sortable: true,

            value: (row) => (
            <span className="font-semibold text-primary">${row.price}</span>
            ),
        },

        {
            key: "status",
            label: "Status",

            value: (row) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                row.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : row.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
                {row.status}
            </span>
            ),
        },
        ]}
        onAdd={() => console.log("Add new")}
        onEdit={handleEdit}
        onDelete={handleDelete}
    />
    );

    return (<>My Orders</>);
}