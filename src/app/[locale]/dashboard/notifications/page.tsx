import CollectionPage from "@/components/collection/CollectionPage";
import { getNotifications } from "@/src/services/auth";

export default async function NotificationsList() {

    const notifications = await getNotifications();

    return (
    <CollectionPage
        title = "Notifications"
        data = {[]}
        columns = {[
            {key: "id",label: "#"},
            {key: "title",label: "Title"},
            {key: "content",label: "Content"},
            {key: "type",label: "Type"},
            {key: "created_at",label: "Date"}
        ]}/>
    );
}