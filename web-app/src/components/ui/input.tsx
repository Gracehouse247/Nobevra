import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-noble-border bg-noble-surface dark:bg-noble-card px-4 py-2 text-sm text-noble-text ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-noble-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noble-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error && "border-red-500 ring-red-500/20 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
