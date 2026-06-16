import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ApexLayout from '../../layouts/ApexLayout'
import './ApexShopPage.css'

const categories = ['All', 'Rackets', 'Shoes', 'Apparel', 'Balls', 'Accessories']

const products = [
  { id: 1, name: 'Vợt Cầu lông Yonex Astrox 99', category: 'Rackets', sport: 'Badminton', price: 189, rental: 12, stock: 8, rating: 4.9, reviews: 124, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', badge: 'PRO PICK' },
  { id: 2, name: 'Giày Cầu lông Yonex 65Z', category: 'Shoes', sport: 'Badminton', price: 135, rental: null, stock: 15, rating: 4.7, reviews: 89, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', badge: null },
  { id: 3, name: 'Vợt Pickleball Selkirk Amped', category: 'Rackets', sport: 'Pickleball', price: 145, rental: 10, stock: 5, rating: 4.8, reviews: 63, img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80', badge: 'NEW' },
  { id: 4, name: 'Quần Short Thể thao Pro', category: 'Apparel', sport: 'Multi', price: 55, rental: null, stock: 30, rating: 4.5, reviews: 42, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', badge: null },
  { id: 5, name: 'Cầu lông Feather (12 quả)', category: 'Balls', sport: 'Badminton', price: 22, rental: null, stock: 60, rating: 4.4, reviews: 78, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', badge: 'BESTSELLER' },
  { id: 6, name: 'Bóng Pickleball Franklin X-40 (6 quả)', category: 'Balls', sport: 'Pickleball', price: 18, rental: null, stock: 100, rating: 4.6, reviews: 200, img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80', badge: null },
  { id: 7, name: 'Balo Thể thao Pro', category: 'Accessories', sport: 'Multi', price: 78, rental: null, stock: 12, rating: 4.8, reviews: 55, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', badge: null },
  { id: 8, name: 'Băng cổ tay thấm mồ hôi (bộ)', category: 'Accessories', sport: 'Multi', price: 24, rental: null, stock: 50, rating: 4.3, reviews: 33, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80', badge: null },
]

export default function ApexShopPage() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [mode, setMode] = useState('buy') // 'buy' | 'rent'
  const [showCart, setShowCart] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-hero', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
      gsap.from('.product-card', { opacity: 0, y: 40, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [category])

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    (mode === 'buy' || p.rental !== null)
  )

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    gsap.from(`#add-btn-${product.id}`, { scale: 0.85, duration: 0.25, ease: 'back.out(1.7)' })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const cartTotal = cart.reduce((sum, i) => sum + (mode === 'rent' && i.rental ? i.rental : i.price) * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <ApexLayout title="Shop">
      <div className="apex-shop" ref={pageRef}>
        {/* Hero */}
        <div className="shop-hero">
          <div>
            <h1 className="shop-hero__title">Pro Gear Shop</h1>
            <p className="shop-hero__sub">Buy or rent premium equipment for your next match.</p>
          </div>
          <button className="cart-btn btn-outline" onClick={() => setShowCart(!showCart)}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>

        {/* Mode toggle */}
        <div className="shop-mode-toggle">
          <button className={`mode-btn ${mode === 'buy' ? 'active' : ''}`} onClick={() => setMode('buy')}>🛍️ Buy</button>
          <button className={`mode-btn ${mode === 'rent' ? 'active' : ''}`} onClick={() => setMode('rent')}>🔄 Rent</button>
        </div>

        {/* Categories */}
        <div className="shop-categories">
          {categories.map(c => (
            <button key={c} className={`shop-cat-btn ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>

        <div className="shop-layout">
          {/* Products Grid */}
          <div className="products-grid">
            {filtered.map(p => (
              <div key={p.id} className="product-card">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <img src={p.img} alt={p.name} className="product-card__img" />
                <div className="product-card__body">
                  <p className="product-card__category">{p.category} · {p.sport}</p>
                  <h3 className="product-card__name">{p.name}</h3>
                  <div className="product-card__rating">
                    {'★'.repeat(Math.round(p.rating))} <span>{p.rating} ({p.reviews})</span>
                  </div>
                  <div className="product-card__footer">
                    <div>
                      {mode === 'rent' && p.rental
                        ? <span className="product-price">${p.rental}<small>/day</small></span>
                        : <span className="product-price">${p.price}</span>
                      }
                      <span className="product-stock">{p.stock} in stock</span>
                    </div>
                    <button id={`add-btn-${p.id}`} className="btn-primary product-card__add" onClick={() => addToCart(p)}>
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="shop-empty">
                <span>🛍️</span>
                <p>No rentable items match this category.</p>
              </div>
            )}
          </div>

          {/* Cart Panel */}
          {showCart && (
            <div className="cart-panel">
              <h3 className="cart-panel__title">🛒 Your Cart</h3>
              {cart.length === 0 ? (
                <div className="cart-empty"><p>Cart is empty</p></div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item__info">
                          <p className="cart-item__name">{item.name}</p>
                          <p className="cart-item__price">
                            {mode === 'rent' && item.rental ? `$${item.rental}/day` : `$${item.price}`} × {item.qty}
                          </p>
                        </div>
                        <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-panel__total">
                    <span>Total</span><strong>${cartTotal.toFixed(2)}</strong>
                  </div>
                  <button className="btn-primary cart-panel__checkout">Checkout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ApexLayout>
  )
}
