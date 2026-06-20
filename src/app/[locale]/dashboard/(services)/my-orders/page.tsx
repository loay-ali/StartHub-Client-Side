import CollectionPage from "@/components/collection/CollectionPage";
import { getUserServiceOrders } from "@/src/services/services";


export default async function MyOrders() {

    //const orders = await getUserServiceOrders();

    const handleDelete = () => {
    
    };

    const handleEdit = () => {
    

    // هنا بعدين ممكن:
    // router.push(`/companies/${company.id}/edit`);
    };

    return (
    <CollectionPage
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