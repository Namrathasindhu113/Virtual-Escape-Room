
"use client";

import * as React from 'react';
import type { Room, Puzzle } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateClue } from '@/ai/flows/generate-clues';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type PlayerInterfaceProps = {
  room: Room;
  puzzle?: Puzzle;
};

export function PlayerInterface({ room, puzzle }: PlayerInterfaceProps) {
  const [answer, setAnswer] = React.useState('');
  const [isSolved, setIsSolved] = React.useState(false);
  const [isHintLoading, setIsHintLoading] = React.useState(false);
  const [hint, setHint] = React.useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puzzle) {
        toast({
            variant: "destructive",
            title: "No puzzle available",
            description: "This room doesn't seem to have a puzzle to solve.",
        });
        return;
    }

    if (answer.toLowerCase().replace(/\s/g, '') === puzzle.solution.toLowerCase().replace(/\s/g, '')) {
      setIsSolved(true);
      toast({
        title: "Congratulations!",
        description: "You've solved the puzzle and escaped the room!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Answer",
        description: "That's not quite right. Keep trying!",
      });
    }
  };

  const handleGetHint = async () => {
    if (!puzzle) return;
    setIsHintLoading(true);
    setHint('');
    try {
        const result = await generateClue({
            roomDescription: room.description,
            puzzleDescription: puzzle.description,
        });
        setHint(result.clue);
    } catch (error) {
        console.error("Failed to generate hint:", error);
        toast({
            variant: "destructive",
            title: "Oh no! Something went wrong.",
            description: "There was a problem getting your hint. Please try again.",
        });
    } finally {
        setIsHintLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">The Final Challenge</CardTitle>
        <CardDescription>{puzzle ? puzzle.description : 'Your escape begins now. Good luck.'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isSolved ? (
             <Alert className="border-green-500 bg-green-500/10 text-green-700">
                <AlertTitle className="font-bold">Room Solved!</AlertTitle>
                <AlertDescription>
                    You successfully escaped! Why not try another room from the leaderboard?
                </AlertDescription>
            </Alert>
        ) : (
            <form onSubmit={handleSubmit} className="flex w-full items-start gap-2">
                <div className="flex-grow space-y-2">
                    <Input 
                        type="text" 
                        placeholder="Enter code or answer..." 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        aria-label="Puzzle Answer"
                    />
                    {hint && (
                        <Alert variant="default" className="bg-muted/50">
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Hint</AlertTitle>
                            <AlertDescription>{hint}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <Button type="submit">Submit</Button>
                {puzzle && (
                    <Button type="button" variant="outline" onClick={handleGetHint} disabled={isHintLoading}>
                        {isHintLoading ? <Loader2 className="animate-spin" /> : <Lightbulb />}
                        <span className="sr-only sm:not-sr-only sm:ml-2">Hint</span>
                    </Button>
                )}
            </form>
        )}
      </CardContent>
    </Card>
  );
}
