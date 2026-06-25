import Link from "next/link"

export default function Footer () {
    return (
        <>
        <footer className = 'bg-secondary p-5 grid grid-cols-1 md:grid-cols-3'>
            <section className = 'flex flex-col justify-center items-center py-5'>
                <img src = '/starthub.png' width = {150} />
                <p className = 'ms-20 pt-2'>
                    a platform that combines business intelligence, artificial intelligence, and recruitment analysis to help startups make smarter decisions with confidence.
                </p>
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
        <section className = 'bg-gray-300 text-center p-2 text-black font-bolder'>
            Starthub - All Rights Reserved 2025
        </section>
        </>
    )
}