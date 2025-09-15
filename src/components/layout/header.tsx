import Link from 'next/link';
import { Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Puzzle className="text-primary" size={28} />
          <span className="text-3xl font-headline font-bold text-foreground">
            Room Forge
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/#leaderboard">Leaderboard</Link>
          </Button>
          <Button asChild>
            <Link href="/build">Start Building</Link>
          </Button>
        </nav>
        <div className="md:hidden">
            <Button asChild>
                <Link href="/build">Build</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
