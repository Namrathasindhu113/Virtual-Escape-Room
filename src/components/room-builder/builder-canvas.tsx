
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PencilRuler } from "lucide-react";
import { useBuilder } from "./builder-context";
import { CanvasItem } from "./canvas-item";

export function BuilderCanvas() {
  const { items, setSelectedItemId, handleCanvasMouseMove, handleCanvasMouseUp, draggingItemId } = useBuilder();

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Deselect if clicking on the canvas background
    if (e.target === e.currentTarget) {
      setSelectedItemId(null);
    }
  };

  return (
    <Card
      className="h-full bg-muted/20 relative overflow-hidden"
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp} // Stop dragging if mouse leaves canvas
    >
      <CardContent className="h-full p-0">
        {items.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
              <PencilRuler className="w-16 h-16 mx-auto mb-4 text-primary/50" />
              <h2 className="text-2xl font-headline text-foreground mb-2">Design Your Room</h2>
              <p>Click objects from the palette to add them here.</p>
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {items.map((item) => (
              <CanvasItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
