import { getAvailableProducts } from "@/lib/repositories/product";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

export default async function ToolsPage() {
  let products: any[] = [];
  try {
    products = await getAvailableProducts();
  } catch (error) {
    products = []; 
  }

  const tools = products.filter(p => p.name.includes("Sketch") || p.name.includes("Paint"));

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '80px 32px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            FOR CREATIVES
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', color: 'var(--ink)', marginBottom: '64px', letterSpacing: '-2px' }}>
          Studio Tools
        </h1>
        <ArtworkGrid products={tools} showAddToBag />
      </div>
    </div>
  );
}
