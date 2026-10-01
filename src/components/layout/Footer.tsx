import Link from "next/link";
import { Instagram, Youtube } from "iconsax-react";

export function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--warm-white)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '80px 32px 40px',
      }}>

        <style dangerouslySetInnerHTML={{ __html: `
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            padding-bottom: 64px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .footer-links-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            padding-top: 24px;
          }
          @media (max-width: 900px) {
            .footer-grid { grid-template-columns: 1fr; gap: 48px; }
            .footer-links-grid { padding-top: 0; }
          }
          @media (max-width: 600px) {
            .footer-links-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          }
          .footer-col-title {
            font-size: 10px;
            font-weight: 700;
            color: #C9A96E;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 24px;
          }
          .footer-link {
            display: block;
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            margin-bottom: 14px;
            transition: color 0.15s;
          }
          .footer-link:hover { color: #fff; }
        `}} />

        <div className="footer-grid">

          {/* Big Text Left */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{
                width: '24px',
                height: '28px',
                border: '1.5px solid var(--warm-white)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: '6px', height: '10px', border: '1.5px solid var(--warm-white)', borderRadius: '2px' }}></div>
              </div>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-1px',
              maxWidth: '380px',
              color: 'var(--warm-white)'
            }}>
              Nice things for the space you live in.
            </h2>
          </div>

          {/* Columns Right */}
          <div className="footer-links-grid">
            {/* Shop */}
            <div>
              <p className="footer-col-title">Shop</p>
              <Link href="/shop" className="footer-link">All prints</Link>
              <Link href="/shop" className="footer-link">Originals</Link>
              <Link href="/shop" className="footer-link">Art Cards</Link>
            </div>

            {/* Help */}
            <div>
              <p className="footer-col-title">Help</p>
              <Link href="/account" className="footer-link">My account</Link>
              <Link href="/cart" className="footer-link">Your cart</Link>
              <Link href="#" className="footer-link">Contact us</Link>
            </div>

            {/* Follow */}
            <div>
              <p className="footer-col-title">Follow</p>
              <a href="#" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Instagram size="16" /> Instagram
              </a>
              <a href="#" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Youtube size="16" /> YouTube
              </a>
              <p style={{ marginTop: '32px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Made with intention<br />in Lagos.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '32px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
        }}>
          <span>© {new Date().getFullYear()} KARTY STUDIO</span>
          <span>NGN ₦ · Nigeria</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Privacy · Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
