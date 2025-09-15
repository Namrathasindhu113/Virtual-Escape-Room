import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIClueGenerator } from "./ai-clue-generator";

export function PropertiesPanel() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Properties</CardTitle>
        <CardDescription>Select an object to edit its properties and logic.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-6">
        <div className="text-center text-sm text-muted-foreground border border-dashed rounded-lg p-8">
          <p>No object selected</p>
        </div>
        <AIClueGenerator />
      </CardContent>
    </Card>
  );
}
