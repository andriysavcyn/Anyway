'use client'

import Image from 'next/image'
import { AlertCircle, CheckCircle2, Clock, Loader2, Play, Plus, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Project, ProjectStatus } from '@/lib/studio-data'

interface DashboardProps {
  projects: Project[]
  onNew: () => void
  onOpen: (project: Project) => void
}

export function Dashboard({ projects, onNew, onOpen }: DashboardProps) {
  const ready = projects.filter((p) => p.status === 'Ready').length
  const processing = projects.filter((p) => p.status === 'Processing').length

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="animate-fade-up flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">My Projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {projects.length} projects · {ready} ready · {processing} in the render queue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="glass hidden h-10 items-center gap-2 rounded-full px-3.5 text-sm text-muted-foreground sm:flex">
            <Search className="size-4" />
            <input
              placeholder="Search projects…"
              className="w-40 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <Button onClick={onNew} className="glow-shadow h-10 gap-2 rounded-full px-5">
            <Plus className="size-4" />
            New Video Project
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Create card */}
        <button
          type="button"
          onClick={onNew}
          className="animate-fade-up group relative flex aspect-[4/3.4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/30 text-muted-foreground transition-all hover:border-primary/60 hover:bg-card/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
          style={{ animationDelay: '60ms' }}
        >
          <span className="relative flex size-14 items-center justify-center rounded-2xl bg-secondary ring-1 ring-border transition-transform group-hover:scale-105">
            <span className="brand-gradient absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity group-hover:opacity-60" />
            <Plus className="relative size-6" />
          </span>
          <span className="text-sm font-medium">Start a new video</span>
          <span className="flex items-center gap-1 text-xs">
            <Sparkles className="size-3 text-primary" /> Takes about 2 minutes
          </span>
        </button>

        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => onOpen(project)}
            style={{ animationDelay: `${120 + i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  onOpen,
  style,
}: {
  project: Project
  onOpen: () => void
  style?: React.CSSProperties
}) {
  const disabled = project.status === 'Failed'
  return (
    <article
      style={style}
      className="animate-fade-up group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-colors hover:border-foreground/20"
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        aria-label={`Open ${project.name}`}
        className="relative aspect-video w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
      >
        <Image
          src={project.thumbnail}
          alt={`${project.name} thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-[1.03]',
            disabled && 'grayscale',
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

        {project.status === 'Ready' && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex size-12 items-center justify-center rounded-full bg-foreground/90 text-background shadow-xl backdrop-blur">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
          </span>
        )}
        {project.status === 'Processing' && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-foreground/10">
            <span className="brand-gradient absolute inset-y-0 w-1/3 animate-progress" />
          </span>
        )}

        <span className="absolute right-3 bottom-3 rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[10px] text-foreground/80 backdrop-blur">
          {project.duration}
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-medium">{project.name}</h3>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{project.id}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3" />
            {project.date}
          </span>
          {project.status === 'Failed' ? (
            <button type="button" className="text-foreground/80 underline-offset-2 hover:underline">
              Retry
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpen}
              className="text-foreground/80 underline-offset-2 hover:underline"
            >
              {project.status === 'Ready' ? 'Open studio' : 'View progress'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const map = {
    Ready: {
      icon: CheckCircle2,
      cls: 'bg-success/10 text-success ring-success/30',
    },
    Processing: {
      icon: Loader2,
      cls: 'bg-primary/10 text-primary ring-primary/30',
    },
    Failed: {
      icon: AlertCircle,
      cls: 'bg-destructive/10 text-destructive ring-destructive/30',
    },
  } as const
  const { icon: Icon, cls } = map[status]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1',
        cls,
      )}
    >
      <Icon className={cn('size-3', status === 'Processing' && 'animate-spin')} />
      {status}
    </span>
  )
}
