'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Закриваємо меню при кліку поза ним
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full relative"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col space-y-1 mb-3 text-center">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">Choose your look</h3>
            <p className="text-xs text-muted-foreground">Select your workspace appearance</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setTheme('light')
                setIsOpen(false)
              }}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                theme === 'light' ? 'border-primary bg-primary/10 ring-1 ring-primary text-foreground' : 'border-border bg-secondary/20 hover:border-border/80 text-muted-foreground'
              )}
            >
              <Sun className="size-4 text-amber-500" />
              <span className="text-[11px] font-medium">Light</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('dark')
                setIsOpen(false)
              }}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                theme === 'dark' ? 'border-primary bg-primary/10 ring-1 ring-primary text-foreground' : 'border-border bg-secondary/20 hover:border-border/80 text-muted-foreground'
              )}
            >
              <Moon className="size-4 text-indigo-400" />
              <span className="text-[11px] font-medium">Dark</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('system')
                setIsOpen(false)
              }}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                theme === 'system' ? 'border-primary bg-primary/10 ring-1 ring-primary text-foreground' : 'border-border bg-secondary/20 hover:border-border/80 text-muted-foreground'
              )}
            >
              <Monitor className="size-4 text-emerald-400" />
              <span className="text-[11px] font-medium">System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
