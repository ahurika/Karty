'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useCart } from '@/store/CartContext';
import { Button } from '@/components/ui/Button/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart upon successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="container py-32 max-w-2xl text-center">
      <h1 className="text-display mb-6">Order Confirmed</h1>
      <p className="text-body text-text-secondary mb-8">
        Thank you for your intentional purchase. 
        {reference && <span> Your order reference is <strong>{reference}</strong>.</span>}
      </p>
      <p className="text-body text-text-secondary mb-12">
        We have received your order and will begin processing it shortly.
        A confirmation email has been sent to the address provided.
      </p>
      
      <Link href="/shop">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-32 text-center text-body">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
