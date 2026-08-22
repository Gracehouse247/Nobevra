import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-[#006970] to-[#01A0E2] text-white font-extrabold shadow-[0_4px_14px_rgba(1,160,226,0.35)] hover:from-[#005a60] hover:to-[#018ec9] hover:shadow-[0_6px_20px_rgba(1,160,226,0.45)] hover:-translate-y-0.5 active:scale-[0.98] dark:from-[#006970] dark:to-[#01A0E2]",
        secondary: "bg-noble-surface dark:bg-noble-card border-2 border-noble-border text-noble-text hover:border-[#01A0E2] hover:text-[#01A0E2] active:scale-[0.98] dark:hover:border-[#01A0E2] dark:hover:text-[#01A0E2]",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow hover:shadow-lg active:scale-[0.98]",
        outline: "border border-noble-border bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] dark:hover:bg-slate-800 text-noble-text active:scale-[0.98]",
        ghost: "hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] dark:hover:bg-slate-800 text-noble-muted hover:text-noble-text active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
