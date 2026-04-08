

//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Tag, Gift, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQty, total, count } = useCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [step, setStep] = useState('cart') 

  const shipping = 0
  const discount = couponApplied ? total * 0.1 : 0
  const finalTotal = total - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BOOKVIBE10') {
      setCouponApplied(true)
      setCouponError(false)
    } else {
      setCouponError(true)
      setCouponApplied(false)
    }
  }

  if (step === 'success') {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-accent-green" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Order Placed!</h1>
          <p className="text-white/60 mb-2">Thank you for your purchase. Your books will be delivered soon.</p>
          <p className="text-accent-green font-semibold mb-8">Order total: ${finalTotal.toFixed(2)}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
            <button onClick={() => navigate('/browse')} className="btn-secondary">Browse More</button>
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-dark-200 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ShoppingCart size={32} className="text-white/30" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-white/40 mb-6">Add some books to get started!</p>
          <button onClick={() => navigate('/browse')} className="btn-primary">Browse Books</button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <h1 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
          <ShoppingCart className="text-accent-green" /> My Cart
          <span className="text-lg text-white/40 font-normal">({count} items)</span>
        </h1>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="card flex gap-5 p-5 hover:border-white/15 transition-colors">
                <img
                  src={item.coverSm}
                  alt={item.title}
                  onClick={() => navigate(`/book/${item.id}`)}
                  className="w-20 h-28 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-accent-green font-medium mb-0.5">{item.genre}</p>
                      <h3
                        className="text-white font-semibold leading-snug cursor-pointer hover:text-accent-green transition-colors"
                        onClick={() => navigate(`/book/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-xs mt-0.5">{item.author}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 bg-dark-300 rounded-xl overflow-hidden border border-white/8">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors font-bold">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-white text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors font-bold">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-accent-green font-bold text-lg">${(item.price * item.qty).toFixed(2)}</p>
                      <p className="text-white/30 text-xs">${item.price} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* order info */}
          <div className="space-y-4">
            <div className="card p-6 space-y-4">
              <h2 className="text-white font-bold text-lg">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal ({count} items)</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-accent-green font-medium">Free</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-accent-green">
                    <span>Coupon (BOOKVIBE10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-accent-green font-extrabold text-2xl">${finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setStep('success')}
                className="w-full flex items-center justify-center gap-2 btn-primary py-4 text-base"
              >
                <CreditCard size={18} /> Place Order
              </button>
            </div>

            {/* coupon code */}
            <div className="card p-5">
              <p className="text-white/60 text-sm font-medium mb-3 flex items-center gap-2">
                <Tag size={15} /> Coupon Code
              </p>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponError(false) }}
                  placeholder="Enter coupon"
                  className="input-field flex-1 text-sm py-2.5"
                />
                <button onClick={applyCoupon} className="btn-primary text-sm px-4 py-2.5 whitespace-nowrap">Apply</button>
              </div>
              {couponError && <p className="text-red-400 text-xs mt-2">Invalid coupon code</p>}
              {couponApplied && <p className="text-accent-green text-xs mt-2">✓ 10% discount applied!</p>}
              <p className="text-white/20 text-xs mt-2">Try: BOOKVIBE10</p>
            </div>

            {/* free shipping */}
            <div className="card p-4 border-accent-green/20 bg-accent-green/5 flex items-center gap-3">
              <Gift size={20} className="text-accent-green flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Free shipping included!</p>
                <p className="text-white/40 text-xs">On all orders, no minimum required.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
