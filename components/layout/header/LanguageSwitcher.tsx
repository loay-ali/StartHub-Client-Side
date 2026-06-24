'use client';

import { useRouter,usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const CURRENT_PATHNAME = usePathname();
  const router = useRouter();
  
  function changeLanguage(lang:string) {
    router.replace(CURRENT_PATHNAME.replace(/(ar|en|fr)/,lang));
  }

  return (
    <select defaultValue = {CURRENT_PATHNAME.match(/(ar|en|fr)/)?.at(0)} onChange = {(event) => changeLanguage(event.target.value)} className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none">
      <option value="en">EN</option>
      <option value="ar">AR</option>
      <option value="fr">FR</option>
    </select>
  );
}
