import Link from 'next/link';
import Image from 'next/image';
import { rooms } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';

export function Leaderboard() {
  // Sort rooms by play count for the leaderboard
  const sortedRooms = [...rooms].sort((a, b) => b.playCount - a.playCount);

  return (
    <section id="leaderboard" className="w-full bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">
          Featured Rooms
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Discover the most popular and highest-rated rooms created by the community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRooms.map((room) => {
            const roomImage = PlaceHolderImages.find(
              (img) => img.id === room.imageId
            );
            return (
              <Link href={`/rooms/${room.id}`} key={room.id} className="group">
                <Card className="h-full flex flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      {roomImage && (
                        <Image
                          src={roomImage.imageUrl}
                          alt={room.title}
                          fill
                          className="object-cover"
                          data-ai-hint={roomImage.imageHint}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="text-lg font-headline mb-1 group-hover:text-primary transition-colors">
                      {room.title}
                    </CardTitle>
                    <CardDescription>by {room.creator}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{room.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{(room.playCount / 1000).toFixed(1)}k</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
