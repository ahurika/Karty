import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  // Mobile app will send Bearer token (session token) in Authorization header
  const authHeader = req.headers.get('authorization');
  let userId = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const sessionToken = authHeader.split(' ')[1];
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true }
    });
    if (session) {
      userId = session.userId;
    }
  } else {
    // Fallback to NextAuth session for web requests if needed
    const session = await getServerSession(authOptions);
    if (session?.user) {
      userId = (session.user as any).id;
    }
  }

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    return NextResponse.json({ cart: cart || { items: [] } });
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  let userId = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const sessionToken = authHeader.split(' ')[1];
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true }
    });
    if (session) {
      userId = session.userId;
    }
  } else {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      userId = (session.user as any).id;
    }
  }

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId, quantity } = await req.json();

    let cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      });
    }

    if (quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId }
      });
    } else {
      await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId
          }
        },
        update: { quantity },
        create: {
          cartId: cart.id,
          productId,
          quantity
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
