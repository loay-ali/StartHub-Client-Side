import CollectionPage from "@/components/collection/CollectionPage";
import { deleteUser, getUsers } from "@/src/services/users";
import User from "@/types/requests/users";
import { refresh } from "next/cache";

import { redirect } from 'next/navigation';
import config from "@/constants/config";

export default async function UsersList() {
    const allUsers:User[] = [
        {id: "no_world",name: "Loay Ali",email: "loay.ali.emam.ghonem@gmail.com",username: "loay",role:"ADMIN"}
    ];//await getUsers();

    return (<>
    <CollectionPage
    onAdd={async () => {
        'use server';

        redirect('/dashboard/users/new');
    }}
    onDelete={async (row:User) => {
        'use server';

        await deleteUser(row.id ?? '');

        refresh();
    }}
    onEdit={async (row:User) => {
        'use server';

        redirect('/dashboard/users/'+ row.id);
    }}
    title = "All Users"
    data = {allUsers}
    columns={[
        {key: "id",label: "#",sortable: false},
        {key: "name",label: "Name",sortable: true},
        {key: "role",label: "Role",sortable: true},
        {key: "joined_in",label: "Join In",sortable: true}
    ]}/>
    </>)
}