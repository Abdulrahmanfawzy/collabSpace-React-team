import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 transition-colors", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    variant: {
      default: "bg-border",
      muted: "bg-muted",
      gray: "bg-gray-200",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export type SeparatorProps = React.ComponentProps<
  typeof SeparatorPrimitive.Root
> &
  VariantProps<typeof separatorVariants>;

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation, variant, className }))}
      {...props}
    />
  );
}

export { Separator, separatorVariants };