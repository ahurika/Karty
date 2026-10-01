import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container py-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-display">Our Philosophy</h1>
        <p className="text-body text-text-secondary leading-relaxed">
          Karty was founded on a simple premise: everyday objects should be both deeply functional and inherently beautiful. We source and create pieces that bring a sense of calm and intentionality to your space.
        </p>
        <p className="text-body text-text-secondary leading-relaxed pb-8">
          Every item in our collection is selected with care, favoring natural materials, skilled craftsmanship, and timeless silhouettes over fleeting trends.
        </p>
        
        <Link href="/shop" className="inline-block border-b border-black pb-1 hover:text-text-secondary hover:border-text-secondary transition-colors uppercase tracking-widest text-sm font-medium">
          Explore the Collection
        </Link>
      </div>
    </div>
  );
}
