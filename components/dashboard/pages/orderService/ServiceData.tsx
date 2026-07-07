import { getServiceData } from "@/src/services/services";
import Service, { Options } from "@/types/requests/service";

import Form from 'next/form';

export default async function ServiceData({t,searchParams}:{t:Function,searchParams: Promise<{[key:string]:string | string[] | undefined}>}) {
    const sParams = await searchParams;
    const serviceId = sParams.service ? sParams.service:null;

    if( ! serviceId ) return <>Please Choose a Service</>;

    const service:Service | undefined = await getServiceData(serviceId.toString());

    if( ! service ) return <>{t('dashboard.service.please-choose-a-service')}</>;

    return (
    <Form action = "">
        <h3 className = 'text-2xl text-center mb-5'>{service.name}</h3>
        <div className = 'grid grid-cols-3 items-center'>
            <p className = 'text-center my-2 col-start-1 col-end-3'>{service.description}</p>

            <span className = 'bg-primary p-2 m-5 mx-20 text-white rounded text-center block text-xl'><strong>{service.priceInUSD}</strong> {
            t('shared.currencies.USD')}</span>
        </div>

        <hr className = 'my-5 border-[#DDD]'/>

        <section className = 'flex flex-col'>
        {service.neededData.map(field => {
            return (<div className = 'form-group' key = {field.slug}>
            <label htmlFor = {field.slug}>{field.title}</label>
            {field.type == 'TEXT' ? (
                <input name = {field.slug} className = 'border-1 p-1' type = 'text' />
            ):(field.type == 'MULTIVALUE' || field.type == 'SELECT' ? (
                <select name = {field.slug} multiple = {field.type == "MULTIVALUE"}>
                    {field.values?.map((ele) => <option value = {ele}>{ele}</option>)}
                </select>
            ):null)}
            </div>);
        })}
        </section>

        <input type = 'hidden' name = 'step' value = '3' />
        <input type = 'hidden' name = 'service' value = {serviceId} />
        <footer className = 'flex justify-around items-center'>
            <button type = 'submit' className = 'button'>
                {t('dashboard.common.submit')}
            </button>
        </footer>
    </Form>);
}