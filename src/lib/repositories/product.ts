import prisma from '../db';
// @ts-ignore
import { Product } from '@prisma/client';

export const FALLBACK_PRODUCTS = [
  { id: "1", name: 'Abstract Canvas 01', description: 'An original abstract painting focusing on texture and depth.', price: 45000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1045113/pexels-photo-1045113.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "2", name: 'Nature Study Illustration', description: 'A detailed botanical illustration printed on heavy watercolor paper.', price: 32000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1406863/pexels-photo-1406863.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "3", name: 'Premium Sketchbook', description: 'Lay-flat sketchbook with 160gsm acid-free paper.', price: 12000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "4", name: 'Charcoal Sketch Set', description: 'Complete set of charcoal pencils and sticks.', price: 18000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/3778145/pexels-photo-3778145.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "5", name: 'Ocean Fluid Art', description: 'Vibrant fluid art piece resembling ocean waves.', price: 55000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1606591/pexels-photo-1606591.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: "6", name: 'Acrylic Paint Bundle', description: 'Set of 24 premium acrylic paint tubes.', price: 24000, isAvailable: true, imageUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

export async function getAvailableProducts() {
  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products.map(p => ({ ...p, price: Number(p.price) }));
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) return null;
  return { ...product, price: Number(product.price) };
}

export async function validateProductsForCheckout(
  items: { productId: string; quantity: number }[]
) {
  const productIds = items.map((item) => item.productId);
  
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isAvailable: true,
      },
    });
  } catch (error) {
    console.warn("DB not connected in checkout validation, using fallback");
  }

  // Find missing products and check if they are in FALLBACK_PRODUCTS
  const missingIds = productIds.filter(id => !products.find(p => p.id === id));
  
  for (const id of missingIds) {
    const fallbackProduct = FALLBACK_PRODUCTS.find(p => p.id === id);
    if (fallbackProduct) {
      products.push(fallbackProduct);
    }
  }

  if (products.length !== items.length) {
    throw new Error('One or more products are unavailable or do not exist.');
  }

  return products;
}
