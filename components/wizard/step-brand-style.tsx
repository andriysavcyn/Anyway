'use client'

import { useRef, useState, useEffect } from 'react'
import { BookOpen, CheckCircle2, FileVideo, Globe, Upload, X, Video, StopCircle, Radio } from 'lucide-react'
import { Field, TextInput } from '@/components/wizard/fields'
import { cn } from '@/lib/utils'
import type { BrandStyle } from '@/lib/studio-data'

function formatBytes(n: number) {
  if (n > 1e9) return `${(n / 1e9).toFixed(1)} GB`
  if (n > 1e6) return `${(n / 1e6).toFixed(1)} MB`
  return `${Math.max(1, Math.round(n / 1e3))} KB`
}

export function StepBrandStyle({
  brand,
  onChange,
}: {
  brand: BrandStyle
  onChange: (b: BrandStyle) => void
}) {
  const set = (patch: Partial<BrandStyle>) => onChange({ ...brand, ...patch })

  // Live Screen Recorder State
  const [isRecording, setIsRecording] = useState(false)
  const [recTime, setRecTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const startLiveRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert('Screen recording is not supported in this browser. Please use Chrome, Edge, or Firefox.')
        return
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30, max: 60 } },
        audio: true,
      })

      streamRef.current = stream
      const chunks: Blob[] = []
      const recorder = new MediaRecorder(stream)

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const file = new File([blob], `live_screencast_${Date.now()}.webm`, { type: 'video/webm' })
        set({
          screencastName: file.name,
          screencastSize: formatBytes(file.size),
        })
        setIsRecording(false)
        setRecTime(0)
        if (timerRef.current) clearInterval(timerRef.current)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
        }
      }

      // Handle user clicking native browser "Stop sharing" button
      stream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== 'inactive') recorder.stop()
      }

      mediaRecorderRef.current = recorder
      recorder.start(1000)
      setIsRecording(true)

      setRecTime(0)
      timerRef.current = setInterval(() => {
        setRecTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error('Failed to record screen:', err)
      setIsRecording(false)
    }
  }

  const stopLiveRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }

  const formatRecTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Screencast */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium">Screencast</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              A raw screen recording of your product. We&apos;ll find the hero moments.
            </p>
          </div>
          {!brand.screencastName && !isRecording && (
            <button
              type="button"
              onClick={startLiveRecording}
              className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <Video className="size-3.5" />
              Record Screen Live
            </button>
          )}
        </div>

        {isRecording ? (
          <div className="animate-fade-up relative flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/50 bg-destructive/5 p-6 text-center">
            <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-mono font-medium text-destructive ring-1 ring-destructive/30">
              <Radio className="size-3.5 animate-pulse text-destructive" />
              REC {formatRecTime(recTime)}
            </div>
            <p className="max-w-xs text-xs text-muted-foreground">
              Recording your window/screen in real-time. Interact with your product to capture hero moments.
            </p>
            <button
              type="button"
              onClick={stopLiveRecording}
              className="flex items-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-xs font-semibold text-destructive-foreground shadow-lg transition-transform hover:scale-105"
            >
              <StopCircle className="size-4" />
              Stop & Save Screencast
            </button>
          </div>
        ) : (
          <DropZone
            accept="video/*"
            icon={FileVideo}
            title="Drop your screencast here"
            subtitle="MP4, MOV or WebM · up to 2 GB"
            fileName={brand.screencastName}
            fileMeta={brand.screencastSize}
            onFile={(f) => set({ screencastName: f.name, screencastSize: formatBytes(f.size) })}
            onClear={() => set({ screencastName: null, screencastSize: null })}
            tall
          />
        )}
      </section>

      {/* Brand source */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-medium">Brand source</h2>
          <p className="mt-1 text-xs text-muted-foreground">Where should we learn your look from?</p>
        </div>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Brand source">
          <SourceOption
            active={brand.brandSource === 'url'}
            onClick={() => set({ brandSource: 'url' })}
            icon={Globe}
            label="Website URL"
            desc="Crawl colors, fonts, logo"
          />
          <SourceOption
            active={brand.brandSource === 'brandbook'}
            onClick={() => set({ brandSource: 'brandbook' })}
            icon={BookOpen}
            label="Brandbook"
            desc="Upload PDF guidelines"
          />
        </div>

        <div key={brand.brandSource} className="animate-fade-up mt-1">
          {brand.brandSource === 'url' ? (
            <Field label="Brand website">
              <div className="relative">
                <Globe className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <TextInput
                  value={brand.brandUrl}
                  onChange={(v) => set({ brandUrl: v })}
                  placeholder="https://yourbrand.com"
                  className="pl-9"
                  inputMode="url"
                />
              </div>
            </Field>
          ) : (
            <DropZone
              accept=".pdf,image/*"
              icon={BookOpen}
              title="Drop your brandbook"
              subtitle="PDF or image · up to 50 MB"
              fileName={brand.brandbookName}
              fileMeta={null}
              onFile={(f) => set({ brandbookName: f.name })}
              onClear={() => set({ brandbookName: null })}
            />
          )}
        </div>

        {/* mini palette preview */}
        <div className="mt-2 rounded-2xl border border-border bg-card/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Detected style
            </span>
            <span className="text-[11px] text-muted-foreground">
              {brand.brandUrl || brand.brandbookName ? 'Preview' : 'Waiting for source…'}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {['oklch(0.62 0.22 282)', 'oklch(0.7 0.2 305)', 'oklch(0.78 0.14 200)', 'oklch(0.95 0 0)', 'oklch(0.2 0 0)'].map(
              (c, i) => (
                <span
                  key={c}
                  className={cn(
                    'h-8 flex-1 rounded-md ring-1 ring-border transition-all duration-500',
                    brand.brandUrl || brand.brandbookName ? 'opacity-100' : 'opacity-20 grayscale',
                  )}
                  style={{ background: c, transitionDelay: `${i * 60}ms` }}
                />
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function SourceOption({
  active,
  onClick,
  icon: Icon,
  label,
  desc,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
  desc: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-2 rounded-xl border p-3.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'border-primary/60 bg-primary/10 shadow-[0_0_0_1px_var(--glow)_inset]'
          : 'border-border bg-card/40 hover:border-foreground/20',
      )}
    >
      <Icon className={cn('size-4', active ? 'text-primary' : 'text-muted-foreground')} />
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-muted-foreground">{desc}</span>
    </button>
  )
}

function DropZone({
  accept,
  icon: Icon,
  title,
  subtitle,
  fileName,
  fileMeta,
  onFile,
  onClear,
  tall,
}: {
  accept: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  fileName: string | null
  fileMeta: string | null
  onFile: (f: File) => void
  onClear: () => void
  tall?: boolean
}) {
  const [over, setOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  if (fileName) {
    return (
      <div
        className={cn(
          'animate-fade-up relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-success/40 bg-success/5 p-6 text-center',
          tall && 'min-h-64',
        )}
      >
        <button
          type="button"
          onClick={onClear}
          aria-label="Remove file"
          className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <p className="max-w-60 truncate text-sm font-medium">{fileName}</p>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {fileMeta ?? 'Attached'} · ready
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        const f = e.dataTransfer.files?.[0]
        if (f) onFile(f)
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-center transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
        tall && 'min-h-64',
        over
          ? 'glow-shadow border-primary bg-primary/10'
          : 'border-border bg-card/30 hover:border-primary/50 hover:bg-card/60',
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
        }}
      />
      <span className="relative flex size-12 items-center justify-center rounded-2xl bg-secondary ring-1 ring-border transition-transform group-hover:-translate-y-0.5">
        <span className="brand-gradient absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity group-hover:opacity-50" />
        <Icon className="relative size-5 text-muted-foreground group-hover:text-foreground" />
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
        <Upload className="size-3" /> or browse files
      </span>
    </div>
  )
}
