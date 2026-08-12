import * as React from "react"
import { cn } from "@/lib/utils"

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1600px] px-6 py-6 md:px-8 md:py-8", className)}>
      {children}
    </div>
  )
}
