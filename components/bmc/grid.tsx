import { BMC } from "@/src/app/[locale]/dashboard/bmc/list/page";

export default function BMCComponent({bmc,updateBmc}:{bmc:BMC,updateBmc:Function}) {
    const bmcElements:any[] = [
        {slug: "customer-segments",value: bmc['customer-segments'],title: "Customer Segments"},
        {slug: "customer-relationships",value: bmc['customer-segments'],title: "Customer Relationships"},
        {slug: "channels",value: bmc['customer-segments'],title: "Channels"},
        {slug: "revenue-streams",value: bmc['customer-segments'],title: "Revenue Streams"},
        {slug: "key-activities",value: bmc['customer-segments'],title: "Key Activities"},
        {slug: "key-resources",value: bmc['customer-segments'],title: "Key Resources"},
        {slug: "key-partners",value: bmc['customer-segments'],title: "Key Partners"},
        {slug: "cost-structure",value: bmc['customer-segments'],title: "Cost Structure"},
        {slug: "value-propositions",value: bmc['customer-segments'],title: "Value Propositions"}
    ];

    return (
        <section className = 'grid grid-cols-5 grid-rows-3'>
            {bmcElements.map(ele => {
                return (
                <div id = {ele.slug}>
                    <strong className = 'p-3 text-center bg-gray-50'>{ele.slug}</strong>
                    <textarea defaultValue={ele.value} onInput = {t => {
                        updateBmc((bmc:any) => {
                            bmc[ele.slug] = t.currentTarget.value;
                            return bmc;
                        })
                    }}></textarea>
                </div>)
            })}value
        </section>
    );
}