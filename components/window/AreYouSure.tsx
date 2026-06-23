'use client';

import { MdClose } from "react-icons/md";

export default function AreYouSureWindow({title}:{title:string}) {

    return (
        <section className = ''>
            <header>
                <strong>
                    {title}
                </strong>
                <button type="button">
                    <MdClose />
                </button>
            </header>
            <section>

            </section>
            <footer>

            </footer>
        </section>
    );
}