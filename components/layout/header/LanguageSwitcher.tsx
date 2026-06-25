'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'ar', label: 'العربية', nativeLabel: 'AR' },
  { code: 'fr', label: 'Français', nativeLabel: 'FR' },
];

export default function LanguageSwitcher() {
  const CURRENT_PATHNAME = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = CURRENT_PATHNAME.match(/(ar|en|fr)/)?.at(0) || 'en';

  function changeLanguage(lang: string) {
    router.replace(CURRENT_PATHNAME.replace(/(ar|en|fr)/, lang));
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeLanguage = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  return (
    <div ref={dropdownRef} className="relative z-50 text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-[#14b8a6]/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:border-[#14b8a6]/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20"
      >
        <FiGlobe className="h-4 w-4 text-slate-400" />
        <span>{activeLanguage.nativeLabel}</span>
        <FiChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-slate-100 bg-white/95 p-1.5 shadow-lg backdrop-blur-md focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="py-1 space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#14b8a6]/10 font-semibold text-[#14b8a6]'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-semibold opacity-60">{lang.nativeLabel}</span>
                    <span>{lang.label}</span>
                  </span>
                  {isSelected && <FiCheck className="h-3.5 w-3.5 text-[#14b8a6]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

