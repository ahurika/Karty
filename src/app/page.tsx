import Image from "next/image";
import Link from "next/link";
import { getAvailableProducts, FALLBACK_PRODUCTS } from "@/lib/repositories/product";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArrowRight2 } from "iconsax-react";

export default async function Home() {
  let products: any[] = [];
  try {
    products = await getAvailableProducts();
    if (!products.length) products = FALLBACK_PRODUCTS.slice(0, 4);
  } catch {
    products = FALLBACK_PRODUCTS.slice(0, 4);
  }

  const [heroProduct, secondProduct] = products;

  return (
    <div style={{ background: 'var(--warm-white)', width: '100%' }}>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-split {
          display: flex;
          min-height: 80vh;
          border-bottom: 2px solid var(--ink);
        }
        .hero-left {
          flex: 1;
          background: var(--warm-white);
          padding: 80px 40px 80px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-right {
          flex: 1;
          background: var(--cream);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-left: 2px solid var(--ink);
        }
        @media (max-width: 900px) {
          .hero-split { flex-direction: column; }
          .hero-left { padding: 64px 0; }
          .hero-right { height: 60vh; border-left: none; border-top: 2px solid var(--ink); }
        }

        .category-box {
          flex: 1;
          padding: 32px 24px;
          border-radius: 0px;
          border: 2px solid var(--ink) !important;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--ink);
        }
        .category-boxes {
          display: flex;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .category-boxes { flex-direction: column; }
        }
      `}} />

      {/* ══════════════════════════════════════════════════
          01 · HERO SPLIT
      ══════════════════════════════════════════════════ */}
      <div style={{ borderBottom: '2px solid var(--ink)' }}>
        <div className="container" style={{ padding: 0 }}>
          <section className="hero-split" style={{ borderBottom: 'none' }}>
            {/* Left Side */}
            <div className="hero-left" style={{ paddingLeft: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <div style={{ width: '16px', height: '2px', background: 'var(--ink)' }}></div>
                <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  NEW WORK · STUDIO
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(70px, 8vw, 120px)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 0.9,
                letterSpacing: '-3px',
                marginBottom: '32px',
              }}>
                Your space called.<br />
                <em style={{ fontStyle: 'italic', opacity: 0.9 }}>It wants art.</em>
              </h1>

              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--ink)',
                lineHeight: 1.6,
                maxWidth: '380px',
                marginBottom: '40px',
              }}>
                Original illustrations, paintings, and creative tools designed to add personality to your creative journey.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link href="/shop" className="neu-button" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--ink)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  padding: '16px 32px',
                  borderRadius: '0px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '2px solid var(--ink)',
                }}>
                  Explore work →
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="hero-right">
              {/* Sticker */}
              <div className="neu-button" style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                background: 'var(--warm-white)',
                color: 'var(--ink)',
                border: '2px solid var(--ink)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 900,
                lineHeight: 1.1,
                transform: 'rotate(-12deg)',
                zIndex: 10,
                textTransform: 'uppercase',
                boxShadow: '4px 4px 0px var(--ink)',
              }}>
                made<br/>with care!
              </div>

              {/* Floating Images */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {heroProduct?.imageUrl && (
                  <div className="neu-card" style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-70%, -60%) rotate(-4deg)',
                    width: '35%',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    border: '2px solid var(--ink)',
                  }}>
                    <Image src={heroProduct.imageUrl} alt="Artwork 1" fill style={{ objectFit: 'cover' }} priority />
                  </div>
                )}
                
                {secondProduct?.imageUrl && (
                  <div className="neu-card" style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-10%, -20%) rotate(2deg)',
                    width: '40%',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    border: '2px solid var(--ink)',
                  }}>
                    <Image src={secondProduct.imageUrl} alt="Artwork 2" fill style={{ objectFit: 'cover' }} priority />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MARQUEE CAROUSEL
      ══════════════════════════════════════════════════ */}
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Double the content for seamless infinite looping */}
          <span>WORLDWIDE SHIPPING</span>
          <span>✦</span>
          <span>ORIGINAL ARTWORKS</span>
          <span>✦</span>
          <span>STUDIO TOOLS</span>
          <span>✦</span>
          <span>CREATIVE SUPPLIES</span>
          <span>✦</span>
          <span>WORLDWIDE SHIPPING</span>
          <span>✦</span>
          <span>ORIGINAL ARTWORKS</span>
          <span>✦</span>
          <span>STUDIO TOOLS</span>
          <span>✦</span>
          <span>CREATIVE SUPPLIES</span>
          <span>✦</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          03 · PRODUCT GRID
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '16px', height: '1px', background: 'var(--ink)' }}></div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  STUDIO ARCHIVE
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: 'var(--ink)',
                lineHeight: 1.1,
                letterSpacing: '-1px',
              }}>
                Selected works
              </h2>
            </div>
            
            <Link href="/shop" style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ink)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              marginBottom: '8px',
            }}>
              Shop all →
            </Link>
          </div>

          <ArtworkGrid products={products} showAddToBag />

        </div>
      </section>

    </div>
  );
}
