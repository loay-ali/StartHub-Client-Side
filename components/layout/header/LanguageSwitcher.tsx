'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';

import {
  LANGUAGES,
  getCurrentLocale,
  getActiveLanguage,
  buildLocalizedPath,
  shouldCloseDropdown,
} from './languageSwitcher.logic';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = getCurrentLocale(pathname);
  const activeLanguage = getActiveLanguage(pathname);

  const changeLanguage = (language: string) => {
    router.replace(buildLocalizedPath(pathname, language));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shouldCloseDropdown(
          dropdownRef.current,
          event.target as Node | null
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50 text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 rounded-2xl border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-slate-200 hover:bg-slate-100 focus:outline-none"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-teal-50 group-hover:text-teal-600">
          <FiGlobe className="h-3.5 w-3.5" />
        </div>

        <span className="transition-colors duration-300 group-hover:text-teal-600">
          {activeLanguage.nativeLabel}
        </span>

        <FiChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 group-hover:text-teal-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl duration-200">
          <div className="space-y-1">
            {LANGUAGES.map((language) => {
              const isSelected = language.code === currentLocale;

              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => changeLanguage(language.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-teal-50 font-bold text-teal-700'
                      : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] uppercase tracking-wider ${
                        isSelected
                          ? 'bg-teal-100 text-teal-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {language.nativeLabel}
                    </span>

                    <span>{language.label}</span>
                  </span>

                  {isSelected && (
                    <FiCheck
                      data-testid="selected-language"
                      className="h-4 w-4 text-teal-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}