"use client";

import type { Room } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MessageSquare } from 'lucide-react';

type CommentsSectionProps = {
  room: Room;
};

export function CommentsSection({ room }: CommentsSectionProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <MessageSquare className='w-5 h-5'/>
            Community Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="mb-6">
          <Textarea placeholder="Share your thoughts on the room..." className="mb-2" />
          <Button className="w-full">Post Comment</Button>
        </form>
        <div className="space-y-4">
          {room.comments.length > 0 ? (
            room.comments.map((comment) => {
              const avatarImage = PlaceHolderImages.find(img => img.id === comment.avatarId);
              return (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={comment.user} data-ai-hint={avatarImage.imageHint} />}
                    <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{comment.user}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-foreground/80">{comment.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Be the first to leave a comment!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
