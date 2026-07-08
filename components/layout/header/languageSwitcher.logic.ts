export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "EN" },
  { code: "ar", label: "العربية", nativeLabel: "AR" },
  { code: "fr", label: "Français", nativeLabel: "FR" },
];

const LOCALE_REGEX = /^\/(ar|en|fr)(?=\/|$)/;

export function getCurrentLocale(pathname: string): string {
  const match = pathname.match(LOCALE_REGEX);

  return match?.[1] ?? "en";
}

export function getActiveLanguage(
  pathname: string,
  languages: Language[] = LANGUAGES
): Language {
  const locale = getCurrentLocale(pathname);

  return (
    languages.find((language) => language.code === locale) ??
    languages[0]
  );
}

export function buildLocalizedPath(
  pathname: string,
  language: string
) {
  if (LOCALE_REGEX.test(pathname)) {
    return pathname.replace(LOCALE_REGEX, `/${language}`);
  }

  return `/${language}${pathname}`;
}

export function shouldCloseDropdown(
  dropdown: HTMLElement | null,
  target: Node | null
): boolean {
  if (!dropdown || !target) return true;

  return !dropdown.contains(target);
}