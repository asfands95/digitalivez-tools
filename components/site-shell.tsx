'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Menu, Search, X } from 'lucide-react'
import { tools } from '@/lib/tools'

export function ToolSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsId = useId()
  const normalizedQuery = query.trim().toLowerCase()
  const matches = normalizedQuery
    ? tools.filter(tool => `${tool.name} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase().includes(normalizedQuery)).slice(0, 6)
    : []

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return <div className={compact ? 'header-search' : 'header-search hero-search'}>
    <Search size={16}/>
    <input ref={inputRef} type="search" role="combobox" aria-autocomplete="list" aria-expanded={matches.length > 0} aria-controls={resultsId} aria-label="Search tools" placeholder={compact ? 'Search tools...' : 'Search 15 free business tools...'} value={query} onChange={event => setQuery(event.target.value)} />
    {compact && <kbd aria-hidden="true">⌘ K</kbd>}
    {matches.length > 0 && <div className="search-results" id={resultsId} role="listbox">{matches.map(tool => <Link role="option" aria-selected="false" key={tool.route} href={tool.route} onClick={() => setQuery('')}><span><strong>{tool.name}</strong><small>{tool.category}</small></span><ArrowRight size={15}/></Link>)}</div>}
  </div>
}

function BrandLogo() {
  return <span className="brand-logo-crop"><Image src="/digitalivez-logo-complete.png" alt="Digitalivez — Smart Wealth | Digital Income" width={1254} height={1254} priority/></span>
}

export function NavigationProgress() {
  const pathname = usePathname()
  const [state, setState] = useState<'idle' | 'loading' | 'complete'>('idle')
  const active = useRef(false)
  const startPath = useRef(pathname)
  const fallbackTimer = useRef<number | null>(null)
  const finishTimer = useRef<number | null>(null)
  const finishProgress = useCallback(() => {
    active.current = false
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current)
    setState('complete')
    finishTimer.current = window.setTimeout(() => setState('idle'), 220)
  }, [])

  useEffect(() => {
    if (pathname === startPath.current) return
    startPath.current = pathname
    if (active.current) finishProgress()
  }, [pathname, finishProgress])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
      const destination = new URL(anchor.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return

      if (finishTimer.current !== null) window.clearTimeout(finishTimer.current)
      startPath.current = window.location.pathname
      active.current = true
      setState('loading')
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current)
      fallbackTimer.current = window.setTimeout(finishProgress, 10000)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [finishProgress])

  useEffect(() => () => {
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current)
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current)
  }, [])

  if (state === 'idle') return null
  return <div className={`navigation-progress navigation-progress-${state}`} role="progressbar" aria-label="Loading page" aria-valuemin={0} aria-valuemax={100} aria-valuenow={state === 'complete' ? 100 : undefined}><span className="navigation-progress-bar"/></div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  return <><NavigationProgress/><header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="Digitalivez Tools home"><span className="brand-wordmark">Digitalivez Tools</span></Link><nav className={open?'nav-links nav-open':'nav-links'} aria-label="Main navigation"><Link href="/">Home</Link><Link href="/tools">All tools</Link><Link href="/calculators">Calculators</Link><Link href="/freelancer-tools">Freelancer tools</Link><Link href="/business-documents">Business documents</Link><Link href="/guides">Guides</Link><Link href="/about">About</Link></nav><ToolSearch compact/><button className="mobile-menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button></div></header></>
}
export function Footer(){return <footer className="footer"><div className="footer-main"><div className="footer-about"><Link href="/" className="brand" aria-label="Digitalivez home"><BrandLogo/></Link><p>Smarter tools. Better business decisions.</p><p className="muted">Free, practical tools for people building a business.</p></div><div><h3>Explore</h3><Link href="/tools">All tools</Link><Link href="/calculators">Calculators</Link><Link href="/freelancer-tools">Freelancer tools</Link><Link href="/business-documents">Business documents</Link><Link href="/guides">Guides</Link></div><div><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclaimer">Disclaimer</Link></div><div className="footer-note"><span className="eyebrow">MADE FOR INDEPENDENTS</span><p>Useful, considered tools to help make the numbers a little clearer.</p><a href="https://digitalivez.com" target="_blank" rel="noreferrer">Visit Digitalivez <ArrowRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Digitalivez Tools</span><span>Free tools. Clearer decisions.</span></div></footer>}
