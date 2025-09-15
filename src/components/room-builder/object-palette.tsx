import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, KeyRound, Lock, ScrollText } from "lucide-react";

const objects = [
  { name: "Key", icon: <KeyRound /> },
  { name: "Lock", icon: <Lock /> },
  { name: "Note", icon: <ScrollText /> },
  { name: "Puzzle Box", icon: <Box /> },
];

export function ObjectPalette() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Objects & Puzzles</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {objects.map((obj) => (
            <Button
              key={obj.name}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              aria-label={`Add ${obj.name}`}
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
