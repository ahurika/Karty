import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "./GoogleSignInButton";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/account");
  }

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '64px 32px', background: 'var(--cream)', border: '2px solid var(--ink)', boxShadow: '12px 12px 0px rgba(28,28,28,0.15)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--ink)', marginBottom: '16px' }}>Sign In</h1>
        <p style={{ fontSize: '16px', color: 'var(--ink)', opacity: 0.8, marginBottom: '40px' }}>
          Sign in to access your order history and manage your account.
        </p>
        
        <GoogleSignInButton />
      </div>
    </div>
  );
}
