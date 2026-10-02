import { getAvailableProducts, FALLBACK_PRODUCTS } from "@/lib/repositories/product";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

export default async function ShopPage() {
  
  let products: any[] = [];
  try {
    products = await getAvailableProducts();
    if (!products.length) products = FALLBACK_PRODUCTS;
  } catch (error) {
    console.error("Failed to load products from DB, using fallback", error);
    products = FALLBACK_PRODUCTS;
  }

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '80px 32px 120px', // Added massive bottom padding (120px)
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            ALL WORK
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 6vw, 80px)',
          color: 'var(--ink)',
          marginBottom: '64px',
          letterSpacing: '-2px',
        }}>
          The Collection
        </h1>
        
        <ArtworkGrid products={products} showAddToBag />
      </div>
    </div>
  );
}
