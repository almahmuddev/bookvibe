


//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, BookOpen, BarChart2, Home, Search, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { to: '/',          label: 'Home',      icon: Home },
  { to: '/browse',    label: 'Browse',    icon: Search },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart2 },
]

export default function Navbar() {
  const { count, wishlist } = useCart()
  const { pathname } = useLocation()
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-dark-400/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group">
              <div className="w-9 h-9 bg-accent-green rounded-lg flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <BookOpen size={21} className="text-dark-100" strokeWidth={3.5} />
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tight">
                Book<span className="text-accent-green">Vibe</span>
              </span>
            </Link>

            {/* wide view nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const active = pathname === to || (to !== '/' && pathname.startsWith(to))
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${active
                        ? 'bg-accent-green/10 text-accent-green'
                        : 'text-white/60 hover:text-white hover:bg-white/8'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Right side Action */}
            <div className="flex items-center gap-2">
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-green text-dark-400 text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(v => !v)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-1 border-t border-white/8 pt-3">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const active = pathname === to || (to !== '/' && pathname.startsWith(to))
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${active ? 'bg-accent-green/10 text-accent-green' : 'text-white/60 hover:text-white hover:bg-white/8'}`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
