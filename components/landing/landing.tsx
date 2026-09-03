'use client'

import { useState } from 'react'
import {
  ArrowRight,
  AudioLines,
  Check,
  Clapperboard,
  MessageSquareText,
  Palette,
  Sparkles,
  Wand2,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BeforeAfter } from '@/components/landing/before-after'
import { cn } from '@/lib/utils'

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.62 0.22 282 / 45%), oklch(0.7 0.2 305 / 20%), transparent)',
        }}
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <div className="animate-fade-up glass inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-xs text-muted-foreground">
          <span className="brand-gradient rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary-foreground uppercase">
            New
          </span>
          Screencast → cinematic video, now in beta
          <ArrowRight className="size-3" />
        </div>

        <h1
          className="animate-fade-up mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '80ms' }}
        >
          Transform your website &amp; screencast into{' '}
          <span className="text-gradient">cinematic AI marketing videos</span> in 1 click
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: '160ms' }}
        >
          Drop a URL and a screen recording. LaunchFlow extracts your brand, writes the hooks, records the
          narration, scores the music, and renders a launch-ready MP4 — no editor, no timeline, no agency.
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="glow-shadow group h-12 gap-2 rounded-full px-6 text-[15px]"
          >
            <Sparkles className="size-4" />
            Start Creating — Free
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-border bg-transparent px-6 text-[15px] hover:bg-secondary"
            onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Watch the demo
          </Button>
        </div>

        <p
          className="animate-fade-up mt-5 text-xs text-muted-foreground"
          style={{ animationDelay: '300ms' }}
        >
          No credit card · 5 free renders · Export in 4K
        </p>

        {/* Showcase */}
        <div
          id="showcase"
          className="animate-fade-up mt-16 w-full max-w-5xl"
          style={{ animationDelay: '380ms' }}
        >
          <BeforeAfter />
          <p className="mt-4 text-xs text-muted-foreground">
            Drag the handle to compare the raw website with the generated video frame.
          </p>
        </div>
      </section>

      {/* Logos strip */}
      <section className="border-y border-border/60 bg-secondary/10 py-10 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by creators and innovative teams at
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {[
                { name: 'Northwind', badge: 'AI SaaS' },
                { name: 'Lumen', badge: 'E-commerce' },
                { name: 'Vantage', badge: 'Fintech' },
                { name: 'Orbital', badge: 'Creator' },
                { name: 'Hexa Labs', badge: 'Agency' },
                { name: 'Parallel', badge: 'Enterprise' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="glass group flex items-center gap-2.5 rounded-xl border border-border/80 px-4 py-2.5 text-sm transition-all hover:border-primary/50 hover:bg-card/80 hover:scale-105 shadow-sm"
                >
                  <span className="font-semibold tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">Features</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            A full production studio, collapsed into one button
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Every step a creative agency would bill you for, run by specialized models that share one
            understanding of your brand.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Feature
            className="md:col-span-4"
            icon={Palette}
            title="Brand DNA extraction"
            body="We crawl your site and brandbook to capture colors, type, logo geometry, and tone of voice — then enforce it across every frame."
            visual={<PaletteVisual />}
          />
          <Feature
            className="md:col-span-2"
            icon={Wand2}
            title="Auto-fill from URL"
            body="Paste a link. Product name, features, benefits, and audience are drafted for you."
          />
          <Feature
            className="md:col-span-2"
            icon={AudioLines}
            title="Studio narration"
            body="Voiceover synthesized in the tone your copy already speaks — calm, bold, or playful."
          />
          <Feature
            className="md:col-span-2"
            icon={Clapperboard}
            title="Smart screencast cuts"
            body="Hero moments detected, zoomed, and choreographed to the beat."
          />
          <Feature
            className="md:col-span-2"
            icon={MessageSquareText}
            title="Edit in plain English"
            body="“Make it slower.” “Warmer accent.” Tweak your render through chat, not keyframes."
          />
        </div>
      </section>

      {/* Reviews (Testimonials) */}
      <section id="testimonials" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 border-t border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Client Stories</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
              Success stories from our users
            </h2>
            <div className="w-24 h-1 brand-gradient mt-4 rounded-full" />
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-10 border-border hover:bg-secondary"
              onClick={() => {
                const container = document.getElementById('testimonials-scroll')
                if (container) container.scrollBy({ left: -360, behavior: 'smooth' })
              }}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-10 border-border hover:bg-secondary"
              onClick={() => {
                const container = document.getElementById('testimonials-scroll')
                if (container) container.scrollBy({ left: 360, behavior: 'smooth' })
              }}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          id="testimonials-scroll"
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[
            {
              quote: "In 2023, I decided to try AI video to promote my dental clinic. The results exceeded all expectations — we saw a huge influx of new loyal patients and built a truly recognizable personal brand.",
              name: "ELENA",
              role: "Dentist & Clinic Owner",
            },
            {
              quote: "I subscribed and created my first promo video for our delivery service. Thanks to the AI-driven approach, our website conversion rates grew by 18% in just one month.",
              name: "ANDREY",
              role: "Logistics Manager",
            },
            {
              quote: "I used the auto-color and music matching feature for my cafe's Instagram ads. Within three days, we saw dozens of reposts and a significant influx of new guests.",
              name: "MARIA",
              role: "Cafe Owner",
            },
            {
              quote: "Started with the demo, now I create professional animations in 5 minutes instead of hours. The interface is incredibly intuitive, saving so much time while keeping quality high.",
              name: "DMITRY",
              role: "Product Designer",
            },
            {
              quote: "LaunchFlow replaced our expensive video production agency. We now generate high-converting product launch videos in minutes right from our browser.",
              name: "SOPHIE",
              role: "Head of Marketing",
            },
            {
              quote: "The brand DNA extraction is magic! It captured our exact color scheme, fonts, and tone of voice without me lifting a finger.",
              name: "ALEXANDER",
              role: "Tech Startup Founder",
            },
            {
              quote: "Our e-commerce store CTR on social ads doubled after switching to these cinematic AI product showcases. Absolutely game-changing.",
              name: "VICTORIA",
              role: "E-commerce Founder",
            },
            {
              quote: "The voiceover quality and automatic framing of key website moments look so professional. Clients think we hired a full Hollywood crew.",
              name: "SERGEY",
              role: "SaaS Creator",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="min-w-[300px] sm:min-w-[360px] max-w-[380px] snap-start relative flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div>
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 border-t border-border/40">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 brand-gradient mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          <FaqItem
            question="How do I start creating videos?"
            answer="Simply register on the platform, enter your website link (or upload your brand book), and upload a screen recording. Our AI will automatically recognize layers, select brand colors, write a script, and generate a ready-to-use promo video."
          />
          <FaqItem
            question="What is the duration of the finished video?"
            answer="Typically, our generated promo videos range from 30 to 60 seconds. This is the optimal length for maintaining audience attention on social media and landing pages."
          />
          <FaqItem
            question="Can I edit the final result?"
            answer="Yes! You can easily edit any element, timing, or color of your animation using our interactive AI director chat in plain language, without needing any After Effects knowledge."
          />
          <FaqItem
            question="Do I need a credit card to get started?"
            answer="No, we offer a completely free start with the ability to create up to 5 videos, allowing you to evaluate the power and speed of our AI without any commitments."
          />
        </div>
      </section>

      {/* Try It Call To Action Section */}
      <section className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 mb-16 border-t border-border/40">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 p-8 sm:p-16 text-center shadow-2xl">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl text-foreground">
            Ready to create your first AI masterpiece?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Turn your product screencasts into cinematic animations in seconds. Start for free today!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onStart}
              size="lg"
              className="glow-shadow group h-12 gap-2 rounded-full px-8 text-base font-semibold"
            >
              <Sparkles className="size-5" />
              Try it now — for free
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 LaunchFlow. All rights reserved.</span>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  body,
  visual,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  visual?: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40',
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x,50%)_var(--y,0%),oklch(0.62_0.22_282/15%),transparent_60%)]" />
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
        <Icon className="size-4" />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {visual && <div className="mt-6">{visual}</div>}
    </article>
  )
}

function PaletteVisual() {
  const swatches = ['#6D5DFC', '#A78BFA', '#22D3EE', '#F4F4F5', '#18181B']
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {swatches.map((c, i) => (
          <span
            key={c}
            className="size-9 rounded-full ring-2 ring-card transition-transform group-hover:translate-x-1"
            style={{ background: c, transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground">
        <span>Inter · 600</span>
        <span>tone: confident</span>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border bg-card/40 overflow-hidden transition-colors hover:border-primary/20">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left font-medium text-foreground outline-none focus-visible:bg-secondary/20"
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="size-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-border/40 px-6 py-5 text-sm text-muted-foreground leading-relaxed bg-secondary/10 animate-in slide-in-from-top-1 duration-200">
          {answer}
        </div>
      )}
    </div>
  )
}
