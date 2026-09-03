'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronsLeftRight, Play } from 'lucide-react'

export function BeforeAfter() {
  const [pos, setPos] = useState(58)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const update = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPos((x / rect.width) * 100)
  }, [])

  return (
    <div className="relative">
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2rem] opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 60%, oklch(0.62 0.22 282 / 35%), transparent 70%)',
        }}
      />
      <div
        ref={ref}
        role="slider"
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
        }}
        onPointerDown={(e) => {
          setDragging(true)
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          update(e.clientX)
        }}
        onPointerMove={(e) => dragging && update(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="glass relative aspect-video w-full cursor-col-resize touch-none overflow-hidden rounded-2xl select-none outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* After (full) */}
        <Image
          src="/showcase/after.png"
          alt="Cinematic AI-generated marketing video frame"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Before (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src="/showcase/before.png"
            alt="Plain website screenshot before transformation"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>

        {/* labels */}
        <Label side="left">Your website</Label>
        <Label side="right">AI marketing video</Label>

        {/* Play chip */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs backdrop-blur-md ring-1 ring-border">
          <span className="brand-gradient flex size-5 items-center justify-center rounded-full">
            <Play className="size-2.5 fill-current text-primary-foreground" />
          </span>
          <span className="font-mono text-muted-foreground">00:38 · 4K · 24fps</span>
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 w-px bg-foreground/80 shadow-[0_0_20px_2px_var(--glow)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-xl">
            <ChevronsLeftRight className="size-4" />
          </div>
        </div>

        {/* scan line effect on the "after" side */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 h-px animate-scan bg-gradient-to-r from-transparent via-glow-2 to-transparent"
          style={{ left: `${pos}%` }}
        />
      </div>
    </div>
  )
}

function Label({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <span
      className={`pointer-events-none absolute top-4 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur-md ring-1 ring-border ${
        side === 'left'
          ? 'left-4 bg-background/70 text-muted-foreground'
          : 'right-4 brand-gradient text-primary-foreground ring-transparent'
      }`}
    >
      {children}
    </span>
  )
}
