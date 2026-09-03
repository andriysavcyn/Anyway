'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Anchor,
  AudioLines,
  Building2,
  Check,
  Clapperboard,
  LayoutTemplate,
  Layers,
  Mic,
  Music,
  Palette,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { type PipelineStep, type ProductDNA, type Project, pipelineSteps } from '@/lib/studio-data'

const icons: Record<PipelineStep['icon'], React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  mic: Mic,
  building: Building2,
  anchor: Anchor,
  music: Music,
  sparkles: Sparkles,
  layout: LayoutTemplate,
  audio: AudioLines,
  layers: Layers,
  clapper: Clapperboard,
}

export function Processing({
  project,
  dna,
  onComplete,
}: {
  project: Project | null
  dna: ProductDNA
  onComplete: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)

  const total = useMemo(() => pipelineSteps.reduce((a, s) => a + s.duration, 0), [])
  const elapsedBefore = useMemo(
    () => pipelineSteps.slice(0, current).reduce((a, s) => a + s.duration, 0),
    [current],
  )

  useEffect(() => {
    if (current >= pipelineSteps.length) {
      setDone(true)
      const t = setTimeout(onComplete, 1400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), pipelineSteps[current].duration)
    return () => clearTimeout(t)
  }, [current, onComplete])

  const [viewMode, setViewMode] = useState<'list' | 'graph'>('graph')
  const [selectedNode, setSelectedNode] = useState<number | null>(null)

  const pct = Math.min(100, Math.round((elapsedBefore / total) * 100))
  const active = pipelineSteps[Math.min(current, pipelineSteps.length - 1)]

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-1000',
          done ? 'opacity-90' : 'opacity-50',
        )}
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.62 0.22 282 / 40%), oklch(0.7 0.2 305 / 15%), transparent)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:py-16">
        {/* Left: stage */}
        <div className="flex flex-col items-center justify-start text-center lg:col-span-2 lg:items-start lg:text-left">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {project?.id ?? 'TSK-000000'} · rendering
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {done ? (
              <span className="text-gradient">Your masterpiece is ready.</span>
            ) : (
              <>
                Crafting{' '}
                <span className="text-gradient">{dna.productName || 'your'}</span> launch video
              </>
            )}
          </h1>
          <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {done
              ? 'Handing off to the studio…'
              : 'Ten specialized models are collaborating on this render. Sit back — this usually takes about a minute.'}
          </p>

          {/* Orb */}
          <div className="relative mt-10 flex size-44 items-center justify-center sm:size-52">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/40" />
            <span
              className="absolute inset-0 animate-pulse-ring rounded-full border border-glow-2/40"
              style={{ animationDelay: '0.7s' }}
            />
            <span className="glass absolute inset-4 rounded-full" />
            <svg className="absolute inset-4 -rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="46" fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="2" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#ring)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 46}`}
                strokeDashoffset={`${2 * Math.PI * 46 * (1 - (done ? 100 : pct) / 100)}`}
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.22 282)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.2 305)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative flex flex-col items-center">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">
                {done ? 100 : pct}
                <span className="text-lg text-muted-foreground">%</span>
              </span>
              <span className="mt-1 text-[11px] text-muted-foreground">
                Stage {Math.min(current + 1, pipelineSteps.length)} / {pipelineSteps.length}
              </span>
            </div>
          </div>

          {/* current label */}
          <div key={active.id} className="animate-fade-up mt-8 flex items-center gap-3">
            <span className="brand-gradient flex size-9 items-center justify-center rounded-xl">
              {done ? (
                <Check className="size-4 text-primary-foreground" />
              ) : (
                <ActiveIcon icon={active.icon} />
              )}
            </span>
            <div className="text-left">
              <p className="text-sm font-medium">{done ? 'Render complete' : active.label}</p>
              <p className="text-xs text-muted-foreground">{done ? 'Encoded 4K master' : active.detail}</p>
            </div>
          </div>
        </div>

        {/* Right: timeline / node graph */}
        <div className="flex flex-col lg:col-span-3 min-w-0 w-full">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              AI Pipeline Engine
            </span>
            <div className="flex rounded-lg bg-secondary p-0.5 text-xs w-fit">
              <button
                type="button"
                onClick={() => setViewMode('graph')}
                className={cn(
                  'rounded-md px-3 py-1 font-medium transition-all',
                  viewMode === 'graph' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Node Graph
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded-md px-3 py-1 font-medium transition-all',
                  viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                List
              </button>
            </div>
          </div>

          {viewMode === 'graph' ? (
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl border border-primary/20 bg-card/60 p-4 min-h-[260px] flex flex-col justify-between overflow-hidden">
                <div className="grid grid-cols-5 gap-2 relative z-10">
                  {pipelineSteps.slice(0, 5).map((step, i) => {
                    const state = done || i < current ? 'done' : i === current ? 'active' : 'pending'
                    const Icon = icons[step.icon]
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setSelectedNode(i)}
                        className={cn(
                          'flex flex-col items-center p-2 rounded-xl border text-center transition-all',
                          state === 'done' && 'border-success/40 bg-success/10 text-success',
                          state === 'active' && 'border-primary bg-primary/20 text-primary animate-pulse',
                          state === 'pending' && 'border-border/40 bg-card/20 text-muted-foreground opacity-60',
                          selectedNode === i && 'ring-2 ring-primary'
                        )}
                      >
                        <span className="flex size-6 items-center justify-center rounded-lg bg-background/50 mb-1">
                          {state === 'done' ? <Check className="size-3" /> : <Icon className="size-3" />}
                        </span>
                        <span className="text-[10px] font-semibold truncate w-full">{step.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="my-1.5 border-t border-dashed border-border/60 text-center">
                  <span className="bg-background px-2 py-0.5 rounded text-[9px] font-mono text-muted-foreground">
                    ⚡ Inference Bus
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 relative z-10">
                  {pipelineSteps.slice(5, 10).map((step, idx) => {
                    const i = idx + 5
                    const state = done || i < current ? 'done' : i === current ? 'active' : 'pending'
                    const Icon = icons[step.icon]
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setSelectedNode(i)}
                        className={cn(
                          'flex flex-col items-center p-2 rounded-xl border text-center transition-all',
                          state === 'done' && 'border-success/40 bg-success/10 text-success',
                          state === 'active' && 'border-primary bg-primary/20 text-primary animate-pulse',
                          state === 'pending' && 'border-border/40 bg-card/20 text-muted-foreground opacity-60',
                          selectedNode === i && 'ring-2 ring-primary'
                        )}
                      >
                        <span className="flex size-6 items-center justify-center rounded-lg bg-background/50 mb-1">
                          {state === 'done' ? <Check className="size-3" /> : <Icon className="size-3" />}
                        </span>
                        <span className="text-[10px] font-semibold truncate w-full">{step.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-black/80 p-3 font-mono text-xs text-green-400">
                <p>&gt; Active Node: <span className="text-white">{selectedNode !== null ? pipelineSteps[selectedNode].label : active.label}</span></p>
              </div>
            </div>
          ) : (
            <ol className="relative flex flex-col" aria-label="Render pipeline">
              {pipelineSteps.map((step, i) => {
                const state = done || i < current ? 'done' : i === current ? 'active' : 'pending'
                const Icon = icons[step.icon]
                return (
                  <li key={step.id} className="relative flex gap-4 pb-1 last:pb-0">
                    {i < pipelineSteps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-9 left-[19px] h-[calc(100%-20px)] w-px bg-border"
                      >
                        <span
                          className={cn(
                            'brand-gradient block w-full origin-top transition-transform duration-700 ease-out',
                            state === 'done' ? 'h-full scale-y-100' : 'h-full scale-y-0',
                          )}
                        />
                      </span>
                    )}
                    <span
                      className={cn(
                        'relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-500',
                        state === 'done' && 'bg-primary/15 text-primary ring-primary/40',
                        state === 'active' && 'brand-gradient text-primary-foreground ring-transparent shadow-[0_0_30px_-6px_var(--glow)]',
                        state === 'pending' && 'bg-card text-muted-foreground/60 ring-border',
                      )}
                    >
                      {state === 'done' ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <div
                      className={cn(
                        'flex min-w-0 flex-1 items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-all duration-500',
                        state === 'active'
                          ? 'glass border-primary/40'
                          : state === 'done'
                            ? 'border-transparent'
                            : 'border-transparent opacity-50',
                      )}
                    >
                      <div className="min-w-0">
                        <p
                          className={cn(
                            'truncate text-sm font-medium',
                            state === 'active' && 'shimmer-text',
                            state === 'pending' && 'text-muted-foreground',
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{step.detail}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {state === 'done' ? `${(step.duration / 1000).toFixed(1)}s` : state === 'active' ? 'running' : 'queued'}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  )

// --- Sub-components for better structure ---

function ViewModeSwitcher({ mode, setMode }: { mode: 'list' | 'graph'; setMode: (m: 'list' | 'graph') => void }) {
  return (
    <div className="mb-6 flex space-x-1 rounded-xl bg-muted/50 p-1 w-fit">
      <button
        onClick={() => setMode('graph')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
          mode === 'graph' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Layers className="size-4" />
        Graph
      </button>
      <button
        onClick={() => setMode('list')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
          mode === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Clapperboard className="size-4" />
        Timeline
      </button>
    </div>
  )
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-8">
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out" 
        style={{ width: `${percent}%` }} 
      />
    </div>
  )
}

}

function ActiveIcon({ icon }: { icon: PipelineStep['icon'] }) {
  const Icon = icons[icon]
  return <Icon className="size-4 text-primary-foreground" />
}
