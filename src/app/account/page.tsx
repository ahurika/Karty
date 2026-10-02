import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/account/login");
  }

  // Fetch user orders
  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } },
  }).catch(() => {
    console.warn("DB not connected, returning empty orders for account page");
    return [];
  });

  return (
    <div style={{ padding: '80px 32px', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', marginBottom: '48px' }}>My Account</h1>

      <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
        {/* Sidebar */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <div className="neu-card" style={{ padding: '32px', border: '2px solid var(--ink)', background: 'var(--warm-white)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{session.user.name}</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>{session.user.email}</p>
            
            <Link href="/api/auth/signout" className="neu-button" style={{
              display: 'block',
              textAlign: 'center',
              padding: '12px 24px',
              border: '2px solid var(--ink)',
              background: 'var(--ink)',
              color: '#fff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '12px'
            }}>
              Sign Out
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: '2 1 500px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '32px' }}>Order History</h2>
          
          {orders.length === 0 ? (
            <div style={{ padding: '32px 0', color: 'var(--muted)', fontSize: '15px' }}>
              You haven't placed any orders yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {orders.map((order: any) => (
                <div key={order.id} style={{ border: '2px solid var(--ink)', padding: '24px', background: 'var(--cream)' }}>
                  
                  {/* Order Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '1px' }}>Order Placed</p>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '1px' }}>Total</p>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>₦{Number(order.total).toLocaleString('en-NG')}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '1px' }}>Status</p>
                      <p style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase' }}>{order.status}</p>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {order.items.map((item: any) => (
                      <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '64px', height: '80px', position: 'relative', border: '2px solid var(--ink)', background: 'var(--warm-white)', overflow: 'hidden' }}>
                          {item.product.imageUrl ? (
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Img</div>
                          )}
                        </div>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{item.product.name}</p>
                          <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Qty: {item.quantity}</p>
                          <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>₦{Number(item.unitPrice).toLocaleString('en-NG')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
