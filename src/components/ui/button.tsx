import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

const variantClasses = {
  primary: "bg-white text-black",
} as const;

export type ButtonVariant = keyof typeof variantClasses;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`flex min-w-[128px] shrink-0 cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-full px-4 py-[13px] text-base leading-[22px] font-medium transition-transform duration-150 ease-out motion-safe:active:scale-[var(--press-scale,0.97)] disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
