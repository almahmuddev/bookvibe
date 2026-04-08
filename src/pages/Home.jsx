



//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star, TrendingUp, Zap, BookOpen, Users, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { books } from '../data/books'
import BookCard from '../components/BookCard'
import Badge from '../components/Badge'
import StarRating from '../components/StarRating'

const featured = books.find(b => b.id === 13) 
const trending = books.filter(b => b.id !== 4).slice(2, 8)
const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(1, 5)

const stats = [
  { icon: BookOpen, label: 'Books Available', value: '12,400+', color: 'text-accent-green' },
  { icon: Users,    label: 'Happy Readers',   value: '86,000+', color: 'text-blue-400' },
  { icon: Star,     label: 'Avg. Rating',     value: '4.7★',    color: 'text-yellow-400' },
  { icon: Zap,      label: 'Daily Orders',    value: '1,200+',  color: 'text-purple-400' },
]

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddFeatured = () => {
    addToCart(featured)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = Math.round(((featured.originalPrice - featured.price) / featured.originalPrice) * 100)

  return (
    <main className="pt-16 min-h-screen">

      {/*-- hero section-- */}
      <section className="relative overflow-hidden bg-dark-400">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-green/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* left-side: text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/20 rounded-full px-4 py-1.5 mb-6">
                <TrendingUp size={14} className="text-accent-green" />
                <span className="text-accent-green text-xs font-semibold tracking-wide uppercase">Featured Book of the Week</span>
              </div>

              <Badge label={featured.badge} color={featured.badgeColor} className="mb-4 ml-2 py-1" />

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
                {featured.title}
              </h1>
              <p className="text-accent-green font-semibold text-lg mb-4">by {featured.author}</p>
              <p className="text-white/60 leading-relaxed mb-6 max-w-lg">{featured.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={featured.rating} size="lg" />
                <span className="text-white/40 text-sm">({featured.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-extrabold text-accent-green">${featured.price}</span>
                <span className="text-white/30 line-through text-xl">${featured.originalPrice}</span>
                <span className="bg-red-500/20 text-red-400 text-sm font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                  Save {discount}%
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddFeatured}
                  className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95
                    ${added ? 'bg-accent-green-dark text-white' : 'btn-primary'}`}
                >
                  <ShoppingCart size={18} />
                  {added ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => navigate(`/book/${featured.id}`)}
                  className="flex items-center gap-2 btn-secondary text-sm"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* right-side: book cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-green/20 blur-3xl rounded-full scale-75" />
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="relative w-72 lg:w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                {/* monthly selling info */}
                <div className="absolute -bottom-4 -left-6 bg-dark-100 border border-accent-green/20 rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-xs text-white/50 mb-0.5">Sold this month</div>
                  <div className="text-accent-green font-bold text-lg">{featured.sold.toLocaleString()} copies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stats--- */}
      <section className="bg-dark-300 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className={`font-bold text-xl ${color}`}>{value}</div>
                  <div className="text-white/40 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Trending Books--- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <p className="text-white/40 text-sm mt-1">Most popular books this week</p>
          </div>
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 text-accent-green text-sm font-semibold hover:underline"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trending.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Top rated Books--- */}
      <section className="bg-dark-300 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Top Rated</h2>
              <p className="text-white/40 text-sm mt-1">Highest rated by our readers</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.map((book, i) => (
              <div
                key={book.id}
                className="card flex gap-4 p-4 hover:border-accent-green/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="relative flex-shrink-0">
                  <span className="absolute -top-2 -left-2 w-6 h-6 bg-accent-green text-dark-400 text-xs font-bold rounded-full flex items-center justify-center z-10">
                    {i + 1}
                  </span>
                  <img src={book.coverSm} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-accent-green font-medium">{book.genre}</p>
                  <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 mt-0.5 group-hover:text-accent-green transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">{book.author}</p>
                  <StarRating rating={book.rating} size="sm" />
                  <p className="text-accent-green font-bold mt-1">${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action btn */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden bg-gradient-to-br from-accent-green/15 to-blue-500/10 border border-accent-green/20 rounded-3xl p-10 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white mb-3">Discover Your Next Favourite Book</h2>
            <p className="text-white/60 mb-7 max-w-lg mx-auto">
              Browse thousands of titles across every genre. Free shipping on all orders.
            </p>
            <button onClick={() => navigate('/browse')} className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Start Browsing <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
