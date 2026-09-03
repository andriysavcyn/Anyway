'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Pricing({ onBack }: { onBack: () => void }) {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for testing the waters',
      features: ['5 Free Renders', '720p Export', 'Basic Brand DNA', 'Community Support'],
      button: 'Current Plan',
      current: true,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For professional creators',
      features: ['Unlimited Renders', '4K Ultra HD Export', 'Advanced Brand Control', 'Priority Rendering', 'Commercial Rights'],
      button: 'Upgrade to Pro',
      current: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams & agencies',
      features: ['Everything in Pro', 'White-labeling', 'API Access', 'Dedicated Account Manager', 'SSO Security'],
      button: 'Contact Sales',
      current: false,
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h2 className="text-4xl font-bold tracking-tight">Choose your plan</h2>
      <p className="mt-4 text-muted-foreground text-lg">You've reached your free limit. Upgrade to unlock the full power of the studio.</p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'rounded-2xl border p-8 flex flex-col transition-all',
              plan.current ? 'border-primary bg-card ring-1 ring-primary' : 'border-border bg-card/50'
            )}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <div className="mt-4 text-5xl font-bold tracking-tighter">{plan.price}</div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            
            <ul className="mt-8 flex-1 space-y-4 text-left text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={cn(
                'mt-8 rounded-xl px-6 py-3 font-semibold transition-all',
                plan.current 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              )}
              disabled={plan.current}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="mt-12 text-sm text-muted-foreground hover:text-foreground underline transition-all"
      >
        Back to Home Page
      </button>
    </div>
  )
}