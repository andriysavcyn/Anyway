'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Check,
  Download,
  Link2,
  Maximize2,
  Pause,
  Play,
  Plus,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/dashboard/dashboard'
import { AiChat } from '@/components/studio/ai-chat'
import { cn } from '@/lib/utils'
import type { ProductDNA, Project } from '@/lib/studio-data'

const TOTAL = 38

export function Result({
  project,
  dna,
  onBack,
  onNew,
}: {
  project: Project | null
  dna: ProductDNA
  onBack: () => void
  onNew: () => void
}) {
  const [playing, setPlaying] = useState(true)
  const [t, setT] = useState(0)
  const [copied, setCopied] = useState(false)
  const [accent, setAccent] = useState('oklch(0.62 0.22 282)')
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setT((v) => (v + 0.1 * speed) % TOTAL), 100)
    return () => clearInterval(id)
  }, [playing, speed])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://anyway.ai/v/${project?.id ?? 'demo'}`)
    } catch {
      /* clipboard unavailable in some iframes */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`
  const title = project?.name ?? `${dna.productName || 'Untitled'} Launch`

  return (
    <div className="animate-fade-up mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Back to projects"
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              <StatusBadge status="Ready" />
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {project?.id ?? 'TSK-DEMO01'} · 4K · {fmt(TOTAL)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={copy}
            className="gap-2 rounded-full border-border bg-transparent hover:bg-secondary"
          >
            {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
            {copied ? 'Copied' : 'Copy Link'}
          </Button>
          <Button className="glow-shadow gap-2 rounded-full px-5">
            <Download className="size-4" />
            Download MP4
          </Button>
          <Button variant="ghost" onClick={onNew} className="gap-2 rounded-full text-muted-foreground">
            <Plus className="size-4" /> New
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 flex-1 gap-5 lg:grid-cols-3">
        {/* Player */}
        <section className="flex flex-col gap-4 lg:col-span-2 min-w-0">
          <div className="glow-shadow relative aspect-video overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            <Image
              src="/showcase/after.png"
              alt="Rendered marketing video preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className={cn('object-cover transition-transform duration-[6000ms] ease-linear', playing && 'scale-105')}
            />
            {/* accent overlay tint driven by chat */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color transition-colors duration-700"
              style={{ background: accent, opacity: 0.25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

            {/* Caption overlay */}
            <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-2 px-6 text-center">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary-foreground uppercase transition-colors duration-700"
                style={{ background: accent }}
              >
                {dna.productName || 'LaunchFlow'}
              </span>
              <p className="max-w-lg text-balance text-lg font-semibold tracking-tight drop-shadow sm:text-2xl">
                {t < 12
                  ? `Meet ${dna.productName || 'the future of launch videos'}.`
                  : t < 26
                    ? dna.feature || 'Every frame on brand. Every cut on beat.'
                    : dna.benefit || 'Ship the video before the meeting ends.'}
              </p>
            </div>

            {/* Play big */}
            {!playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-foreground text-background shadow-2xl">
                  <Play className="ml-1 size-6 fill-current" />
                </span>
              </button>
            )}

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
              <div
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={TOTAL}
                aria-valuenow={Math.round(t)}
                tabIndex={0}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  setT(((e.clientX - r.left) / r.width) * TOTAL)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') setT((v) => Math.max(0, v - 2))
                  if (e.key === 'ArrowRight') setT((v) => Math.min(TOTAL, v + 2))
                }}
                className="group relative h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-foreground/20 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div
                  className="h-full rounded-full transition-colors duration-700"
                  style={{ width: `${(t / TOTAL) * 100}%`, background: accent }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? 'Pause' : 'Play'}
                    className="flex size-8 items-center justify-center rounded-full bg-foreground/10 backdrop-blur hover:bg-foreground/20"
                  >
                    {playing ? <Pause className="size-3.5 fill-current" /> : <Play className="ml-0.5 size-3.5 fill-current" />}
                  </button>
                  <Volume2 className="size-4 text-foreground/70" />
                  <span className="font-mono text-foreground/80">
                    {fmt(t)} / {fmt(TOTAL)}
                  </span>
                  {speed !== 1 && (
                    <span className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px]">
                      {speed}
                    </span>
                  )}
                </div>
                <Maximize2 className="size-4 text-foreground/70" />
              </div>
            </div>
          </div>

          {/* Scene strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
            {['Hook', 'Problem', 'Product', 'Feature', 'CTA'].map((s, i) => {
              const start = (TOTAL / 5) * i
              const active = t >= start && t < start + TOTAL / 5
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setT(start + 0.01)}
                  className={cn(
                    'relative aspect-video min-w-[100px] shrink-0 overflow-hidden rounded-lg ring-1 transition-all sm:min-w-0 sm:shrink',
                    active ? 'ring-primary' : 'ring-border opacity-70 hover:opacity-100',
                  )}
                  aria-label={`Jump to ${s} scene`}
                >
                  <Image
                    src={i % 2 === 0 ? '/showcase/after.png' : '/thumbs/saas.png'}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100px, 20vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-2 py-1 text-left text-[10px] font-medium">
                    {s}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Interactive Multi-Track Timeline Editor - Hidden on mobile as requested */}
          <div className="hidden sm:block rounded-2xl border border-border bg-card/60 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                  Interactive Multi-Track Timeline
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground">
                Scroll / Tap
              </span>
            </div>

            <div className="overflow-x-auto pb-1 no-scrollbar">
              <div className="min-w-[320px] space-y-3 select-none w-full">
                {/* Track 1: Video Scenes */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5 shrink-0">
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    Video
                  </span>
                  <div
                    className="relative w-full h-8 rounded-lg bg-secondary/50 border border-border/60 overflow-hidden flex cursor-pointer"
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      setT(((e.clientX - r.left) / r.width) * TOTAL)
                    }}
                  >
                    {[
                      { short: 'Hook', long: 'Hook (0-7s)' },
                      { short: 'Prob', long: 'Problem (7-15s)' },
                      { short: 'Prod', long: 'Product (15-22s)' },
                      { short: 'Feat', long: 'Feature (22-30s)' },
                      { short: 'CTA', long: 'CTA (30-38s)' },
                    ].map((item, idx) => (
                      <div
                        key={item.short}
                        className={cn(
                          'flex-1 h-full border-r border-border/60 px-0.5 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-medium truncate',
                          idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/80 text-foreground/80'
                        )}
                        title={item.long}
                      >
                        <span className="sm:hidden">{item.short}</span>
                        <span className="hidden sm:inline">{item.long}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track 2: Audio Waveform */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5 shrink-0">
                    <span className="size-1.5 rounded-full bg-purple-500" />
                    Voice
                  </span>
                  <div
                    className="relative w-full h-8 rounded-lg bg-secondary/30 border border-border/40 overflow-hidden flex items-center px-2 cursor-pointer"
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      setT(((e.clientX - r.left) / r.width) * TOTAL)
                    }}
                  >
                    <div className="w-full flex items-center gap-0.5 opacity-80">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full bg-purple-400/60 transition-all"
                          style={{ height: `${Math.sin(i * 0.5) * 10 + 12}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Track 3: Captions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5 shrink-0">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Captions
                  </span>
                  <div
                    className="relative w-full h-8 rounded-lg bg-secondary/20 border border-border/30 overflow-hidden flex items-center gap-1.5 px-2 cursor-pointer"
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      setT(((e.clientX - r.left) / r.width) * TOTAL)
                    }}
                  >
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400 border border-emerald-500/20 shrink-0">
                      Subs
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground truncate flex-1">
                      "Transform screencasts into cinematic marketing videos..."
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <Stat label="Resolution" value="3840 × 2160" />
            <Stat label="Narration" value="Studio · Confident" />
            <Stat label="Music" value="Neon Horizon · 118 bpm" />
          </div>
        </section>

        {/* AI chat */}
        <div className="lg:col-span-1 min-w-0">
          <AiChat
            onAccent={setAccent}
            onSpeed={setSpeed}
            productName={dna.productName}
          />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-xs text-foreground">{value}</p>
    </div>
  )
}
