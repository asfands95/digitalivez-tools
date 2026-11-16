'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Calculator, ChevronDown, Menu, Search, X } from 'lucide-react'
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

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="Digitalivez Tools home"><span className="brand-mark"><Calculator size={20}/></span><span>digitalivez<span className="brand-tools">tools</span></span></Link><nav className={open?'nav-links nav-open':'nav-links'} aria-label="Main navigation"><Link href="/">Home</Link><Link href="/tools">All tools</Link><Link href="/calculators">Calculators</Link><Link href="/freelancer-tools">Freelancer tools</Link><Link href="/business-documents">Business documents</Link><Link href="/guides">Guides</Link><Link href="/about">About</Link></nav><ToolSearch compact/><button className="mobile-menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button></div></header>
}
export function Footer(){return <footer className="footer"><div className="footer-main"><div className="footer-about"><Link href="/" className="brand"><span className="brand-mark"><Calculator size={20}/></span><span>digitalivez<span className="brand-tools">tools</span></span></Link><p>Smarter tools. Better business decisions.</p><p className="muted">Free, practical tools for people building a business.</p></div><div><h3>Explore</h3><Link href="/tools">All tools</Link><Link href="/calculators">Calculators</Link><Link href="/freelancer-tools">Freelancer tools</Link><Link href="/business-documents">Business documents</Link><Link href="/guides">Guides</Link></div><div><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/sitemap.xml">Sitemap</Link></div><div className="footer-note"><span className="eyebrow">MADE FOR INDEPENDENTS</span><p>Useful, considered tools to help make the numbers a little clearer.</p><a href="https://digitalivez.com" target="_blank" rel="noreferrer">Visit Digitalivez <ArrowRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Digitalivez Tools</span><span>Free tools. Clearer decisions.</span></div></footer>}
