import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    {
      path: '/add-event',
      label: 'Add Event',
      icon: '+'
    },
    {
      path: '/events',
      label: 'All Events',
      icon: '📅'
    }
  ]

  const isActivePath = (path: string) => {
    return location.pathname === path
  }


  return (
    <header className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center min-h-[70px]">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-white text-2xl md:text-3xl font-bold text-shadow-lg">
              Mini Event Scheduler
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`flex items-center gap-2 text-white no-underline px-5 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden group ${
                    isActivePath(link.path) ? 'bg-white/20 shadow-lg' : ''
                  }`}
                >
                  <span className="text-lg font-bold">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-white hover:bg-white/15 rounded-lg transition-all duration-300"
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
          <nav className="max-w-7xl mx-auto px-5 py-4">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={`flex items-center gap-3 text-white no-underline px-4 py-3 rounded-lg font-medium text-base transition-all duration-300 hover:bg-white/15 ${
                      isActivePath(link.path) ? 'bg-white/20 shadow-lg' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl font-bold">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
