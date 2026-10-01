'use client';

import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button 
      className="neu-button"
      onClick={() => signIn('google', { callbackUrl: '/account' })}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ink)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 700,
        padding: '18px 32px',
        border: '2px solid var(--ink)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        cursor: 'pointer',
        width: '100%',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.color = 'var(--ink)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff'; }}
    >
      Sign in with Google
    </button>
  );
}
