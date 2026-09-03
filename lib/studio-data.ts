export type View = 'landing' | 'dashboard' | 'wizard' | 'processing' | 'result' | 'pricing'

export type ProjectStatus = 'Ready' | 'Processing' | 'Failed'

export interface Project {
  id: string
  name: string
  thumbnail: string
  status: ProjectStatus
  date: string
  duration: string
}

export interface ProductDNA {
  websiteUrl: string
  productName: string
  description: string
  feature: string
  benefit: string
  audience: string
}

export interface BrandStyle {
  screencastName: string | null
  screencastSize: string | null
  brandSource: 'url' | 'brandbook'
  brandUrl: string
  brandbookName: string | null
}

export const initialProducts: Project[] = [
  {
    id: 'TSK-8F3A21',
    name: "Macy's Campaign",
    thumbnail: '/thumbs/macys.png',
    status: 'Ready',
    date: 'Aug 28, 2026',
    duration: '0:42',
  },
  {
    id: 'TSK-2C9E77',
    name: 'SaaS Promo',
    thumbnail: '/thumbs/saas.png',
    status: 'Processing',
    date: 'Sep 1, 2026',
    duration: '0:30',
  },
  {
    id: 'TSK-B41D05',
    name: 'E-commerce Showcase',
    thumbnail: '/thumbs/ecommerce.png',
    status: 'Failed',
    date: 'Aug 19, 2026',
    duration: '0:55',
  },
]

export const emptyDNA: ProductDNA = {
  websiteUrl: '',
  productName: '',
  description: '',
  feature: '',
  benefit: '',
  audience: '',
}

export const emptyBrand: BrandStyle = {
  screencastName: null,
  screencastSize: null,
  brandSource: 'url',
  brandUrl: '',
  brandbookName: null,
}

export const autofillDNA: ProductDNA = {
  websiteUrl: 'https://linear.app',
  productName: 'Linear',
  description:
    'The issue tracking tool built for high-performance teams. Streamline issues, projects, and product roadmaps in one blazing-fast workspace.',
  feature: 'Keyboard-first workflow with real-time sync across every device',
  benefit: 'Ship features 2× faster with zero context switching',
  audience: 'Product & engineering teams at fast-growing startups',
}

export interface PipelineStep {
  id: string
  label: string
  detail: string
  icon: 'palette' | 'mic' | 'building' | 'anchor' | 'music' | 'sparkles' | 'layout' | 'audio' | 'layers' | 'clapper'
  duration: number // ms
}

export const pipelineSteps: PipelineStep[] = [
  { id: 'colors', label: 'Extracting Brand Colors', detail: 'Sampling palette from your website & assets', icon: 'palette', duration: 1800 },
  { id: 'tone', label: 'Analyzing Tone', detail: 'Reading copy voice, energy, and personality', icon: 'mic', duration: 1600 },
  { id: 'profile', label: 'Building Profile', detail: 'Assembling a brand DNA fingerprint', icon: 'building', duration: 1500 },
  { id: 'hooks', label: 'Generating Hooks', detail: 'Writing scroll-stopping opening lines', icon: 'anchor', duration: 1900 },
  { id: 'music', label: 'Matching Music', detail: 'Scoring the mood with a licensed track', icon: 'music', duration: 1500 },
  { id: 'logo', label: 'Animating Logo', detail: 'Vectorizing & choreographing your mark', icon: 'sparkles', duration: 1600 },
  { id: 'plan', label: 'Planning Screencast', detail: 'Choosing hero moments, zooms, and cuts', icon: 'layout', duration: 1700 },
  { id: 'narration', label: 'Recording Narration', detail: 'Synthesizing a studio-grade voiceover', icon: 'audio', duration: 1800 },
  { id: 'composition', label: 'Composing Scenes', detail: 'Layering motion, type, and transitions', icon: 'layers', duration: 1700 },
  { id: 'render', label: 'Final Render', detail: 'Encoding a crisp 4K MP4 master', icon: 'clapper', duration: 2200 },
]
