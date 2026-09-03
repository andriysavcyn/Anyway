'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Rocket, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BrandStyle, ProductDNA } from '@/lib/studio-data'
import { StepProductDNA } from '@/components/wizard/step-product-dna'
import { StepBrandStyle } from '@/components/wizard/step-brand-style'
import { StepReview } from '@/components/wizard/step-review'

interface WizardProps {
  dna: ProductDNA
  brand: BrandStyle
  onDnaChange: (dna: ProductDNA) => void
  onBrandChange: (brand: BrandStyle) => void
  onCancel: () => void
  onLaunch: () => void
}

const steps = [
  { title: 'Product DNA', hint: 'What are we selling?' },
  { title: 'Brand & Screencast', hint: 'How should it look?' },
  { title: 'Review & Launch', hint: 'Ready to render' },
]

export function Wizard({ dna, brand, onDnaChange, onBrandChange, onCancel, onLaunch }: WizardProps) {
  const [step, setStep] = useState(0)

  const canContinue =
    step === 0
      ? dna.productName.trim().length > 0 && dna.description.trim().length > 0
      : step === 1
        ? brand.screencastName !== null &&
          (brand.brandSource === 'url' ? brand.brandUrl.trim().length > 0 : brand.brandbookName !== null)
        : true

  return (
    <div className="relative flex flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(50% 80% at 50% 0%, oklch(0.62 0.22 282 / 30%), transparent 70%)',
        }}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              New video project
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{steps[step].title}</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            aria-label="Cancel and return to projects"
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* stepper */}
        <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Progress">
          {steps.map((s, i) => {
            const done = i < step
            const active = i === step
            return (
              <li key={s.title} className="flex flex-col gap-2">
                <div className="h-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      done || active ? 'brand-gradient w-full' : 'w-0',
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex size-5 items-center justify-center rounded-full text-[10px] font-semibold ring-1',
                      done
                        ? 'brand-gradient text-primary-foreground ring-transparent'
                        : active
                          ? 'bg-primary/15 text-primary ring-primary/50'
                          : 'bg-secondary text-muted-foreground ring-border',
                    )}
                  >
                    {done ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs sm:block',
                      active ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {s.title}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>

        {/* body */}
        <div key={step} className="animate-fade-up mt-8 flex-1">
          {step === 0 && <StepProductDNA dna={dna} onChange={onDnaChange} />}
          {step === 1 && <StepBrandStyle brand={brand} onChange={onBrandChange} />}
          {step === 2 && <StepReview dna={dna} brand={brand} onEdit={setStep} />}
        </div>

        {/* footer */}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="ghost"
            onClick={() => (step === 0 ? onCancel() : setStep(step - 1))}
            className="gap-2 rounded-full text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>

          {step < 2 ? (
            <Button
              disabled={!canContinue}
              onClick={() => setStep(step + 1)}
              className="group gap-2 rounded-full px-5"
            >
              Continue
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          ) : (
            <Button
              onClick={onLaunch}
              size="lg"
              className="glow-shadow group relative h-12 gap-2 overflow-hidden rounded-full px-7 text-[15px]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Rocket className="size-4" />
              Generate AI Masterpiece
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
