'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchCartFromAPI = async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        if (data.cart?.items) {
          const apiItems = data.cart.items.map((i: any) => ({
            productId: i.productId,
            name: i.product.name,
            price: Number(i.product.price),
            quantity: i.quantity,
            imageUrl: i.product.images?.[0] || null,
          }));
          setItems(apiItems);
        }
      }
    } catch (e) {
      console.error('Failed to fetch cart from API', e);
    }
  };

  // Sync logic depending on auth status
  useEffect(() => {
    if (status === 'authenticated') {
      // If logged in, fetch from API immediately and set up polling for instant sync
      fetchCartFromAPI();
      setIsInitialized(true);
      
      const interval = setInterval(() => {
        fetchCartFromAPI();
      }, 3000);
      
      return () => clearInterval(interval);
    } else if (status === 'unauthenticated') {
      // If guest, use localStorage
      const saved = localStorage.getItem('karty_cart');
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse cart');
        }
      }
      setIsInitialized(true);
    }
  }, [status]);

  // Save to local storage for guests
  useEffect(() => {
    if (isInitialized && status === 'unauthenticated') {
      localStorage.setItem('karty_cart', JSON.stringify(items));
    }
  }, [items, isInitialized, status]);

  const updateAPICart = async (productId: string, quantity: number) => {
    if (status === 'authenticated') {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });
        fetchCartFromAPI();
      } catch (e) {
        console.error('Failed to update API cart', e);
      }
    }
  };

  const addItem = (newItem: CartItem) => {
    let newQuantity = newItem.quantity;
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.productId === newItem.productId);
      if (existing) {
        newQuantity = existing.quantity + newItem.quantity;
        return currentItems.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...currentItems, newItem];
    });
    updateAPICart(newItem.productId, newQuantity);
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
    updateAPICart(productId, 0);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
    updateAPICart(productId, quantity);
  };

  const clearCart = () => {
    setItems([]);
    // In a real scenario, you might want an endpoint to clear the cart entirely
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const [toastMessage, setToastMessageState] = useState<string | null>(null);

  const setToastMessage = (msg: string | null) => {
    setToastMessageState(msg);
    if (msg) {
      setTimeout(() => setToastMessageState(null), 3000);
    }
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, itemCount, toastMessage, setToastMessage }}
    >
      {children}
      {toastMessage && (
        <div className="toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
