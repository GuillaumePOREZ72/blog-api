import Link from 'next/link';
import { PenSquare, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-7xl px-4">
      <div className="neo-card flex items-center justify-between !py-3 bg-white">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter hover:text-primary transition-colors"
        >
          NEO<span className="text-secondary">BLOG</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="neo-btn flex items-center gap-2 !bg-secondary text-white"
          >
            <PenSquare size={20} />
            <span className="hidden sm:inline">Write</span>
          </Link>
          <Link href="/login" className="neo-btn flex items-center gap-2">
            <LogIn size={20} />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
