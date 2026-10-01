import Link from "next/link";
import { SearchNormal1, Bag2, User, PenTool } from "iconsax-react";
import { CartCount } from "./CartCount";

export function Header() {
  return (
    <header style={{
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Top announcement bar */}
      <div style={{
        background: 'var(--ink)',
        color: 'var(--warm-white)',
        fontSize: '12px',
        fontWeight: 700,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>
        <span>Free delivery on orders over ₦35,000</span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>+</span>
        <span>Original artwork, shipped with care</span>
      </div>

      <div style={{
        background: 'var(--warm-white)',
        borderBottom: '2px solid var(--ink)',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 32px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>

          {/* ── Brand ── */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <PenTool size="32" color="var(--ink)" variant="Bulk" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              fontWeight: 900,
              color: 'var(--ink)',
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              KARTY STUDIO
            </span>
          </Link>

          {/* ── Navigation ── */}
          <nav id="main-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flex: 1,
            justifyContent: 'center',
          }}>
            {[
              { label: 'Shop', href: '/shop' },
              { label: 'Prints', href: '/shop/prints' },
              { label: 'Originals', href: '/shop/originals' },
              { label: 'Studio Tools', href: '/shop/tools' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="nav-link" style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ink)',
                letterSpacing: '0.2px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexShrink: 0,
          }}>
            <button
              aria-label="Search"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex', padding: 0 }}
            >
              <SearchNormal1 size="20" color="currentColor" />
            </button>
            <Link href="/account" aria-label="Account" style={{ color: 'var(--ink)', display: 'flex' }}>
              <User size="20" color="currentColor" />
            </Link>

            <Link href="/cart" aria-label="Your bag" style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: 'var(--ink)',
            }}>
              <Bag2 size="22" color="currentColor" />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-6px',
                background: '#A65571', /* Adding a subtle pop color like the reference */
                color: '#fff',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                minWidth: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                lineHeight: 1,
              }}>
                <CartCount />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link:hover { opacity: 0.6; }
        @media (max-width: 800px) {
          #main-nav { display: none !important; }
        }
        @media (max-width: 480px) {
          header > div:last-child > div { padding: 0 20px !important; }
        }
      `}} />
    </header>
  );
}
