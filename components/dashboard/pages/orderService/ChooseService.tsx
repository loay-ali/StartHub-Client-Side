import Service from "@/types/requests/service";

import ServiceCard from "./ServiceCard";
import { getServices } from "@/src/services/services";

export default async function ChooseService() {
    const services:Service[] = await getServices();

    return (<section className = 'grid grid-cols-3 gap-4'>
        {services.map(service => {

            return <ServiceCard key = {service._id} service = {service}/>;
        })}
    </section>);
}
