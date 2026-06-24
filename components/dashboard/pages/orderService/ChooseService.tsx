import Service from "@/types/requests/service";

import ServiceCard from "./ServiceCard";

export default async function ChooseService() {
    const services:Service[] = [{
        id: 'service-1',
        name: "Service 1",
        priceInUSD: 25.5,
        description: "Some Description For The Service",
        estimatedDurationInHours: 48,
        neededData: [],
    },
    {
        id: 'service-2',
        name: "Service 2",
        priceInUSD: 50,
        description: "Some Description For The Service, New Text In Here",
        estimatedDurationInHours: 24,
        neededData: [],
    }];//await getServices();

    return (<section className = 'grid grid-cols-3 gap-4'>
        {services.map(service => {
            return <ServiceCard key = {service.id} service = {service}/>;
        })}
    </section>);
}
