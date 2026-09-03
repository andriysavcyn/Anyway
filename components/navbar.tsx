'use client'

import { useState } from 'react'
import { Sparkles, User, FolderKanban, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar({ view, onNavigate, onGetStarted, user, onOpenAuth, onLogout }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNav = (v: string) => {
    setMobileMenuOpen(false)
    onNavigate(v)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => handleNav(user ? 'dashboard' : 'landing')} className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="size-6 text-primary" />
          <span>LaunchFlow</span>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => handleNav('landing')} className={`transition-colors hover:text-foreground ${view === 'landing' ? 'text-foreground' : 'text-muted-foreground'}`}>About</button>
          <button onClick={() => { handleNav('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50) }} className="transition-colors hover:text-foreground text-muted-foreground">Features</button>
          <button onClick={() => { handleNav('landing'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 50) }} className="transition-colors hover:text-foreground text-muted-foreground">Stories</button>
          <button onClick={() => handleNav('pricing')} className={`transition-colors hover:text-foreground ${view === 'pricing' ? 'text-foreground' : 'text-muted-foreground'}`}>Pricing</button>
          {user && (
            <button onClick={() => handleNav('dashboard')} className={`flex items-center gap-1.5 transition-colors hover:text-foreground ${view === 'dashboard' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <FolderKanban className="size-4" />
              <span>My Projects</span>
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="size-4" />}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout} className="rounded-full">
                Log Out
              </Button>
            </div>
          ) : (
            <Button onClick={onOpenAuth} size="sm" className="rounded-full brand-gradient text-white">
              Get Started
            </Button>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <button onClick={() => handleNav('landing')} className={`text-left transition-colors hover:text-foreground ${view === 'landing' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>About</button>
            <button onClick={() => { handleNav('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50) }} className="text-left transition-colors hover:text-foreground text-muted-foreground">Features</button>
            <button onClick={() => { handleNav('landing'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 50) }} className="text-left transition-colors hover:text-foreground text-muted-foreground">Stories</button>
            <button onClick={() => handleNav('pricing')} className={`text-left transition-colors hover:text-foreground ${view === 'pricing' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Pricing</button>
            {user && (
              <button onClick={() => handleNav('dashboard')} className={`flex items-center gap-2 text-left transition-colors hover:text-foreground ${view === 'dashboard' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                <FolderKanban className="size-4" />
                <span>My Projects</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

