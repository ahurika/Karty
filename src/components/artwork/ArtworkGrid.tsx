'use client';

import Image from "next/image";
import Link from "next/link";
import { AddToBagButton } from "@/components/products/AddToCartButton";

interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  imageUrl?: string | null;
}

interface ArtworkGridProps {
  products: Product[];
  showAddToBag?: boolean;
}

export function ArtworkGrid({ products, showAddToBag = false }: ArtworkGridProps) {
  if (!products.length) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '32px', fontFamily: 'var(--font-display)', color: 'var(--muted)', fontWeight: 400, marginBottom: '12px' }}>
          Nothing here yet.
        </p>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>Looks like the collection is empty.</p>
        <Link href="/shop" style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--ink)',
          borderBottom: '1.5px solid var(--ink)',
          paddingBottom: '2px',
          textDecoration: 'none',
        }}>
          Keep exploring →
        </Link>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .artwork-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px 24px;
        }
        @media (max-width: 1024px) {
          .artwork-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .artwork-grid { grid-template-columns: repeat(2, 1fr); gap: 32px 16px; }
        }
        @media (max-width: 480px) {
          .artwork-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        .artwork-card {
          display: flex;
          flex-direction: column;
        }
        
        .artwork-card-img-wrap {
          position: relative;
          overflow: hidden;
          background: var(--cream);
          border-radius: 0px;
          border: 2px solid var(--ink);
          margin-bottom: 16px;
          aspect-ratio: 4/5;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        
        .artwork-card-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .artwork-card:hover .artwork-card-img-wrap {
          transform: translate(-4px, -4px);
          box-shadow: 6px 6px 0px var(--ink);
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
        }
        
        .card-category {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--muted);
        }
        
        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.2px;
        }
        
        .card-price {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
        }
      `}} />

      <div className="artwork-grid">
        {products.map((product) => (
          <div key={product.id} className="artwork-card">
            <Link href={`/product/${product.id}`} style={{ display: 'block' }}>
              <div className="artwork-card-img-wrap">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="artwork-card-img"
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)', fontSize: '14px' }}>
                    No image
                  </div>
                )}
              </div>
            </Link>

            <div className="card-bottom">
              <Link href={`/product/${product.id}`} className="card-info">
                <span className="card-category">Studio Piece</span>
                <span className="card-title">{product.name}</span>
                <span className="card-price">₦{Number(product.price).toLocaleString('en-NG')}</span>
              </Link>
              
            </div>
            
            {showAddToBag && (
              <div style={{ marginTop: '16px' }}>
                <AddToBagButton product={product} variant="pill" fullWidth />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
