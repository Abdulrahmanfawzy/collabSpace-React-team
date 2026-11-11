import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full bg-[#F9FAFB] text-sm text-foreground transition-all outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input rounded-xl focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 shadow-xs",
        outline:
          "border border-gray-300 rounded-xl focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary",
        error:
          "border border-destructive rounded-xl text-destructive focus-visible:border-destructive focus-visible:ring-1 focus-visible:ring-destructive",
        filled:
          "border border-transparent bg-muted/50 rounded-xl focus-visible:bg-background focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600",
      },
      size: {
        default: "h-11 px-3.5 py-2 text-sm",
        sm: "h-9 px-3 py-1.5 text-xs rounded-lg",
        lg: "h-12 px-4 py-3 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function Input({
  className,
  variant,
  size,
  type = "text",
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  if (startIcon || endIcon) {
    return (
      <div className="relative w-full flex items-center">
        {startIcon && (
          <span className="absolute left-3.5 text-muted-foreground pointer-events-none flex items-center justify-center">
            {startIcon}
          </span>
        )}
        <input
          data-slot="input"
          type={type}
          className={cn(
            inputVariants({ variant, size }),
            startIcon && "pl-11",
            endIcon && "pr-11",
            className,
          )}
          {...props}
        />
        {endIcon && (
          <span className="absolute right-3.5 text-muted-foreground flex items-center justify-center">
            {endIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}
export { Input, inputVariants };
