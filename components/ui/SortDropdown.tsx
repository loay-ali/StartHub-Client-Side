'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface SortOption<T extends string> {
  value: T;
  label: string;
}

interface SortDropdownProps<T extends string> {
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
}

export default function SortDropdown<T extends string>({ value, options, onChange }: SortDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLabel = options.find((o) => o.value === value)?.label ?? '';

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:border-[#14b8a6]/50 transition-colors whitespace-nowrap"
      >
        <ArrowUpDown size={14} className="opacity-60" />
        <span>{activeLabel}</span>
        <ChevronDown size={13} className={`opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            className="absolute end-0 top-[calc(100%+8px)] w-52 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 z-10"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                role="menuitem"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-start text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-[#14b8a6] transition-colors"
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check size={14} className="text-[#14b8a6]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}