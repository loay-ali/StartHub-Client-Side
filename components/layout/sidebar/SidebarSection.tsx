interface SidebarSectionProps {
  title: string;
}

export default function SidebarSection({ title }: SidebarSectionProps) {
  return (
    <h2 className="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
      {title}
    </h2>
  );
}
