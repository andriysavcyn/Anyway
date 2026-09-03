'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon, Monitor, GraduationCap, Megaphone, Brush, Briefcase, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (name: string, email: string) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
// clean 
  const [step, setStep] = useState(1)
  const [name, setName] = useState('Alex Smith')
  const [email, setEmail] = useState('alex@anyway.ai')
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme()
  const theme = nextTheme === 'system' ? 'auto' : (nextTheme || 'dark')
  const [role, setRole] = useState<string>('Marketer')
  const [isSocialLoading, setIsSocialLoading] = useState(false)

  if (!isOpen) return null

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (step < 3) {
      setStep((prev) => prev + 1)
    } else {
      onLogin(name, email)
      onClose()
    }
  }

  const handleSocialAuth = (provider: string) => {
    setIsSocialLoading(true)
    setTimeout(() => {
      setIsSocialLoading(false)
      setName('Alex Smith')
      setEmail(`user@${provider.toLowerCase()}.com`)
      setStep(2)
    }, 1500)
  }

  const changeTheme = (t: 'light' | 'dark' | 'auto') => {
    setNextTheme(t === 'auto' ? 'system' : t)
  }

  const roles = [
    { id: 'Student', label: 'Student', icon: GraduationCap },
    { id: 'Marketer', label: 'Marketer', icon: Megaphone },
    { id: 'Designer', label: 'Designer', icon: Brush },
    { id: 'Founder', label: 'Founder', icon: Briefcase },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Step Indicator */}
        <div className="flex justify-center gap-1.5 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                s === step ? 'w-8 bg-primary' : s < step ? 'w-3 bg-primary/40' : 'w-3 bg-secondary'
              )}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center text-center space-y-2 mb-6">
              <div className="brand-gradient relative flex size-12 items-center justify-center rounded-xl shadow-[0_0_30px_-4px_var(--glow)]">
                <Sparkles className="size-6 text-primary-foreground" strokeWidth={2.4} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">Create your account</h2>
              <p className="text-sm text-muted-foreground">Get started with AnyWay AI in seconds</p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-muted-foreground">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Smith"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-muted-foreground">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-10 gap-2 font-medium">
                Continue
                <ChevronRight className="size-4" />
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center text-center space-y-2 mb-6">
              <h2 className="text-xl font-semibold tracking-tight">Choose your look</h2>
              <p className="text-sm text-muted-foreground">Select your workspace appearance</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => changeTheme('light')}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all',
                  theme === 'light' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-secondary/20 hover:border-border/80'
                )}
              >
                <Sun className="size-5 text-amber-500" />
                <span className="text-xs font-medium">Light</span>
              </button>
              <button
                type="button"
                onClick={() => changeTheme('dark')}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all',
                  theme === 'dark' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-secondary/20 hover:border-border/80'
                )}
              >
                <Moon className="size-5 text-indigo-400" />
                <span className="text-xs font-medium">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => changeTheme('auto')}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all',
                  theme === 'auto' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-secondary/20 hover:border-border/80'
                )}
              >
                <Monitor className="size-5 text-emerald-400" />
                <span className="text-xs font-medium">System</span>
              </button>
            </div>

            <Button onClick={() => handleNext()} className="w-full h-10 gap-2 font-medium">
              Next Step
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center text-center space-y-2 mb-6">
              <h2 className="text-xl font-semibold tracking-tight">Tell us about yourself</h2>
              <p className="text-sm text-muted-foreground">How will you be using AnyWay AI?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {roles.map((r) => {
                const Icon = r.icon
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all',
                      role === r.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-secondary/20 hover:border-border/80'
                    )}
                  >
                    <span className={cn('p-1.5 rounded-lg bg-secondary', role === r.id && 'bg-primary/10 text-primary')}>
                      <Icon className="size-4" />
                    </span>
                    <span className="text-xs font-semibold mt-1">{r.label}</span>
                  </button>
                )
              })}
            </div>

            <Button onClick={() => handleNext()} className="w-full h-10 gap-2 font-medium glow-shadow">
              Complete Onboarding
              <Sparkles className="size-4" />
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  )
}