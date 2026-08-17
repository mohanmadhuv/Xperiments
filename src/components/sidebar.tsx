"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { components } from "@/lib/registry";
import { projects } from "@/lib/projects";

function navLinkClass(isActive: boolean) {
  return `block rounded-md px-2 py-1.5 transition-colors duration-0 ${
    isActive
      ? "bg-item-active font-medium text-foreground"
      : "text-muted-foreground hover:bg-item-hover hover:text-foreground"
  }`;
}

function projectLinkClass(isActive: boolean) {
  return `block rounded-md px-2 py-1.5 text-foreground transition-colors duration-0 hover:bg-item-hover ${
    isActive ? "bg-item-active" : ""
  }`;
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ease-out ${collapsed ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      onClick={collapsed ? () => setCollapsed(false) : undefined}
      className={`relative z-10 flex h-full shrink-0 flex-col overflow-hidden bg-panel shadow-panel transition-[width] duration-200 ease-out ${
        collapsed ? "w-14 cursor-pointer" : "w-64"
      }`}
    >
      <div
        className={`flex shrink-0 items-center py-6 ${
          collapsed ? "justify-center px-0" : "justify-between px-3"
        }`}
      >
        {!collapsed && (
          <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
            UI Xperiments
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-0 hover:bg-item-hover hover:text-foreground"
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
      </div>

      {!collapsed && (
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          <div className="mb-6">
            <div className="px-2 pb-3 text-muted-foreground">Projects</div>
            <ul className="flex flex-col gap-0.5">
              {projects.map((project) => {
                const href = `/${project.slug}`;
                const isActive = pathname === href;

                return (
                  <li key={project.slug}>
                    <Link href={href} className={projectLinkClass(isActive)}>
                      {project.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="flex flex-col gap-0.5">
            {components.map((entry) => {
              const href = `/${entry.slug}`;
              const isActive = pathname === href;

              return (
                <li key={entry.slug}>
                  <Link href={href} className={navLinkClass(isActive)}>
                    {entry.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
}
