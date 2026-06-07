import { useState, useEffect } from 'react'
import { GiCoffeeCup } from 'react-icons/gi'
import '../styles/Navbar.css'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Menu',         href: '#menu' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''))
      let current = 'home'

      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80) {
            current = id
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    // Smooth scroll to section
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false) 
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <GiCoffeeCup className="navbar__logo-icon" />
        <span>Coffee</span>
      </div>


      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* NAV LINKS — Array.map renders a link per item */}
      <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <li key={link.label}>
            <a     
              href={link.href}
              className={activeSection === link.href.replace('#', '') ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}


