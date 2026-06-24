import config from "@/constants/config";
import Plan from "@/types/requests/plans";

export async function getPlans():Promise<Plan[]> {
    //const res = await fetch(config.apiUrl +'/plans');

    //if( res.status == 200 ) {
        //return await res.json();
    //}

    return [
        {
            name: "Basic",
            monthlyPrice: 12,
            yearlyPrice: 120,
            id: "basic",
            tokens: '500',
            users: 10,
            storage: "200 GB"
        },
        {
            name: "Premium",
            monthlyPrice: 25,
            yearlyPrice: 200,
            id: "premium",
            tokens: '500',
            users: 10,
            storage: "200 GB",
            isRecommended:true
        },
        {
            name: "EnterPrise",
            monthlyPrice: 50,
            yearlyPrice: 350,
            id: "premium",
            tokens: '500',
            users: 10,
            storage: "200 GB",
        }
    ];
}