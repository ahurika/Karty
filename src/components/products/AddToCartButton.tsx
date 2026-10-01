'use client';

import { useState } from 'react';
import { useCart } from '@/store/CartContext';
import { Add } from 'iconsax-react';

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    imageUrl?: string | null;
  };
  fullWidth?: boolean;
  variant?: 'pill' | 'icon';
}

export function AddToBagButton({ product, fullWidth = false, variant = 'pill' }: Props) {
  const { addItem, setToastMessage } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (isAdding || added) return;
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        imageUrl: product.imageUrl || undefined,
      });
      setIsAdding(false);
      setAdded(true);
      setToastMessage(`"${product.name}" added to your bag.`);
      setTimeout(() => setAdded(false), 2200);
    }, 380);
  };

  if (!product.isAvailable) {
    if (variant === 'icon') {
      return (
        <button disabled style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '1px solid var(--border)', background: 'transparent',
          color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'not-allowed', padding: 0
        }}>
          -
        </button>
      );
    }
    return (
      <button disabled style={{
        padding: '10px 22px', borderRadius: '3px',
        border: '1px solid var(--border)', background: 'transparent',
        color: 'var(--muted)', fontSize: '12px', fontWeight: 600,
        letterSpacing: '0.8px', textTransform: 'uppercase',
        cursor: 'not-allowed', width: fullWidth ? '100%' : 'auto',
      }}>
        Sold Out
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={(e) => { e.preventDefault(); handleAdd(); }}
        disabled={isAdding}
        aria-label="Add to bag"
        style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '1px solid var(--ink)',
          background: added ? 'var(--ink)' : 'transparent',
          color: added ? '#fff' : 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isAdding ? 'wait' : 'pointer',
          transition: 'all 0.2s',
          padding: 0
        }}
      >
        {added ? <span style={{ fontSize: '14px' }}>✓</span> : <Add size="16" color="currentColor" />}
      </button>
    );
  }

  return (
    <button
      className="neu-button"
      onClick={(e) => { e.preventDefault(); handleAdd(); }}
      disabled={isAdding}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: added ? 'var(--ink)' : 'transparent',
        color: added ? '#fff' : 'var(--ink)',
        fontSize: '12px',
        fontWeight: 700,
        padding: '12px 24px',
        border: '2px solid var(--ink)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        cursor: isAdding ? 'wait' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
      }}
      onMouseEnter={(e) => { 
        if(!added) {
          e.currentTarget.style.background = 'var(--ink)'; 
          e.currentTarget.style.color = '#fff';
        } 
      }}
      onMouseLeave={(e) => { 
        if(!added) {
          e.currentTarget.style.background = 'transparent'; 
          e.currentTarget.style.color = 'var(--ink)'; 
        }
      }}
    >
      {isAdding ? 'Adding…' : added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}

export { AddToBagButton as AddToCartButton };
