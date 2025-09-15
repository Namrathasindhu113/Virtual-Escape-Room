import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaderboard } from '@/components/leaderboard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-headline font-bold mb-4 tracking-tight text-primary">
            Room Forge
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
            Unleash your creativity. Design, build, and share
            intricate escape rooms with a global community.
          </p>
          <Button asChild size="lg">
            <Link href="/build">Start Building for Free</Link>
          </Button>
        </div>
      </section>

      <Leaderboard />
    </div>
  );
}
