


//   overall all of the code is working
//   overall all of the code is working
//   overall all of the code is working


import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = useCallback((book, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === book.id)
      if (existing) {
        return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...book, qty }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
    }
  }, [])

  const toggleWishlist = useCallback((book) => {
    setWishlist(prev =>
      prev.find(i => i.id === book.id) ? prev.filter(i => i.id !== book.id) : [...prev, book]
    )
  }, [])

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, isWishlisted, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
