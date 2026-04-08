

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working



import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Heart, BookOpen, Star, Tag, Package, Calendar, Hash, Share2, Check } from 'lucide-react'
import { books } from '../data/books'
import { useCart } from '../context/CartContext'
import StarRating from '../components/StarRating'
import Badge from '../components/Badge'
import BookCard from '../components/BookCard'

const fakeReviews = [
  { id: 1, user: 'Alex M.', avatar: '🧑', rating: 5, date: 'Nov 12, 2024', text: 'Absolutely life-changing. Could not put it down — every chapter left me wanting more. Highly recommend to anyone serious about the topic.' },
  { id: 2, user: 'Sarah K.', avatar: '👩', rating: 4, date: 'Apr 28, 2024', text: 'Really well-written and engaging. The author knows their stuff and it comes through clearly. A few sections could be tighter but overall fantastic.' },
  { id: 3, user: 'James R.', avatar: '🧔', rating: 5, date: 'Oct 15, 2024', text: 'Best book in its genre. Already recommended it to five friends. The prose is sharp and the ideas are original and compelling.' },
  { id: 4, user: 'Barter K.', avatar: '🧔', rating: 4.9, date: 'Mar 11, 2025', text: 'Its a great book. BookVibe provide on time. Already recommended it to five friends.' },
]

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [added, setAdded] = useState(false)

  const book = books.find(b => b.id === Number(id))
  if (!book) return (
    <main className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/60 text-xl mb-4">Book not found</p>
        <button onClick={() => navigate('/browse')} className="btn-primary">Back to Browse</button>
      </div>
    </main>
  )

  const related = books.filter(b => b.id !== book.id && b.genre === book.genre).slice(0, 4)
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
  const wishlisted = isWishlisted(book.id)

  const handleAdd = () => {
    addToCart(book, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const ratingBars = [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 19 },
    { stars: 3, pct: 8 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 2 },
  ]

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        {/* main layout */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 mb-14">

          {/* left-side  cover */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-green/10 blur-3xl rounded-full scale-75" />
              <img
                src={book.cover}
                alt={book.title}
                className="relative w-72 drop-shadow-2xl hover:scale-[1.03] transition-transform duration-500 rounded-xl"
              />
              {book.badge && (
                <div className="absolute top-4 left-4">
                  <Badge label={book.badge} color={book.badgeColor} />
                </div>
              )}
            </div>

            {/* Quick info  */}
            <div className="flex flex-wrap gap-2 justify-center w-full">
              <span className="flex items-center gap-1.5 bg-dark-200 border border-white/8 px-3 py-1.5 rounded-full text-xs text-white/60">
                <BookOpen size={13} /> {book.pages} pages
              </span>
              <span className="flex items-center gap-1.5 bg-dark-200 border border-white/8 px-3 py-1.5 rounded-full text-xs text-white/60">
                <Tag size={13} /> {book.genre}
              </span>
              <span className="flex items-center gap-1.5 bg-dark-200 border border-white/8 px-3 py-1.5 rounded-full text-xs text-white/60">
                <Calendar size={13} /> {book.year}
              </span>
              <span className="flex items-center gap-1.5 bg-dark-200 border border-white/8 px-3 py-1.5 rounded-full text-xs text-white/60">
                <Package size={13} /> {book.stock} in stock
              </span>
            </div>

            {/* Social */}
            <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
              <Share2 size={14} /> Share this book
            </button>
          </div>

          {/* Right-side: info */}
          <div>
            <p className="text-accent-green text-sm font-semibold mb-2">{book.genre} · {book.publisher}</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">{book.title}</h1>
            <p className="text-white/50 text-lg mb-4">by <span className="text-white/80 font-semibold">{book.author}</span></p>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={book.rating} size="lg" />
              <span className="text-white/40 text-sm">({book.reviews.toLocaleString()} reviews)</span>
              <span className="text-accent-green text-sm font-medium">{book.sold.toLocaleString()} sold</span>
            </div>

            {/* all tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-white/60">
                  <Hash size={10} /> {tag}
                </span>
              ))}
            </div>

            {/* price */}
            <div className="flex items-baseline gap-3 mb-8 p-5 bg-dark-200 rounded-2xl border border-white/8">
              <span className="text-4xl font-extrabold text-accent-green">${book.price}</span>
              <span className="text-white/30 line-through text-xl">${book.originalPrice}</span>
              <span className="bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full text-sm border border-red-500/30">
                -{discount}%
              </span>
              <span className="ml-auto text-xs text-white/40">Free Shipping</span>
            </div>

            {/* Add to cart btn */}
            <div className="flex items-center gap-4 mb-6">

              {/* select quntity */}
              <div className="flex items-center gap-0 bg-dark-200 border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">−</button>
                <span className="w-12 text-center text-white font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">+</button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95
                  ${added ? 'bg-accent-green-dark text-white border-2 border-accent-green/30' : 'btn-primary'}`}
              >
                {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>

              <button
                onClick={() => toggleWishlist(book)}
                className={`p-3.5 rounded-xl border transition-all ${wishlisted ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-white/10 text-white/50 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400'}`}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* isbn */}
            <p className="text-xs text-white/25 mt-2">ISBN: {book.isbn}</p>
          </div>
        </div>

        {/* tabs --- */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-1">
            {['description', 'reviews', 'details'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors
                  ${tab === t ? 'border-accent-green text-accent-green' : 'border-transparent text-white/40 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === 'description' && (
          <div className="max-w-2xl">
            <p className="text-white/70 leading-relaxed text-base">{book.description}</p>
            <p className="text-white/50 leading-relaxed mt-4">
              This book has garnered widespread acclaim for its unique perspective and accessible writing style.
              Readers from around the world have praised its ability to deliver profound insights in a compelling narrative format.
              Whether you're a seasoned enthusiast or a newcomer to the genre, this book offers something valuable for everyone.
            </p>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            {/* Summary */}
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-extrabold text-accent-green">{book.rating.toFixed(1)}</div>
                <StarRating rating={book.rating} size="lg" showValue={false} />
                <p className="text-white/40 text-sm mt-1">{book.reviews.toLocaleString()} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingBars.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs text-white/40 w-4 flex-shrink-0">{stars}</span>
                    <Star size={12} className="text-yellow-400 flex-shrink-0" fill="currentColor" />
                    <div className="flex-1 h-2 bg-dark-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400/70 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-white/30 w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-4">
              {fakeReviews.map(r => (
                <div key={r.id} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-dark-100 border border-white/10 flex items-center justify-center text-lg">{r.avatar}</div>
                    <div>
                      <p className="text-white text-sm font-semibold">{r.user}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={r.rating} size="sm" showValue={false} />
                        <span className="text-white/30 text-xs">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*  details part */}

        {tab === 'details' && (
          <div className="max-w-lg">
            <div className="card divide-y divide-white/5">
              {[
                ['Title', book.title],
                ['Author', book.author],
                ['Publisher', book.publisher],
                ['Year', book.year],
                ['Pages', `${book.pages} pages`],
                ['Genre', book.genre],
                ['ISBN', book.isbn],
                ['In Stock', `${book.stock} copies`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-5 py-3">
                  <span className="text-white/40 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium text-right max-w-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -- related books */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
