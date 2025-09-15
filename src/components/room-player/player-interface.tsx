import type { Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';

type PlayerInterfaceProps = {
  room: Room;
};

export function PlayerInterface({ room }: PlayerInterfaceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Enter the Room</CardTitle>
        <CardDescription>Your escape begins now. Good luck.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-8 border-dashed border rounded-lg bg-muted/30 text-center">
            <p className="text-muted-foreground">
                The interactive room environment will be displayed here.
            </p>
        </div>
         <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Enter code or answer..." />
            <Button type="submit">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
