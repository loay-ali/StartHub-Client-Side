import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6"
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi"
import { AiOutlineToTop } from "react-icons/ai";
import BackToTop from "./BackToTop";

export default function Footer () {
    return (
        <>
        <footer id = 'main-footer' className = 'mt-20 bg-secondary p-5 grid grid-cols-1 md:grid-cols-3'>
            <BackToTop />
            <section className = 'flex flex-col justify-center items-center py-5'>
                <img className = 'bg-black rounded-full p-3' src = '/starthub.png' width = {150} />
                <p className = 'ms-20 pt-2'>
                    a platform that combines business intelligence, artificial intelligence, and recruitment analysis to help startups make smarter decisions with confidence.
                </p>

                <div className="mt-5 flex justify-center gap-4">
                    <a
                    href="#"
                    className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
                    >
                    <FiFacebook size={22} />
                    </a>

                    <a
                    href="#"
                    className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
                    >
                    <FiInstagram size={22} />
                    </a>

                    <a
                    href="#"
                    className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
                    >
                    <FiLinkedin size={22} />
                    </a>

                    <a
                    href="#"
                    className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
                    >
                    <FaXTwitter size={20} />
                    </a>
                </div>
            </section>

            <section className = 'flex flex-col text-center'>
                <strong className = 'border-b-1 border-primary w-[100px] m-2 mx-auto p-2'>Features</strong>
                <ul>
                    <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link 1</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link 2</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link 3</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link 4</Link>
                    </li>
                </ul>
            </section>

            <section className = 'flex flex-col text-center'>
                <strong className = 'border-b-1 border-primary w-[100px] m-2 mx-auto p-2'>Services</strong>
                <ul>
                    <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link A</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link B</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link C</Link>
                    </li>
                                        <li>
                        <Link className = 'p-3 inline-block' href = '#'>Link D</Link>
                    </li>
                </ul>
            </section>
        </footer>
        <section style = {{borderRadius: '45px 45px 0 0'}} className = 'mt-[-22.5px] z-9 relative bg-primary text-white text-center p-2 font-bolder'>
            Starthub - All Rights Reserved 2025
        </section>
        </>
    )
}