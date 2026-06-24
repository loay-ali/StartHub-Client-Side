import { getAccount } from "@/src/services/financial";

export default async function SingleAccount({params}:any) {
    const {id} = await params;

    const accountData = await getAccount(id);

    if( accountData == null ) {
        return (<>No Such Account</>)
    }

    return (<></>);
}