import * as React from "react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
            secondary: "bg-secondary text-white hover:bg-secondary/90",
            outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
            ghost: "hover:bg-accent/10 text-secondary",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base font-medium",
            lg: "px-8 py-4 text-lg font-semibold",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-wide",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
