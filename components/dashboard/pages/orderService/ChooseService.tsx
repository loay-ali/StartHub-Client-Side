import { getServices } from "@/src/services/services";
import Service from "@/types/requests/service";

import ServiceCard from "./ServiceCard";

export default async function ChooseService() {
    const services:Service[] = await getServices();

    return (<section>
        {services.map(service => {
            return <ServiceCard />;
        })}
    </section>);
}