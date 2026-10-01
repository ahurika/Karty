import Link from 'next/link';

export default function CollectionsPage() {
  return (
    <div className="container py-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-display">Curated Collections</h1>
        <p className="text-body text-text-secondary leading-relaxed">
          We are currently curating our seasonal collections. Our team is sourcing exceptional pieces that align with our philosophy of quiet luxury and intentional design. 
        </p>
        <p className="text-body text-text-secondary leading-relaxed pb-8">
          Please check back soon or explore our current offerings.
        </p>
        
        <Link href="/shop" className="inline-block border-b border-black pb-1 hover:text-text-secondary hover:border-text-secondary transition-colors uppercase tracking-widest text-sm font-medium">
          Discover the Shop
        </Link>
      </div>
    </div>
  );
}
