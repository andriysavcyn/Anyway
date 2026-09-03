'use client'

import { useState } from 'react'
import { Globe, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, TextArea, TextInput } from '@/components/wizard/fields'
import { type ProductDNA, autofillDNA } from '@/lib/studio-data'

export function StepProductDNA({
  dna,
  onChange,
}: {
  dna: ProductDNA
  onChange: (dna: ProductDNA) => void
}) {
  const [filling, setFilling] = useState(false)
  const [filled, setFilled] = useState(false)

  const set = (patch: Partial<ProductDNA>) => onChange({ ...dna, ...patch })

  const autofill = () => {
    setFilling(true)
    setFilled(false)
    const url = dna.websiteUrl.trim() || autofillDNA.websiteUrl
    // Simulated AI extraction — staggered so the form "types itself"
    const order: (keyof ProductDNA)[] = ['productName', 'description', 'feature', 'benefit', 'audience']
    let current: ProductDNA = { ...dna, websiteUrl: url }
    order.forEach((key, i) => {
      setTimeout(() => {
        current = { ...current, [key]: autofillDNA[key] }
        onChange(current)
        if (i === order.length - 1) {
          setFilling(false)
          setFilled(true)
        }
      }, 500 + i * 320)
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-5 lg:col-span-3">
        {/* URL + magic */}
        <div className="glass rounded-2xl p-4">
          <Field label="Website URL" hint="We'll read your site to draft everything below.">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <TextInput
                  value={dna.websiteUrl}
                  onChange={(v) => set({ websiteUrl: v })}
                  placeholder="https://yourproduct.com"
                  className="pl-9"
                  inputMode="url"
                />
              </div>
              <Button
                type="button"
                onClick={autofill}
                disabled={filling}
                className="relative h-10 shrink-0 gap-2 overflow-hidden rounded-lg px-4"
              >
                {filling ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {filling ? 'Reading site…' : 'Auto-fill with AI'}
              </Button>
            </div>
          </Field>
          {filled && (
            <p className="animate-fade-up mt-3 flex items-center gap-1.5 text-xs text-success">
              <Sparkles className="size-3" />
              Drafted from your site. Edit anything that feels off.
            </p>
          )}
        </div>

        <Field label="Product name" required>
          <TextInput
            value={dna.productName}
            onChange={(v) => set({ productName: v })}
            placeholder="e.g. Linear"
            shimmer={filling && !dna.productName}
          />
        </Field>
        <Field label="Description" required hint="One or two sentences. What is it?">
          <TextArea
            value={dna.description}
            onChange={(v) => set({ description: v })}
            placeholder="The issue tracking tool built for high-performance teams…"
            rows={3}
            shimmer={filling && !dna.description}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Hero feature">
            <TextInput
              value={dna.feature}
              onChange={(v) => set({ feature: v })}
              placeholder="Keyboard-first workflow"
              shimmer={filling && !dna.feature}
            />
          </Field>
          <Field label="Key benefit">
            <TextInput
              value={dna.benefit}
              onChange={(v) => set({ benefit: v })}
              placeholder="Ship 2× faster"
              shimmer={filling && !dna.benefit}
            />
          </Field>
        </div>
        <Field label="Target audience">
          <TextInput
            value={dna.audience}
            onChange={(v) => set({ audience: v })}
            placeholder="Product & engineering teams at startups"
            shimmer={filling && !dna.audience}
          />
        </Field>
      </div>

      {/* live preview card */}
      <aside className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-card/60 p-5">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Script preview
          </p>
          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
            <Line label="Hook">
              {dna.productName ? (
                <>
                  Meet <strong className="text-foreground">{dna.productName}</strong>
                  {dna.audience ? ` — built for ${dna.audience.toLowerCase()}.` : '.'}
                </>
              ) : (
                <Placeholder>Your opening hook appears here…</Placeholder>
              )}
            </Line>
            <Line label="Body">
              {dna.description || <Placeholder>Description drives the narration…</Placeholder>}
            </Line>
            <Line label="Payoff">
              {dna.feature || dna.benefit ? (
                <>
                  {dna.feature && <>{dna.feature}. </>}
                  {dna.benefit && <span className="text-foreground">{dna.benefit}.</span>}
                </>
              ) : (
                <Placeholder>Feature + benefit close the video…</Placeholder>
              )}
            </Line>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>Est. runtime</span>
            <span className="font-mono text-foreground">
              0:{String(Math.min(59, 22 + Math.floor(dna.description.length / 12))).padStart(2, '0')}
            </span>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-3">
      <span className="pt-0.5 font-mono text-[10px] tracking-wider text-primary uppercase">{label}</span>
      <p className="text-muted-foreground">{children}</p>
    </div>
  )
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground/50 italic">{children}</span>
}
