import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIClueGenerator } from "./ai-clue-generator";
import { Settings } from "lucide-react";

export function PropertiesPanel() {
  return (
    <Card className="h-full flex flex-col bg-muted/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl">
          <Settings className="w-6 h-6 text-primary" />
          Properties
        </CardTitle>
        <CardDescription>Select an object to edit its properties and logic.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-6">
        <div className="text-center text-sm text-muted-foreground border-2 border-dashed rounded-lg p-8">
          <p>No object selected</p>
        </div>
        <AIClueGenerator />
      </CardContent>
    </Card>
  );
}
