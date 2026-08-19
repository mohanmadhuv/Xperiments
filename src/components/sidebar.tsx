"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { components } from "@/lib/registry";
import { projects } from "@/lib/projects";

// Matches Tailwind's `md` breakpoint — used only to pick the initial
// open/closed default, not to change any interaction or styling.
const DESKTOP_BREAKPOINT = 768;

// Drawer slide — animations.dev's Drawer/Sheet recipe: ease-out enter,
// faster exit, backdrop fades with the same timing as the panel.
const DRAWER_EASE = [0.32, 0.72, 0, 1] as const;
const enterTransition = { duration: 0.5, ease: DRAWER_EASE };
const exitTransition = { duration: 0.3, ease: DRAWER_EASE };

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

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4.5H14M2 8H14M2 11.5H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open sidebar"
      className="fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-md bg-panel text-muted-foreground shadow-panel transition-colors duration-0 hover:text-foreground"
    >
      <HamburgerIcon />
    </button>
  );
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
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
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  // Desktop defaults to open; mobile defaults to closed. This is the only
  // difference between the two — from here on it's identical, and only
  // changes when explicitly opened or dismissed.
  const [open, setOpen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches,
  );

  const drawerX = prefersReducedMotion ? 0 : "-100%";

  return (
    <>
      {!open && <SidebarTrigger onClick={() => setOpen(true)} />}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: enterTransition }}
              exit={{ opacity: 0, transition: exitTransition }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col overflow-hidden bg-panel shadow-panel"
              initial={{ x: drawerX, opacity: prefersReducedMotion ? 0 : 1 }}
              animate={{ x: 0, opacity: 1, transition: enterTransition }}
              exit={{ x: drawerX, opacity: prefersReducedMotion ? 0 : 1, transition: exitTransition }}
            >
              <div className="flex shrink-0 items-center justify-between px-3 py-6">
                <Link href="/" className="whitespace-nowrap pl-2 font-semibold tracking-tight">
                  DesEng Journal
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-0 hover:bg-item-hover hover:text-foreground"
                >
                  <ChevronIcon collapsed={false} />
                </button>
              </div>

              <SidebarNav pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
