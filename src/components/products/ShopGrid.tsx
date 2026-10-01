'use client';

import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/products/AddToCartButton";

const C = { black: '#1A1A1A', beige: '#F5F0E8', subtle: '#6B6560', border: '#E2DDD6', accent: '#C9A96E', white: '#FFFFFF' };

export function ShopGrid({ products, showAddToCart = false }: { products: any[], showAddToCart?: boolean }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: '#aaa' }}>
        <p style={{ fontSize: '18px' }}>No products available yet.</p>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 750px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: 1fr; }
        }
        .product-card:hover .product-img {
          transform: scale(1.06);
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,.12) !important;
        }
        .wishlist-btn {
          opacity: 0;
          transition: opacity .2s;
        }
        .product-card:hover .wishlist-btn {
          opacity: 1;
        }
        .product-img {
          transition: transform .5s ease;
        }
      `}} />
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #f0f0f0',
              boxShadow: '0 2px 12px rgba(0,0,0,.05)',
              transition: 'box-shadow .3s',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image */}
            <Link href={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ position: 'relative', height: '240px', background: '#f7f9f7', overflow: 'hidden' }}>
                {/* Badge */}
                <div style={{
                  position: 'absolute', top: '12px', left: '12px', zIndex: 2,
                  background: C.black, color: C.white,
                  fontSize: '10px', fontWeight: 700,
                  padding: '4px 10px', borderRadius: '999px'
                }}>
                  10% off
                </div>

                {/* Wishlist */}
                <button
                  className="wishlist-btn"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Add to wishlist"
                  style={{
                    position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: '#fff', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                    color: '#999', fontSize: '14px'
                  }}
                >
                  ♡
                </button>

                {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="product-img"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '48px' }}>🪑</div>
                )}
              </div>
            </Link>

            {/* Info */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px' }}>Chair</span>
                <span style={{ fontSize: '11px', color: '#F2B600', fontWeight: 700 }}>★ 4.9</span>
              </div>

              <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{
                  fontSize: '14px', fontWeight: 700, color: '#111',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {product.name}
                </h3>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#111' }}>
                  ₦{Number(product.price).toLocaleString('en-NG')}
                </span>
                <span style={{ fontSize: '13px', color: '#ccc', textDecoration: 'line-through' }}>
                  ₦{(Number(product.price) * 1.15).toLocaleString('en-NG')}
                </span>
              </div>

              {showAddToCart && (
                <div style={{ marginTop: '10px' }}>
                  <AddToCartButton product={product} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
