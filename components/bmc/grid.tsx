import { BMC } from "@/src/app/[locale]/dashboard/bmc/list/page";
import { useTranslations } from "next-intl";

export default function BMCComponent({bmc,updateBmc}:{bmc:BMC,updateBmc:Function}) {

    const t = useTranslations();

    const bmcElements:any[] = [
        {index: 7,className: "row-[1/3] col-[5/6]",slug: "customer-segments",value: bmc['customer-segments'],title: t("dashboard.bmc.customer-segments")},
        {index: 5,className: "row-[1/2] col-[4/5]",slug: "customer-relationships",value: bmc['customer-segments'],title: t("dashboard.bmc.customer-relationships")},
        {index: 6,className: "row-[2/3] col-[4/5]",slug: "channels",value: bmc['customer-segments'],title: t("dashboard.bmc.Channels")},
        {index: 9,className: "row-[3/4] col-[4/6]",slug: "revenue-streams",value: bmc['customer-segments'],title: t("dashboard.bmc.revenue-streams")},
        {index: 2,className: "row-[1/2] col-[2/2]",slug: "key-activities",value: bmc['customer-segments'],title: t("dashboard.bmc.key-activities")},
        {index: 3,className: "row-[2/3] col-[2/2]",slug: "key-resources",value: bmc['customer-segments'],title: t("dashboard.bmc.key-resources")},
        {index: 1,className: "row-[1/3] col-[1/1]",slug: "key-partners",value: bmc['customer-segments'],title: t("dashboard.bmc.key-partners")},
        {index: 8,className: "row-[3/4] col-[1/4]",slug: "cost-structure",value: bmc['customer-segments'],title: t("dashboard.bmc.cost-structure")},
        {index: 4,className: "row-[1/3] col-[3/4]",slug: "value-propositions",value: bmc['customer-segments'],title: t("dashboard.bmc.value-propositions")}
    ];

    return (
        <section className = 'grid grid-cols-5 grid-rows-3 m-5 gap-2'>
            {bmcElements.map(ele => {
                return (
                <div
                id = {ele.slug}
                className = {'flex flex-col border-1 border-gray-300 '+ ele.className}>
                    <strong className = 'p-3 text-center bg-gray-100 capitalize'>{ele.slug.replace('-',' ')}</strong>
                    <textarea tabIndex={ele.index} style = {{resize: 'none'}} className = 'grow border-0!' defaultValue={ele.value} onInput = {t => {
                        updateBmc((bmc:any) => {
                            bmc[ele.slug] = t.currentTarget?.value ?? bmc[ele.slug];
                            return bmc;
                        })
                    }}></textarea>
                </div>)
            })}
        </section>
    );
}