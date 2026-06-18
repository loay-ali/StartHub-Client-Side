import { getServiceData } from "@/src/services/services";
import Service, { Options } from "@/types/requests/service";

export default async function ServiceData({searchParams}:{searchParams: Promise<{[key:string]:string | string[] | undefined}>}) {
    const sParams = await searchParams;
    const serviceId = sParams.service ? sParams.service:null;

    if( ! serviceId ) return <>Please Choose a Service</>;

    const service:Service | undefined = {
        id: 'service-1',
        name: "Some Service",
        description: "Some Description",
        estimatedDurationInHours: 24,
        priceInUSD: 25.5,
        neededData: [{
          type: 'TEXT',
          title: "Some Value To Enter",
          slug: "some-val"  
        }]

    };//await getServiceData(serviceId.toString());

    if( ! service ) return <>Please Choose a Service</>;

    return (
    <form>
        Hello
    </form>);
}