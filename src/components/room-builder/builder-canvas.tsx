import { Card, CardContent } from "@/components/ui/card";

export function BuilderCanvas() {
  return (
    <Card className="h-full">
      <CardContent className="h-full flex items-center justify-center p-6">
        <div className="text-center text-muted-foreground">
          <h2 className="text-2xl font-headline text-foreground mb-2">Design Your Room</h2>
          <p>Drag and drop elements from the palette to begin.</p>
        </div>
      </CardContent>
    </Card>
  );
}
