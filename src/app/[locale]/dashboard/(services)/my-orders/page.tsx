import CollectionPage from "@/components/collection/CollectionPage";
import { getUserServiceOrders } from "@/src/services/services";

interface MyOrdersProps {
    searchParams?: Promise<{ p?: string }>;
}

export default async function MyOrders({ searchParams }: MyOrdersProps) {
    const params = await searchParams;
    const currentPage = params?.p ? Math.abs(Number(params.p)) : 1;

    //const orders = await getUserServiceOrders();

    const handleDelete = () => {
    
    };

    const handleEdit = () => {
    
    };

    return (
    <CollectionPage
        currentPage={currentPage}
        title="My Orders"
        data={[]}
        columns={[
        {
            key: "id",
            label: "#",
        },

        {
            key: "service",
            label: "Service",
            sortable: true,

            value: "Service Name",
        },

        {
            key: "created_at",
            label: "Order Date",
            sortable: true,
        },

        {
            key: "status",
            label: "Status",

            value: /*(row) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                'Active' === "Active"
                    ? "bg-green-100 text-green-700"
                    : 'Pending' === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
                {'status'}
            </span>
            )*/'Status Value',
        },
        ]}
        //onAdd={() => console.log("Add new")}
        //onEdit={handleEdit}
        //onDelete={handleDelete}
    />
    );

    return (<>My Orders</>);
}