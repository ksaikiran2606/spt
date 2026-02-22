"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
    const variants = {
      primary:
        "bg-[var(--navy-primary)] text-white hover:bg-[var(--navy-light)] hover:shadow-[0_4px_12px_rgba(106,90,205,0.3)]",
      secondary:
        "bg-white text-[var(--navy-primary)] border-2 border-[var(--navy-primary)] hover:bg-[var(--navy-primary)] hover:text-white",
      ghost:
        "text-[var(--text-body)] hover:bg-[var(--bg-alt)] hover:text-[var(--navy-primary)]",
      outline:
        "border-2 border-[var(--navy-primary)] text-[var(--navy-primary)] hover:bg-[var(--navy-primary)] hover:text-white",
    };
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
