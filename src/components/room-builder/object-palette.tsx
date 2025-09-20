
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, KeyRound, Lock, Puzzle, ScrollText } from "lucide-react";
import { useBuilder } from "./builder-context";
import { RoomObjectType } from "@/lib/types";

const objects = [
  { name: "Key", icon: <KeyRound />, type: RoomObjectType.Key },
  { name: "Lock", icon: <Lock />, type: RoomObjectType.Lock },
  { name: "Note", icon: <ScrollText />, type: RoomObjectType.Note },
  { name: "Puzzle Box", icon: <Box />, type: RoomObjectType.PuzzleBox },
];

export function ObjectPalette() {
  const { addItem } = useBuilder();
  return (
    <Card className="h-full flex flex-col bg-muted/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl">
          <Puzzle className="w-6 h-6 text-primary" />
          Objects
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {objects.map((obj) => (
            <Button
              key={obj.name}
              variant="outline"
              className="h-24 flex flex-col gap-2 text-lg hover:bg-muted/50"
              aria-label={`Add ${obj.name}`}
              onClick={() => addItem(obj.type)}
            >
              {obj.icon}
              <span>{obj.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
