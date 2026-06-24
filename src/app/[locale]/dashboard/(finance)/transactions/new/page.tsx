import Form from "next/form";
import { redirect } from "next/navigation";

export default async function NewTransaction() {

    const today = new Date();
    const currentMonth = today.getMonth() + 1;

    const todayDate = today.getFullYear() +'-'+ (currentMonth < 10 ? '0'+currentMonth:currentMonth) +'-'+ today.getDate();

    return (
    <Form action = {async (formData:FormData) => {
        'use server';

        redirect('/dashboard/transactions/list');

    }} className = 'max-w-[500px] p-5 bg-white rounded mx-auto mt-10 shadow'>

        <h2 className = 'text-xl'>Create New Transaction</h2>

        <div className = 'form-group'>
            <label htmlFor="details">Details</label>
            <textarea name="details" id="details"></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="date">Date</label>
            <input max = {todayDate} type="date" name="date" id="date" defaultValue={todayDate}/>
        </div>

        <button type = 'submit' className = 'button w-full'>
            Create Tranaction
        </button>

    </Form>
    )
}