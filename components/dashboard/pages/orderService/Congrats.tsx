import { FiCheckCircle } from "react-icons/fi";

export default function OrderPlaced() {
    return (<section className = 'flex flex-col items-center'>
        <FiCheckCircle size={200} color = '#28a745' className = "my-3"/>
        <h3 className = 'text-center text-2xl my-7'>Service Orders Successfully</h3>
        <p className = 'text-center'>
            We'll Send You Updates as Soon as The Service Is Accomplished
        </p>
    </section>);
}