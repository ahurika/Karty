'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/CartContext';
import { Minus, Add, Trash } from 'iconsax-react';
import { useSession, signIn } from 'next-auth/react';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, cartTotal, clearCart, updateQuantity, removeItem } = useCart();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill email and name from session if available
  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name) setName(session.user.name);
    }
  }, [session]);

  if (status === "loading") {
    return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '120px 32px',
        textAlign: 'center',
        minHeight: '60vh',
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', color: 'var(--ink)' }}>Checkout</h1>
        <p style={{ fontSize: '16px', color: 'var(--ink)' }}>Your cart is empty.</p>
      </div>
    );
  }

  // If unauthenticated, show brutalist login prompt
  if (status === "unauthenticated") {
    return (
      <div style={{ background: 'var(--warm-white)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '500px', width: '100%', padding: '64px 32px', background: 'var(--cream)', border: '2px solid var(--ink)', boxShadow: '12px 12px 0px rgba(28,28,28,0.15)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--ink)', marginBottom: '16px' }}>Account Required</h2>
          <p style={{ fontSize: '16px', color: 'var(--ink)', opacity: 0.8, marginBottom: '40px' }}>
            To secure your orders and track shipping, please sign in.
          </p>
          <button 
            className="neu-button"
            onClick={() => signIn('google', { callbackUrl: '/checkout' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--ink)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              padding: '18px 32px',
              border: '2px solid var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              width: '100%',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          items: items.map((item: any) => ({
            productId: item.productId || item.id,
            quantity: item.quantity
          }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
        }
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        .summary-box {
          background: var(--cream);
          border: 2px solid var(--ink);
          padding: 40px;
          box-shadow: 12px 12px 0px rgba(28,28,28,0.15);
        }

        .form-input {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--ink);
          background: #fff;
          font-family: var(--font-body);
          font-size: 16px;
          margin-top: 8px;
        }
        .form-input:focus {
          outline: none;
          box-shadow: 4px 4px 0px rgba(28,28,28,0.15);
        }

        .brutalist-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 18px 32px;
          border: 2px solid var(--ink);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          width: 100%;
          font-family: var(--font-body);
        }
        .brutalist-button:hover:not(:disabled) {
          background: var(--warm-white);
          color: var(--ink);
        }
        .brutalist-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--ink);
          background: transparent;
          cursor: pointer;
          transition: background 0.2s;
        }
        .qty-btn:hover:not(:disabled) { background: var(--warm-white); }
        .qty-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}} />

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '64px 32px 120px',
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            SECURE PAYMENT
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 6vw, 80px)',
          color: 'var(--ink)',
          marginBottom: '64px',
          letterSpacing: '-2px',
        }}>
          Checkout
        </h1>
        
        <div className="checkout-grid">
          
          {/* Form */}
          <div style={{ order: 2 }}>
            <form onSubmit={handleCheckout}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '32px', color: 'var(--ink)' }}>Contact</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  className="form-input"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                />
              </div>

              <div style={{ marginBottom: '40px' }}>
                <label htmlFor="name" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  className="form-input"
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>

              {error && (
                <div style={{ padding: '16px', border: '2px solid red', color: 'red', marginBottom: '24px', fontWeight: 500, background: 'rgba(255,0,0,0.05)' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="brutalist-button neu-button" disabled={isLoading}>
                {isLoading ? 'Processing...' : `Pay ₦${cartTotal.toLocaleString('en-NG')}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ order: 1 }}>
            <div className="summary-box">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '32px', color: 'var(--ink)' }}>Order Summary</h2>
              
              <div style={{ maxHeight: '50vh', overflowY: 'auto', marginBottom: '32px' }}>
                {items.map((item) => (
                  <div key={item.productId} style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                    <div style={{ width: '80px', height: '100px', position: 'relative', border: '2px solid var(--ink)', flexShrink: 0, background: 'var(--warm-white)' }}>
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                      )}
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>{item.name}</p>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)' }}>₦{Number(item.price).toLocaleString('en-NG')}</p>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="qty-btn" style={{ borderRight: 'none' }}>
                            <Minus size="12" color="var(--ink)" />
                          </button>
                          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--ink)', fontWeight: 700, fontSize: '12px', background: '#fff' }}>
                            {item.quantity}
                          </div>
                          <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="qty-btn" style={{ borderLeft: 'none' }}>
                            <Add size="12" color="var(--ink)" />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.productId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '2px solid var(--ink)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', fontWeight: 500 }}>
                  <span>Subtotal</span>
                  <span>₦{cartTotal.toLocaleString('en-NG')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', fontWeight: 500 }}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '2px solid var(--ink)', fontSize: '20px', fontWeight: 700 }}>
                  <span>Total</span>
                  <span>₦{cartTotal.toLocaleString('en-NG')}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
