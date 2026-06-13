"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { FiChevronDown } from "react-icons/fi";

import { SidebarLinkItem } from "@/types/sidebar";

interface SidebarLinkProps {
  item: SidebarLinkItem;
  collapsed?: boolean;
}

export default function SidebarLink({
  item,
  collapsed = false,
}: SidebarLinkProps) {
  const pathname = usePathname();

  const [expanded, setExpanded] = useState(true);

  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const hasChildren = item.children && item.children.length > 0;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        className={clsx(
          "flex justify-center rounded-xl px-4 py-3 transition-all duration-200",
          isActive
            ? "bg-primary-light text-primary-dark"
            : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
        )}
      >
        {item.icon}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={clsx(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200",
          isActive
            ? "bg-primary-light text-primary-dark"
            : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-lg">{item.icon}</span>}

          <span className="font-medium">{item.title}</span>
        </div>

        {hasChildren ? (
          <FiChevronDown
            className={clsx(
              "transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        ) : (
          item.badge && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-200 px-2 text-xs font-semibold text-slate-700">
              {item.badge}
            </span>
          )
        )}
      </button>

      {hasChildren && expanded && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children?.map((child) => {
            const childActive = pathname === child.href;

            return (
              <Link
                key={child.href}
                href={child.href}
                className={clsx(
                  "block rounded-lg px-3 py-2 text-sm transition",
                  childActive
                    ? "bg-primary-light text-primary-dark"
                    : "text-text-secondary hover:bg-slate-100",
                )}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
