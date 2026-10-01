import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-display">Page Not Found</h1>
        <p className="text-body text-text-secondary leading-relaxed pb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <Link href="/" className="inline-block border-b border-black pb-1 hover:text-text-secondary hover:border-text-secondary transition-colors uppercase tracking-widest text-sm font-medium">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
