"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export type SmallTabsOption = {
  label: string;
  value: string;
};

export type SmallTabsProps = {
  options: SmallTabsOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};

// Sliding-pill spring — tune these.
// - duration: seconds, overall speed of the slide.
// - bounce: 0 = no overshoot (settles smoothly), up to 1 = very springy.
// See https://motion.dev/docs/react-transitions#spring for the physics-based
// alternative (stiffness / damping / mass) if you want finer control than
// duration + bounce gives you.
const indicatorTransition = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0.15,
};

export function SmallTabs({
  options,
  value,
  defaultValue,
  onChange,
  className = "",
}: SmallTabsProps) {
  const layoutId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value);
  const activeValue = value ?? internalValue;

  function handleSelect(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <div
      role="tablist"
      className={`relative inline-flex items-center gap-0.5 rounded-full bg-item-hover p-0.5 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === activeValue;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(option.value)}
            className="relative cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium"
          >
            {isActive && (
              <motion.div
                layoutId={`small-tabs-indicator-${layoutId}`}
                className="absolute inset-0 bg-item-active"
                style={{ borderRadius: 9999 }}
                transition={prefersReducedMotion ? { duration: 0 } : indicatorTransition}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-150 ease-out ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
