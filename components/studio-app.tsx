'use client'

import { useCallback, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Landing } from '@/components/landing/landing'
import { Dashboard } from '@/components/dashboard/dashboard'
import { Wizard } from '@/components/wizard/wizard'
import { Processing } from '@/components/studio/processing'
import { Result } from '@/components/studio/result'
import { Pricing } from '@/components/studio/pricing'
import { AuthModal } from '@/components/auth-modal'
import {
  type BrandStyle,
  type ProductDNA,
  type Project,
  type View,
  emptyBrand,
  emptyDNA,
  initialProducts,
} from '@/lib/studio-data'

export function StudioApp() {
  const [view, setView] = useState<View>('landing')
  const [renderCount, setRenderCount] = useState(0)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProducts)
  const [dna, setDna] = useState<ProductDNA>(emptyDNA)
  const [brand, setBrand] = useState<BrandStyle>(emptyBrand)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleGetStarted = useCallback(() => {
    if (!user) {
      setIsAuthOpen(true)
    } else {
      setView('dashboard')
    }
  }, [user])

  const startNew = useCallback(() => {
    if (!user) {
      setIsAuthOpen(true)
      return
    }
    setDna(emptyDNA)
    setBrand(emptyBrand)
    setView('wizard')
  }, [user])

  const launch = useCallback(() => {
    if (renderCount >= 5) {
      setView('pricing')
      return
    }
    const id = `TSK-${Math.random().toString(16).slice(2, 8).toUpperCase()}`
    const project: Project = {
      id,
      name: dna.productName ? `${dna.productName} Launch` : 'Untitled Project',
      thumbnail: '/showcase/after.png',
      status: 'Processing',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '0:38',
    }
    setRenderCount((prev) => prev + 1)
    setActiveProject(project)
    setProjects((prev) => [project, ...prev])
    setView('processing')
  }, [dna.productName, renderCount])

  const finishProcessing = useCallback(() => {
    if (activeProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === activeProject.id ? { ...p, status: 'Ready' } : p)),
      )
      setActiveProject((p) => (p ? { ...p, status: 'Ready' } : p))
    }
    setView('result')
  }, [activeProject])

  const openProject = useCallback((project: Project) => {
    setActiveProject(project)
    setView(project.status === 'Processing' ? 'processing' : 'result')
  }, [])

  return (
    <div className="relative flex min-h-dvh flex-col">
      <Navbar
        view={view}
        onNavigate={(v) => {
          if (v === 'dashboard' && !user) {
            setIsAuthOpen(true)
          } else {
            setView(v)
          }
        }}
        onGetStarted={handleGetStarted}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUser(null)
          setView('landing')
        }}
      />
      <main className="flex flex-1 flex-col">
        {view === 'landing' && <Landing onStart={handleGetStarted} />}
        {view === 'dashboard' && (
          <Dashboard projects={projects} onNew={startNew} onOpen={openProject} />
        )}
        {view === 'wizard' && (
          <Wizard
            dna={dna}
            brand={brand}
            onDnaChange={setDna}
            onBrandChange={setBrand}
            onCancel={() => setView('dashboard')}
            onLaunch={launch}
          />
        )}
        {view === 'processing' && (
          <Processing project={activeProject} dna={dna} onComplete={finishProcessing} />
        )}
        {view === 'result' && (
          <Result
            project={activeProject}
            dna={dna}
            onBack={() => setView('dashboard')}
            onNew={startNew}
          />
        )}
        {view === 'pricing' && (
          <Pricing onBack={() => setView(user ? 'dashboard' : 'landing')} />
        )}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(name, email) => {
          setUser({ name, email })
          setView('dashboard')
        }}
      />
    </div>
  )
}

