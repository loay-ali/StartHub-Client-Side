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
        className="group flex items-center gap-2 rounded-2xl border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:border-slate-200 focus:outline-none"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600">
          <FiGlobe className="h-3.5 w-3.5" />
        </div>
        <span className="transition-colors duration-300 group-hover:text-indigo-600">{activeLanguage.nativeLabel}</span>
        <FiChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 group-hover:text-indigo-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] uppercase tracking-wider ${isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      {lang.nativeLabel}
                    </span>
                    <span>{lang.label}</span>
                  </span>
                  {isSelected && <FiCheck className="h-4 w-4 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
