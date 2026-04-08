

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQuantity, total, count } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-dark-200 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent-green" />
            <h2 className="text-white font-semibold text-lg">My Cart</h2>
            {count > 0 && (
              <span className="bg-accent-green text-dark-400 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-6xl">📚</div>
              <p className="text-white/60">Your cart is empty</p>
              <button
                onClick={() => { onClose(); navigate('/browse') }}
                className="btn-primary text-sm"
              >
                Browse Books
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-dark-300 rounded-xl p-3 border border-white/5">
                <img src={item.coverSm} alt={item.title} className="w-14 h-20 object-cover rounded-lg shadow-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-accent-green font-bold text-sm">${(item.price * item.qty).toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm text-white font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Subtotal ({count} items)</span>
              <span className="text-white font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Shipping</span>
              <span className="text-accent-green font-medium">Free</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-white font-semibold text-lg">Total</span>
              <span className="text-accent-green font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { onClose(); navigate('/cart') }}
              className="w-full btn-primary text-center"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => { onClose(); navigate('/browse') }}
              className="w-full btn-secondary text-center text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
