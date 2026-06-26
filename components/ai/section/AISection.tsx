import { IoClose } from "react-icons/io5";

export default function AISection({title}:{title:string}) {
    return (
    <section className = 'border-2 border-dashed border-primary flex flex-col p-5 rounded mb-5 text-white'>
        <header className = ' text-primary flex items-center justify-between'>
            <h2 className = 'text-lg font-bold'>{title}</h2>
            <button className = 'cursor-pointer'>
                <IoClose size = {20}/>
            </button>
        </header>
        <section className = 'border-l-4 p-5 text-primary'>
            Hello World
        </section>
        <footer className = 'flex justify-around items-center p-2 gap-20'>
            <button className = 'button'>Save</button>
            <button className = 'button secondary'>Make Changes</button>
        </footer>
    </section>
    );
}