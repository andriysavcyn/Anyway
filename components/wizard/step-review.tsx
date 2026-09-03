'use client'

import { BookOpen, FileVideo, Globe, Pencil, Sparkles, Timer, Video } from 'lucide-react'
import type { BrandStyle, ProductDNA } from '@/lib/studio-data'

export function StepReview({
  dna,
  brand,
  onEdit,
}: {
  dna: ProductDNA
  brand: BrandStyle
  onEdit: (step: number) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Card title="Product DNA" onEdit={() => onEdit(0)}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Item label="Product">{dna.productName || '—'}</Item>
          <Item label="Website">{dna.websiteUrl || '—'}</Item>
          <Item label="Description" className="sm:col-span-2">
            {dna.description || '—'}
          </Item>
          <Item label="Hero feature">{dna.feature || '—'}</Item>
          <Item label="Key benefit">{dna.benefit || '—'}</Item>
          <Item label="Audience" className="sm:col-span-2">
            {dna.audience || '—'}
          </Item>
        </dl>
      </Card>

      <Card title="Brand & Screencast" onEdit={() => onEdit(1)}>
        <div className="flex flex-col gap-4">
          <Row icon={FileVideo} label="Screencast">
            <span className="truncate max-w-[200px] sm:max-w-[300px]" title={brand.screencastName ?? ''}>
              {brand.screencastName ?? 'Not attached'}
            </span>
            {brand.screencastSize && (
              <span className="ml-2 shrink-0 font-mono text-xs text-muted-foreground">{brand.screencastSize}</span>
            )}
          </Row>
          <Row icon={brand.brandSource === 'url' ? Globe : BookOpen} label="Brand source">
            <span className="break-all">
              {brand.brandSource === 'url' ? brand.brandUrl || '—' : brand.brandbookName ?? '—'}
            </span>
          </Row>
          <div className="mt-1 flex items-center gap-1.5">
            {['oklch(0.62 0.22 282)', 'oklch(0.7 0.2 305)', 'oklch(0.78 0.14 200)', 'oklch(0.95 0 0)', 'oklch(0.2 0 0)'].map(
              (c) => (
                <span key={c} className="size-5 shrink-0 rounded-full ring-1 ring-border" style={{ background: c }} />
              ),
            )}
            <span className="ml-1 text-xs text-muted-foreground whitespace-nowrap">Palette locked</span>
          </div>
        </div>
      </Card>

      {/* Output settings */}
      <div className="glass relative overflow-hidden rounded-2xl p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-60 w-96 opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, oklch(0.62 0.22 282 / 60%), transparent)' }}
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <span className="brand-gradient flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Sparkles className="size-5 text-primary-foreground" />
            </span>
            <div className="min-w-0">
              <p className="font-medium">Everything looks good</p>
              <p className="mt-0.5 text-sm text-muted-foreground break-words">
                10 AI stages will run in sequence. Typical render takes about 90 seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs shrink-0">
            <Chip icon={Video}>4K · 16:9</Chip>
            <Chip icon={Timer}>~0:38</Chip>
            <Chip icon={Sparkles}>Narration on</Chip>
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({
  title,
  onEdit,
  children,
  className,
}: {
  title: string
  onEdit: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card/60 p-5 ${className ?? ''}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{title}</h2>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3" /> Edit
        </button>
      </div>
      {children}
    </section>
  )
}

function Item({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm leading-relaxed break-words">{children}</dd>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground ring-1 ring-border">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="flex items-baseline text-sm">{children}</p>
      </div>
    </div>
  )
}

function Chip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-muted-foreground ring-1 ring-border">
      <Icon className="size-3" />
      {children}
    </span>
  )
}
