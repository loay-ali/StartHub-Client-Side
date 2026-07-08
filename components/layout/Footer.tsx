'use client';

import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();

  const isInvestorAuth = pathname?.includes('/investor/login') || pathname?.includes('/investor/register');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInvestorAuth) {
    return null;
  }

  return (
    <footer id="main-footer" className="relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0a1f1d 0%, #0f1f1d 50%, #0a1a19 100%)',
    }}>
      {/* Animated gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, #14b8a6, #5eead4, #14b8a6, transparent)',
        opacity: 0.6,
      }} />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{
        background: 'radial-gradient(circle, rgba(94, 234, 212, 0.25), transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <img 
              src="/starthub.png" 
              width={150} 
              alt="StarHub" 
              className="mb-5"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: '#94a3b8' }}>
              Business intelligence, AI, and recruitment analysis — unified for startups.
            </p>

            {/* Social media icons with enhanced styling */}
            <div className="flex gap-3">
              <a
                href="#"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                }}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent 70%)',
                }} />
                <FiFacebook size={20} className="relative z-10" style={{ color: '#14b8a6' }} />
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                }}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent 70%)',
                }} />
                <FiInstagram size={20} className="relative z-10" style={{ color: '#14b8a6' }} />
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                }}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent 70%)',
                }} />
                <FiLinkedin size={20} className="relative z-10" style={{ color: '#14b8a6' }} />
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                }}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent 70%)',
                }} />
                <FaXTwitter size={18} className="relative z-10" style={{ color: '#14b8a6' }} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-5" style={{
              color: '#14b8a6',
              letterSpacing: '0.12em',
            }}>
              Platform
            </h3>
            <ul className="space-y-3">
              {['Features', 'Ecosystem', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Features' ? '/features' : item === 'Ecosystem' ? '/ecosystem' : '/plans'}
                    className="text-sm transition-colors duration-200 hover:text-[#14b8a6]"
                    style={{ color: '#cbd5e1', textDecoration: 'none' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-5" style={{
              color: '#14b8a6',
              letterSpacing: '0.12em',
            }}>
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Login'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'About Us' ? '/about' : item === 'Contact' ? '/contact-us' : '/login'}
                    className="text-sm transition-colors duration-200 hover:text-[#14b8a6]"
                    style={{ color: '#cbd5e1', textDecoration: 'none' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-5" style={{
              color: '#14b8a6',
              letterSpacing: '0.12em',
            }}>
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:hello@starthub.com"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#14b8a6]"
                  style={{ color: '#cbd5e1', textDecoration: 'none' }}
                >
                  <FiMail size={16} />
                  <span>hello@starthub.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8" style={{
          borderTop: '1px solid rgba(20, 184, 166, 0.12)',
        }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: '#64748b' }}>
              &copy; 2025 StarHub — All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs transition-colors duration-200 hover:text-[#14b8a6]" style={{ color: '#64748b', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs transition-colors duration-200 hover:text-[#14b8a6]" style={{ color: '#64748b', textDecoration: 'none' }}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[45] flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #14b8a6, #0f766e)',
            boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35), 0 0 0 0 rgba(20, 184, 166, 0.4)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        >
          <FiArrowUp size={22} className="text-white" />
        </button>
      )}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(20, 184, 166, 0.35), 0 0 0 0 rgba(20, 184, 166, 0.4);
          }
          50% {
            box-shadow: 0 8px 24px rgba(20, 184, 166, 0.35), 0 0 0 8px rgba(20, 184, 166, 0);
          }
        }
      `}</style>
    </footer>
  );
}