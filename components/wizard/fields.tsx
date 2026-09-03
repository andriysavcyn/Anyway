'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

const base =
  'w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-[border-color,box-shadow] focus:border-primary/60 focus:ring-2 focus:ring-primary/25'

export function TextInput({
  value,
  onChange,
  placeholder,
  className,
  shimmer,
  inputMode,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  shimmer?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const id = useId()
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-label={placeholder}
        className={cn(base, 'h-10', className)}
      />
      {shimmer && <Shimmer />}
    </div>
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  shimmer,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  shimmer?: boolean
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-label={placeholder}
        className={cn(base, 'resize-none py-2.5 leading-relaxed')}
      />
      {shimmer && <Shimmer />}
    </div>
  )
}

function Shimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-lg bg-[linear-gradient(90deg,transparent,oklch(0.62_0.22_282/18%),transparent)] bg-[length:200%_100%] animate-shimmer"
    />
  )
}
