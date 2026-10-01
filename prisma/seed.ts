// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');
  
  const products = [
    {
      name: 'Abstract Canvas 01',
      description: 'An original abstract painting focusing on texture and depth. Mixed media on canvas.',
      price: 45000,
      imageUrl: 'https://images.pexels.com/photos/1045113/pexels-photo-1045113.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    },
    {
      name: 'Nature Study Illustration',
      description: 'A detailed botanical illustration printed on heavy watercolor paper. Signed by the artist.',
      price: 32000,
      imageUrl: 'https://images.pexels.com/photos/1406863/pexels-photo-1406863.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    },
    {
      name: 'Premium Sketchbook',
      description: 'Lay-flat sketchbook with 160gsm acid-free paper. Perfect for mixed media and ink.',
      price: 12000,
      imageUrl: 'https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    },
    {
      name: 'Charcoal Sketch Set',
      description: 'A professional set of vine and compressed charcoal for expressive sketching.',
      price: 18000,
      imageUrl: 'https://images.pexels.com/photos/3778145/pexels-photo-3778145.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    },
    {
      name: 'Ocean Fluid Art',
      description: 'A mesmerizing fluid acrylic pour capturing the movement of water.',
      price: 55000,
      imageUrl: 'https://images.pexels.com/photos/1606591/pexels-photo-1606591.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    },
    {
      name: 'Acrylic Paint Bundle',
      description: 'Curated selection of high-pigment acrylic paints for vibrant artwork.',
      price: 24000,
      imageUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
    }
  ];

  await prisma.product.deleteMany({}); // clear existing
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  
  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
