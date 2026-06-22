import config from "@/constants/config";
import Plan from "@/types/requests/plans";

export async function getPlans():Promise<Plan[]> {
    const res = await fetch(config.apiUrl +'/plans');

    if( res.status == 200 ) {
        return await res.json();
    }

    return [
        {
            name: "Basic",
            monthlyPrice: 200,
            yearlyPrice: 750,
            id: "basic",
            tokens: '500',
            users: 10,
            storage: "200 GB"
        }
    ];
}