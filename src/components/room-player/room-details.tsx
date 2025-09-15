import Image from 'next/image';
import type { Room } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';

type RoomDetailsProps = {
  room: Room;
};

export function RoomDetails({ room }: RoomDetailsProps) {
  const roomImage = PlaceHolderImages.find((img) => img.id === room.imageId);

  return (
    <div className="mb-8">
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6 shadow-lg">
        {roomImage && (
          <Image
            src={roomImage.imageUrl}
            alt={room.title}
            fill
            className="object-cover"
            data-ai-hint={roomImage.imageHint}
          />
        )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <h1 className="text-5xl md:text-7xl font-headline font-bold mb-2 text-primary">
        {room.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
        <span>by <span className="font-semibold text-foreground">{room.creator}</span></span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{room.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{(room.playCount / 1000).toFixed(1)}k plays</span>
        </div>
      </div>
      <p className="text-foreground/80 leading-relaxed">
        {room.description}
      </p>
    </div>
  );
}
