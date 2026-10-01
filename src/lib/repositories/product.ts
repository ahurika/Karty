import prisma from '../db';
// @ts-ignore
import { Product } from '@prisma/client';

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
  
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isAvailable: true,
    },
  });

  if (products.length !== items.length) {
    throw new Error('One or more products are unavailable or do not exist.');
  }

  return products;
}
