import * as React from "react";
import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = true, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-white border border-secondary/10 rounded-2xl p-6 transition-all duration-500",
                    hoverEffect && "hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2 hover:border-accent/20",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
