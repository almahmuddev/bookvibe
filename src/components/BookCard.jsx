

//   overall all of the code is working   
//   overall all of the code is working
//   overall all of the code is working


import { Heart, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import StarRating from './StarRating'
import Badge from './Badge'

export default function BookCard({ book, view = 'grid' }) {
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const wishlisted = isWishlisted(book.id)

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  if (view === 'list') {
    return (
      <div
        className="card flex gap-4 p-4 hover:border-accent-green/30 transition-all duration-200 cursor-pointer group"
        onClick={() => navigate(`/book/${book.id}`)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={book.coverSm}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          {book.badge && (
            <div className="absolute -top-2 -left-2">
              <Badge label={book.badge} color={book.badgeColor} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-accent-green font-medium mb-0.5">{book.genre}</p>
              <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2 group-hover:text-accent-green transition-colors">
                {book.title}
              </h3>
              <p className="text-white/50 text-xs mt-0.5">{book.author}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); toggleWishlist(book) }}
              className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${wishlisted ? 'text-red-400 bg-red-400/10' : 'text-white/30 hover:text-red-400 hover:bg-red-400/10'}`}
            >
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <StarRating rating={book.rating} size="sm" />

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-accent-green font-bold text-base">${book.price}</span>
              <span className="text-white/30 line-through text-xs">${book.originalPrice}</span>
              <span className="text-green-400 text-xs font-medium">-{discount}%</span>
            </div>
            <button
              onClick={e => { e.stopPropagation(); addToCart(book) }}
              className="flex items-center gap-1.5 bg-accent-green/10 hover:bg-accent-green text-accent-green hover:text-dark-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="card flex flex-col hover:border-accent-green/30 transition-all duration-200 cursor-pointer group overflow-hidden"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <div className="relative p-4 pb-3 flex justify-center bg-dark-200">
        <img
          src={book.coverSm}
          alt={book.title}
          className="h-44 w-auto object-cover rounded-lg shadow-card group-hover:scale-105 transition-transform duration-300"
        />
        {book.badge && (
          <div className="absolute top-3 left-3">
            <Badge label={book.badge} color={book.badgeColor} />
          </div>
        )}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(book) }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-sm transition-all ${wishlisted ? 'text-red-400 bg-red-400/20' : 'text-white/40 bg-black/30 hover:text-red-400 hover:bg-red-400/20'}`}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {discount > 0 && (
          <div className="absolute bottom-3 right-3 bg-accent-green text-dark-400 text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 pt-3 flex flex-col flex-1">
        <p className="text-xs text-accent-green font-medium mb-0.5">{book.genre}</p>
        <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2 flex-1 group-hover:text-accent-green transition-colors mb-1">
          {book.title}
        </h3>
        <p className="text-white/40 text-xs mb-2">{book.author}</p>

        <StarRating rating={book.rating} size="sm" />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div>
            <div className="text-accent-green font-bold text-base">${book.price}</div>
            <div className="text-white/30 line-through text-xs">${book.originalPrice}</div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); addToCart(book) }}
            className="flex items-center gap-1.5 bg-accent-green/10 hover:bg-accent-green text-accent-green hover:text-dark-400 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 active:scale-95"
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
