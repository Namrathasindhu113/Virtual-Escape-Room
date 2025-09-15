import { notFound } from 'next/navigation';
import { getRoomById } from '@/lib/rooms-service';
import { RoomDetails } from '@/components/room-player/room-details';
import { PlayerInterface } from '@/components/room-player/player-interface';
import { CommentsSection } from '@/components/room-player/comments-section';

type RoomPageProps = {
  params: {
    id: string;
  };
};

export default async function RoomPage({ params }: RoomPageProps) {
  const room = await getRoomById(params.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <RoomDetails room={room} />
            <PlayerInterface room={room} />
        </div>
        <div className="lg:col-span-1">
            <CommentsSection room={room} />
        </div>
      </div>
    </div>
  );
}
