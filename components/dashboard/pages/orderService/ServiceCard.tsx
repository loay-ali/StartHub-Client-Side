import config from '@/constants/config';

import Service from "@/types/requests/service";

import Link from 'next/link';

export default function ServiceCard({service}:{service:Service}) {
    return (
        <Link href = {"?step=2&service="+ service.id} className = 'flex flex-col justify-stretch border-1 border-[#DDD] rounded hover:cursor-pointer'>
            <img src = {service.image ? (config.apiUrl +'/public/'+ service.image):'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fgenerative-ai-d-clipboard-business-idea-goals-project-plan-fast-progress-analytics-icon-invoice-bill-expenses-checklist-279561224.jpg&f=1&nofb=1&ipt=ae88793821f5224f7a98fe14b3b634a08f0d43d075cbbb46213b8705ad78ce4e'}/>
            <div className = 'p-3'>
                <strong className = 'my-4 text-xl'>{service.name}</strong>
                <p className = 'my-2'>
                    {service.description}
                </p>

                <span>{service.priceInUSD} USD</span>
            </div>
        </Link>
    );
}