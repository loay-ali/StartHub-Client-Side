import Link from "next/link";

interface AuthSwitcherProps {
  text: string;
  buttonText: string;
  href: string;
}

export default function AuthSwitcher({ text, buttonText, href }: AuthSwitcherProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center border-t border-border pt-6 text-center">
      <p className="mb-4 text-sm font-medium text-text-secondary">{text}</p>
      <Link 
        href={href} 
        className="w-full rounded-xl border-2 border-primary px-4 py-3 text-center font-semibold text-primary transition-all duration-200 hover:bg-primary/5 hover:shadow-sm"
      >
        {buttonText}
      </Link>
    </div>
  );
}
