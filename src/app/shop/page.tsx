import { getAvailableProducts } from "@/lib/repositories/product";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

export default async function ShopPage() {
  
  let products: any[] = [];
  try {
    products = await getAvailableProducts();
  } catch (error) {
    console.error("Failed to load products from DB, using fallback", error);
    products = [
      { id: "1", name: 'Abstract Canvas 01', price: 45000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1045113/pexels-photo-1045113.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "2", name: 'Nature Study Illustration', price: 32000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1406863/pexels-photo-1406863.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "3", name: 'Premium Sketchbook', price: 12000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "4", name: 'Charcoal Sketch Set', price: 18000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/3778145/pexels-photo-3778145.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "5", name: 'Ocean Fluid Art', price: 55000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1606591/pexels-photo-1606591.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "6", name: 'Acrylic Paint Bundle', price: 24000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800" }
    ];
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
