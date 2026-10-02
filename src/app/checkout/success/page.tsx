'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useRef } from 'react';
import { useCart } from '@/store/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    // Clear cart upon successful checkout (using ref to prevent double execution in React StrictMode)
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '64px 32px', background: 'var(--cream)', border: '2px solid var(--ink)', boxShadow: '12px 12px 0px rgba(28,28,28,0.15)', textAlign: 'center' }}>
        
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#6ee7b7', border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--ink)', marginBottom: '24px' }}>
          Payment Successful
        </h1>
        
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--ink)', opacity: 0.9, marginBottom: '24px', lineHeight: 1.6 }}>
          Thank you! Your order {reference ? <strong>({reference})</strong> : ''} has been processed and sent for shipment.
        </p>
        
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--ink)', opacity: 0.7, marginBottom: '48px' }}>
          We've sent a confirmation email to you. You can track your shipment from your account dashboard.
        </p>
        
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div
            className="neu-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--ink)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              padding: '18px 40px',
              border: '2px solid var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
          >
            Return to Home
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
