

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


// import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { HashRouter , Routes, Route, ScrollRestoration } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Dashboard from './pages/Dashboard'

function ScrollToTop() {
  return null
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <div className="min-h-screen bg-dark-400">
          <Navbar />
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/browse"     element={<Browse />} />
            <Route path="/book/:id"   element={<BookDetail />} />
            <Route path="/cart"       element={<Cart />} />
            <Route path="/wishlist"   element={<Wishlist />} />
            <Route path="/dashboard"  element={<Dashboard />} />
          </Routes>

          {/* footer section */}
          <footer className="border-t border-white/5 bg-dark-500 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
                      <span className="text-dark-400 font-black text-xs">BV</span>
                    </div>
                    <span className="text-white font-bold text-xl">Book<span className="text-accent-green">Vibe</span></span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">Discover, explore, and purchase your next favourite book — all in one place.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li><a href="/" className="hover:text-accent-green transition-colors">Home</a></li>
                    <li><a href="/browse" className="hover:text-accent-green transition-colors">Browse Books</a></li>
                    <li><a href="/dashboard" className="hover:text-accent-green transition-colors">Dashboard</a></li>
                    <li><a href="/cart" className="hover:text-accent-green transition-colors">My Cart</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3">Support</h3>
                  <ul className="space-y-2 text-sm text-white/40">
                    <li><span className="hover:text-accent-green transition-colors cursor-pointer">Help Center</span></li>
                    <li><span className="hover:text-accent-green transition-colors cursor-pointer">Returns Policy</span></li>
                    <li><span className="hover:text-accent-green transition-colors cursor-pointer">Privacy Policy</span></li>
                    <li><span className="hover:text-accent-green transition-colors cursor-pointer">Contact Us</span></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/5 pt-6 text-center text-white/40 text-[13px]">
                © 2024 BookVibe. All rights reserved. Built with React + Tailwind CSS. Created by <a href="https://github.com/almahmuddev" className="text-white/70 font-semibold text-sm hover:text-accent-green transition-colors">Mahmud Khan</a>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </HashRouter >
  )
}
