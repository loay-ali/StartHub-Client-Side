import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6"
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi"
import { AiOutlineToTop } from "react-icons/ai";
import BackToTop from "./BackToTop";

export default function Footer() {
    return (
        <footer id = 'main-footer' style={{ position: 'relative', zIndex: 10, background: '#0f1f1d' }}>
            <BackToTop />
            <div style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: '60px 32px 40px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 48,
            }}>
                {/* Brand */}
                <div>
                    <img src="/starthub.png" width={140} alt="StarHub" style={{ marginBottom: 16 }} />
                    <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, maxWidth: 260 }}>
                        Business intelligence, AI, and recruitment analysis — unified for startups.
                    </p>

                <div className="mt-5 flex justify-start gap-4">
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
                </div>

                {/* Platform */}
                <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#14b8a6', marginBottom: 16 }}>Platform</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <li><Link href="/features" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">Features</Link></li>
                        <li><Link href="/ecosystem" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">Ecosystem</Link></li>
                        <li><Link href="/plans" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#14b8a6', marginBottom: 16 }}>Company</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <li><Link href="/about" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">About Us</Link></li>
                        <li><Link href="/contact-us" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">Contact</Link></li>
                        <li><Link href="/login" style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none' }} className="hover:text-[#14b8a6] transition-colors">Login</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{
                borderTop: '1px solid #1e3a38',
                padding: '20px 32px',
                textAlign: 'center',
                fontSize: 13,
                color: '#64748b',
            }}>
                &copy; 2025 StarHub — All Rights Reserved
            </div>
        </footer>
    )
}