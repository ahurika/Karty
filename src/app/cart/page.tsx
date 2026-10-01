'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/CartContext';
import { Minus, Add, Trash } from 'iconsax-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '120px 32px',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 6vw, 80px)',
          color: 'var(--ink)',
          marginBottom: '24px',
          letterSpacing: '-2px'
        }}>Your Bag</h1>
        <p style={{ fontSize: '16px', color: 'var(--ink)', opacity: 0.8, marginBottom: '40px' }}>
          It's currently empty. Let's fix that.
        </p>
        <Link href="/shop" className="neu-button" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ink)',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
          padding: '16px 32px',
          border: '2px solid var(--ink)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.color = 'var(--ink)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
        >
          Explore Work →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '80vh', paddingBottom: '120px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cart-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
        }
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        .cart-item {
          display: flex;
          gap: 32px;
          padding-bottom: 40px;
          margin-bottom: 40px;
          border-bottom: 2px solid var(--ink);
        }
        .cart-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .cart-item-img {
          width: 140px;
          height: 180px;
          position: relative;
          border: 2px solid var(--ink);
          flex-shrink: 0;
          background: var(--cream);
          box-shadow: 6px 6px 0px rgba(28,28,28,0.1);
        }

        @media (max-width: 600px) {
          .cart-item { flex-direction: column; gap: 24px; }
          .cart-item-img { width: 100%; height: 280px; }
        }

        .qty-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--ink);
          background: transparent;
          cursor: pointer;
          transition: background 0.2s;
        }
        .qty-btn:hover:not(:disabled) { background: var(--cream); }
        .qty-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .summary-box {
          background: var(--cream);
          border: 2px solid var(--ink);
          padding: 40px;
          box-shadow: 12px 12px 0px rgba(28,28,28,0.15);
        }
      `}} />

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '64px 32px 120px',
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            CHECKOUT
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 6vw, 80px)',
          color: 'var(--ink)',
          marginBottom: '64px',
          letterSpacing: '-2px',
        }}>
          Your Bag
        </h1>

        <div className="cart-grid">
          
          {/* Left: Items */}
          <div>
            {items.map((item) => (
              <div key={item.productId} className="cart-item">
                
                <Link href={`/product/${item.productId}`} className="cart-item-img">
                  {item.imageUrl && (
                    <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  )}
                </Link>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Studio Piece</span>
                    <Link href={`/product/${item.productId}`} style={{ display: 'block', textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginTop: '4px', marginBottom: '8px' }}>
                        {item.name}
                      </h3>
                    </Link>
                    <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ink)' }}>
                      ₦{Number(item.price).toLocaleString('en-NG')}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="qty-btn" style={{ borderRight: 'none' }}>
                        <Minus size="16" color="var(--ink)" />
                      </button>
                      <div style={{ width: '48px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--ink)', fontWeight: 700 }}>
                        {item.quantity}
                      </div>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="qty-btn" style={{ borderLeft: 'none' }}>
                        <Add size="16" color="var(--ink)" />
                      </button>
                    </div>
                    
                    <button onClick={() => removeItem(item.productId)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px'
                    }}>
                      <Trash size="16" variant="Linear" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div>
            <div className="summary-box">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '32px', color: 'var(--ink)' }}>Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', fontWeight: 500 }}>
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString('en-NG')}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', fontSize: '16px', fontWeight: 500 }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px', fontSize: '24px', fontWeight: 700, paddingTop: '24px', borderTop: '2px solid var(--ink)' }}>
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString('en-NG')}</span>
              </div>
              
              <Link href="/checkout" className="neu-button" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--ink)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                padding: '18px 32px',
                border: '2px solid var(--ink)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                width: '100%',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
