'use client';

import { useCart } from "@/store/CartContext";

export function CartCount() {
  const { itemCount } = useCart();
  
  if (itemCount === 0) return null;
  
  return <>{itemCount}</>;
}
