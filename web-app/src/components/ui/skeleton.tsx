import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-100 dark:bg-[#112030] dark:bg-slate-800/50", className)}
      {...props}
    />
  )
}

function SkeletonTable({ rows = 5, cols = 5, className }: { rows?: number, cols?: number, className?: string }) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex w-full items-center justify-between border-b border-noble-border pb-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-1/5 max-w-[100px]" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex w-full items-center justify-between">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 w-1/5 max-w-[120px] rounded-lg" />
          ))}
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonTable }
