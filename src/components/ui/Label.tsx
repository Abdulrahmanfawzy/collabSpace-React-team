import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  
  "select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        error: "text-destructive",
        floating:
          "absolute -top-2.5 left-3.5 z-10 bg-background px-1.5 text-xs text-muted-foreground",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type LabelProps = React.ComponentProps<
  typeof LabelPrimitive.Root
> &
  VariantProps<typeof labelVariants>;

function Label({ className, variant, size, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Label, labelVariants };