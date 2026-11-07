import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 border transition-all outline-none cursor-pointer flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white focus-visible:ring-blue-600/40",
        primary:
          "border-input bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground focus-visible:ring-ring",
        error:
          "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive text-white focus-visible:ring-destructive/40",
      },
     
      size: {
        default: "size-4.5 rounded-[5px] [&_svg]:size-3.5",
        sm: "size-3.5 rounded-sm [&_svg]:size-2.5",
        lg: "size-5 rounded-md [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type CheckboxProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxVariants>;

function Checkbox({
  className,
  variant,
  size,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <Check className="stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };