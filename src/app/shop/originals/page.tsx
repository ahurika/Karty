import { getAvailableProducts } from "@/lib/repositories/product";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

export default async function OriginalsPage() {
  let products: any[] = [];
  try {
    products = await getAvailableProducts();
  } catch (error) {
    products = []; 
  }

  const originals = products.filter(p => p.name.includes("Canvas") || p.name.includes("Fluid"));

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '80px 32px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            ONE OF A KIND
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', color: 'var(--ink)', marginBottom: '64px', letterSpacing: '-2px' }}>
          Originals
        </h1>
        <ArtworkGrid products={originals} showAddToBag />
      </div>
    </div>
  );
}
