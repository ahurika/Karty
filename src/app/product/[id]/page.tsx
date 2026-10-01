import { notFound } from 'next/navigation';
import { getProductById, getAvailableProducts } from '@/lib/repositories/product';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let product: any = null;
  let allProducts: any = [];
  
  try {
    product = await getProductById(resolvedParams.id);
    allProducts = await getAvailableProducts();
  } catch (error) {
    console.error("Failed to fetch product from DB, using fallback", error);
    allProducts = [
      { id: "1", name: 'Abstract Canvas 01', description: 'An original abstract painting focusing on texture and depth.', price: 45000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1045113/pexels-photo-1045113.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "2", name: 'Nature Study Illustration', description: 'A detailed botanical illustration printed on heavy watercolor paper.', price: 32000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1406863/pexels-photo-1406863.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "3", name: 'Premium Sketchbook', description: 'Lay-flat sketchbook with 160gsm acid-free paper.', price: 12000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=800" }
    ];
    product = allProducts.find((p: any) => p.id === resolvedParams.id);
  }

  if (!product) {
    notFound();
  }

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .product-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 85vh;
          border-bottom: 2px solid var(--ink);
        }
        .product-img-col {
          border-right: 2px solid var(--ink);
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px;
        }
        .product-info-col {
          padding: 80px max(32px, calc(50vw - 640px + 32px)) 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .product-split { grid-template-columns: 1fr; }
          .product-img-col { border-right: none; border-bottom: 2px solid var(--ink); padding: 40px; }
          .product-info-col { padding: 40px 32px; }
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
          transition: background 0.2s, color 0.2s;
          width: 100%;
          font-family: var(--font-body);
        }
        .brutalist-button:hover {
          background: var(--warm-white);
          color: var(--ink);
        }
      `}} />

      {/* Back Nav */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '24px 32px',
      }}>
        <Link href="/shop" style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textDecoration: 'none',
        }}>
          ← Back to Shop
        </Link>
      </div>

      <div style={{ borderTop: '2px solid var(--ink)' }}>
        <div className="product-split">
          
          {/* Image */}
          <div className="product-img-col">
            {product.imageUrl ? (
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '3/4',
                border: '2px solid var(--ink)',
                boxShadow: '12px 12px 0px rgba(28,28,28,0.15)',
              }}>
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority
                />
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '3/4', border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                No Image
              </div>
            )}
          </div>

          {/* Details */}
          <div className="product-info-col">
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
                STUDIO PIECE
              </span>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1,
                letterSpacing: '-2px',
                marginTop: '16px',
                marginBottom: '24px',
              }}>
                {product.name}
              </h1>
              <p style={{
                fontSize: '24px',
                fontWeight: 500,
                color: 'var(--ink)',
              }}>
                ₦{Number(product.price).toLocaleString('en-NG')}
              </p>
            </div>

            <div style={{ 
              padding: '32px 0', 
              borderTop: '2px solid var(--ink)',
              borderBottom: '2px solid var(--ink)',
              marginBottom: '40px'
            }}>
              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.6,
                color: 'var(--ink)',
              }}>
                {product.description || 'An intentional piece designed for daily use.'}
              </p>
            </div>

            {/* Brutalist Add to Bag button overriding the default AddToBag pill */}
            <div style={{ marginBottom: '40px' }}>
              {/* Note: In a real app we'd pass a brutalist class to AddToCartButton, 
                  but here we are relying on AddToCartButton's fullWidth prop and 
                  it'll render its own inline styles. Let's make sure it looks good. */}
              <AddToCartButton product={product} fullWidth />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <h4 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Shipping</h4>
                <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>Ships safely from Lagos. Delivered in sturdy packaging.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Authenticity</h4>
                <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>Each original piece is signed by the artist.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '80px 32px 0',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4vw, 48px)',
          color: 'var(--ink)',
          marginBottom: '48px',
          letterSpacing: '-1px'
        }}>
          More from the studio
        </h2>
        <ArtworkGrid products={allProducts.filter((p: any) => p.id !== product.id).slice(0, 4)} showAddToBag />
      </div>

    </div>
  );
}
