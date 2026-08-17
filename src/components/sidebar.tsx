"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/registry";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative z-10 flex h-full w-64 shrink-0 flex-col bg-panel shadow-panel">
      <div className="px-5 py-6">
        <Link href="/" className="font-semibold tracking-tight">
          Xperiments
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="flex flex-col gap-0.5">
          {components.map((entry) => {
            const href = `/${entry.slug}`;
            const isActive = pathname === href;

            return (
              <li key={entry.slug}>
                <Link
                  href={href}
                  className={`block rounded-md px-2 py-1.5 transition-colors ${
                    isActive
                      ? "bg-item-active font-medium text-foreground"
                      : "text-muted-foreground hover:bg-item-hover hover:text-foreground"
                  }`}
                >
                  {entry.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
