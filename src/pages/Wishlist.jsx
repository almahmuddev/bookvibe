

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


import { useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import BookCard from '../components/BookCard'

export default function Wishlist() {
  const navigate = useNavigate()
  const { wishlist } = useCart()

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
          <Heart className="text-red-400" fill="currentColor" /> Wishlist
          <span className="text-lg text-white/40 font-normal">({wishlist.length} items)</span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">💝</div>
            <p className="text-white/60 text-lg mb-2">Your wishlist is empty</p>
            <p className="text-white/30 text-sm mb-6">Save books you'd like to read later</p>
            <button onClick={() => navigate('/browse')} className="btn-primary">Browse Books</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {wishlist.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        )}
      </div>
    </main>
  )
}
