import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-full font-display text-base font-normal leading-none tracking-[0.16px] cursor-pointer transition-all disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Figma: Filled-button / Color=Primary
        default:
          "bg-[#0e100e] text-white border-t-[0.5px] border-r-[1.5px] border-b-2 border-l-0 border-black hover:shadow-[0_1px_2px_rgba(0,0,0,0.6)] focus-visible:shadow-[0_1px_2px_rgba(0,0,0,0.6)] disabled:opacity-100 disabled:bg-[#a8a9a8] disabled:border-[#bcbcbc] disabled:text-[#828382]",
        // Figma: Filled-button / Color=White
        "filled-white":
          "bg-white text-[#0e100e] border-t-[0.5px] border-r-[1.5px] border-b-2 border-l-0 border-black hover:bg-[#bcbcbc] hover:shadow-[0_1px_2px_rgba(0,0,0,0.6)] focus-visible:bg-[#bcbcbc] focus-visible:shadow-[0_1px_2px_rgba(0,0,0,0.6)] disabled:opacity-100 disabled:bg-[#a8a9a8] disabled:border-[#bcbcbc] disabled:text-[#828382]",
        // Figma: Filled-button / Color=Transparent (for use over dark/image backgrounds)
        "filled-transparent":
          "bg-transparent text-white border-t-[0.5px] border-r-[1.5px] border-b-2 border-l-0 border-white hover:shadow-[0_1px_2px_rgba(0,0,0,0.6)] focus-visible:shadow-[0_1px_2px_rgba(0,0,0,0.6)] disabled:opacity-100 disabled:bg-[#a8a9a8] disabled:border-[#bcbcbc] disabled:text-[#828382]",
        // Figma: Outlined-button / Color=Primary
        outline:
          "bg-transparent text-[#0e100e] border-t-[0.5px] border-r-[1.5px] border-b-2 border-l-0 border-[#0e100e] hover:bg-[#070807] hover:text-white focus-visible:bg-[#070807] focus-visible:text-white disabled:opacity-100 disabled:bg-transparent disabled:border-[#bcbcbc] disabled:text-[#bcbcbc]",
        // Figma: Outlined-button / Color=White (for use over dark/image backgrounds)
        "outline-white":
          "bg-transparent text-white border-t-[0.5px] border-r-[1.5px] border-b-2 border-l-0 border-white hover:bg-white hover:text-[#0e100e] hover:border-[#e6e5e5] focus-visible:bg-white focus-visible:text-[#0e100e] focus-visible:border-[#e6e5e5] disabled:opacity-100 disabled:bg-transparent disabled:border-[#bcbcbc] disabled:text-[#bcbcbc]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:opacity-50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:opacity-50",
        link: "text-primary underline-offset-4 hover:underline disabled:opacity-50",
      },
      size: {
        default: "h-9 px-6 py-2.5 has-[>svg]:px-5",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        lg: "h-10 px-8 has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
