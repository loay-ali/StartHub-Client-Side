import { getServiceData } from "@/src/services/services";
import Service, { Options } from "@/types/requests/service";

import Form from 'next/form';

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
        },
{
          type: 'MULTIVALUE',
          title: "Some Value To Enter",
          slug: "some-val",
          values: ['one','two','three']
        },]

    };//await getServiceData(serviceId.toString());

    if( ! service ) return <>Please Choose a Service</>;

    return (
    <Form action = "">
        <h3 className = 'text-2xl text-center mb-5'>{service.name}</h3>
        <p className = 'text-center my-2'>{service.description}</p>

        <span className = 'text-center block'><strong>{service.priceInUSD}</strong> USD</span>

        <section className = 'flex flex-col'>
        {service.neededData.map(field => {
            return (<>
            <label htmlFor = {field.slug}>{field.title}</label>
            {field.type == 'TEXT' ? (
                <input name = {field.slug} className = 'border-1 p-1' type = 'text' />
            ):(field.type == 'MULTIVALUE' ? (
                <select name = {field.slug}>
                    {field.values?.map((ele) => <option value = {ele}>{ele}</option>)}
                </select>
            ):null)}
            </>);
        })}
        </section>

        <input type = 'hidden' name = 'step' value = '3' />
        <input type = 'hidden' name = 'service' value = {serviceId} />
        <footer className = 'flex justify-around items-center'>
            <button type = 'submit' className = 'button'>
                Submit
            </button>
        </footer>
    </Form>);
}