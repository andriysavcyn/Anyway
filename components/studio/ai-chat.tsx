'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Bot, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Msg {
  id: number
  role: 'user' | 'ai'
  text: string
  pending?: boolean
}

const suggestions = ['Make it slower', 'Change accent color to teal', 'Punchier hook', 'Add subtitles']

export function AiChat({
  onAccent,
  onSpeed,
  productName,
}: {
  onAccent: (c: string) => void
  onSpeed: (s: number) => void
  productName: string
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: 'ai',
      text: `Your ${productName || 'launch'} video is rendered. Tell me what to tweak — pacing, colors, copy, music — in plain English.`,
    },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const respond = (q: string): string => {
    const s = q.toLowerCase()
    if (s.includes('slow')) {
      onSpeed(0.75)
      return 'Slowed the cut rhythm by 25% and stretched the hero zoom. Narration re-timed to match.'
    }
    if (s.includes('fast') || s.includes('quick')) {
      onSpeed(1.5)
      return 'Tightened the edit — shorter holds, snappier transitions. Now running 1.5× pace.'
    }
    if (s.includes('teal') || s.includes('cyan')) {
      onAccent('oklch(0.78 0.14 200)')
      return 'Swapped the accent to teal across captions, lower-thirds, and the logo sting.'
    }
    if (s.includes('orange') || s.includes('warm')) {
      onAccent('oklch(0.75 0.18 55)')
      return 'Warmed the palette — accent is now a sunset orange. Music EQ nudged brighter to match.'
    }
    if (s.includes('pink') || s.includes('magenta')) {
      onAccent('oklch(0.7 0.22 350)')
      return 'Accent changed to magenta. Kept your brand primary for the CTA button so it stays on-brand.'
    }
    if (s.includes('purple') || s.includes('violet') || s.includes('reset')) {
      onAccent('oklch(0.62 0.22 282)')
      onSpeed(1)
      return 'Reset to your original brand accent and pacing.'
    }
    if (s.includes('hook') || s.includes('punch')) {
      return `Rewrote the opener: “Stop managing work. Start shipping ${productName || 'it'}.” Want two more variants?`
    }
    if (s.includes('subtitle') || s.includes('caption')) {
      return 'Added burned-in subtitles with word-level timing, styled in your brand type. Toggle them off anytime.'
    }
    if (s.includes('music') || s.includes('song') || s.includes('track')) {
      return 'Swapped the score for “Glass Orbit” — same 118 bpm, softer synths, cleaner under narration.'
    }
    return 'On it — I applied that to the timeline. Preview refreshes as soon as the partial re-render lands (~8s).'
  }

  const send = (text: string) => {
    const q = text.trim()
    if (!q || busy) return
    setInput('')
    setBusy(true)
    const id = Date.now()
    setMessages((m) => [
      ...m,
      { id, role: 'user', text: q },
      { id: id + 1, role: 'ai', text: '', pending: true },
    ])
    setTimeout(() => {
      const answer = respond(q)
      setMessages((m) => m.map((x) => (x.id === id + 1 ? { ...x, text: answer, pending: false } : x)))
      setBusy(false)
    }, 1100)
  }

  return (
    <aside className="glass flex h-[500px] lg:h-[640px] flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="brand-gradient flex size-7 items-center justify-center rounded-lg">
          <Bot className="size-3.5 text-primary-foreground" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium">AI Editor</p>
          <p className="text-[11px] text-muted-foreground">Edits apply live to the preview</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success ring-1 ring-success/30">
          <span className="size-1.5 rounded-full bg-success" /> live
        </span>
      </div>

      <div className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'animate-fade-up max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
              m.role === 'user'
                ? 'brand-gradient self-end rounded-br-md text-primary-foreground'
                : 'self-start rounded-bl-md bg-secondary text-foreground ring-1 ring-border',
            )}
          >
            {m.pending ? <Dots /> : m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex flex-col gap-3 border-t border-border p-3">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 rounded-xl border border-input bg-background/60 pr-1.5 pl-3 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/25"
        >
          <Sparkles className="size-4 shrink-0 text-primary" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Make it slower, change accent color…"
            aria-label="Message the AI editor"
            className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={!input.trim() || busy}
            aria-label="Send"
            className="brand-gradient flex size-7 items-center justify-center rounded-lg text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <ArrowUp className="size-3.5" />
          </button>
        </form>
      </div>
    </aside>
  )
}

function Dots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  )
}
