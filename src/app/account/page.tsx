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
    <div className="container py-16 max-w-4xl">
      <h1 className="text-display mb-12">My Account</h1>

      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-1 md:max-w-xs space-y-6">
          <div className="p-6 bg-surface-secondary" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
            <h2 className="text-heading mb-2">{session.user.name}</h2>
            <p className="text-body text-text-secondary mb-6">{session.user.email}</p>
            
            <Link href="/api/auth/signout">
              <Button variant="secondary" fullWidth>Sign Out</Button>
            </Link>
          </div>
        </div>

        <div className="flex-[2]">
          <h2 className="text-heading mb-6">Order History</h2>
          
          {orders.length === 0 ? (
            <div className="py-8 text-body text-text-secondary">
              You haven't placed any orders yet.
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order: any) => (
                <div key={order.id} className="border p-6" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <div className="flex justify-between border-b pb-4 mb-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div>
                      <p className="text-metadata text-text-secondary mb-1">Order Placed</p>
                      <p className="text-body">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-metadata text-text-secondary mb-1">Total</p>
                      <p className="text-body">₦{Number(order.total).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-metadata text-text-secondary mb-1">Status</p>
                      <p className="text-body font-medium">{order.status}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-24 relative overflow-hidden rounded-xl" style={{ backgroundColor: "var(--color-surface-secondary)" }}>
                          {item.product.imageUrl && (
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-body font-medium">{item.product.name}</p>
                          <p className="text-body text-text-secondary">Qty: {item.quantity}</p>
                          <p className="text-body text-text-secondary">₦{Number(item.unitPrice).toFixed(2)}</p>
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
