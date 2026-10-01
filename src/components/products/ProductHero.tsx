'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProductHero({ product, children }: { product: any, children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
      <motion.div 
        className="flex-1 w-full relative overflow-hidden rounded-xl" 
        style={{ height: "70vh", minHeight: "500px", backgroundColor: "var(--color-surface-secondary)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        )}
      </motion.div>
      
      <motion.div 
        className="flex-1 flex flex-col justify-center max-w-md space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
