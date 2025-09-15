import { Card, CardContent } from "@/components/ui/card";
import { PencilRuler } from "lucide-react";

export function BuilderCanvas() {
  return (
    <Card className="h-full bg-muted/20">
      <CardContent className="h-full flex items-center justify-center p-6">
        <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
            <PencilRuler className="w-16 h-16 mx-auto mb-4 text-primary/50" />
          <h2 className="text-2xl font-headline text-foreground mb-2">Design Your Room</h2>
          <p>Drag and drop elements from the palette to begin.</p>
        </div>
      </CardContent>
    </Card>
  );
}
