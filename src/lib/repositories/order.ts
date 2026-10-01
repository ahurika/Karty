import prisma from '../db';

export async function createOrder(
  userId: string | null,
  total: number,
  items: { productId: string; quantity: number; unitPrice: number }[]
) {
  return prisma.$transaction(async (tx: any) => {
    const data: any = {
      total,
      status: "PENDING",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    };
    if (userId) {
      data.userId = userId;
    }

    const order = await tx.order.create({
      data,
      include: {
        items: true,
      },
    });

    return order;
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });
}

export async function getOrderByIdAndUser(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
