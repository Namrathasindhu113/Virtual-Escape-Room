
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIClueGenerator } from "./ai-clue-generator";
import { Settings } from "lucide-react";
import { useBuilder } from "./builder-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PropertiesPanel() {
  const { selectedItem, updateItem } = useBuilder();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem) {
      updateItem(selectedItem.id, { name: e.target.value });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedItem) {
        updateItem(selectedItem.id, { description: e.target.value });
    }
  };

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
        {selectedItem ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name">Object Name</Label>
              <Input 
                id="item-name"
                value={selectedItem.name} 
                onChange={handleNameChange}
              />
            </div>
            <div>
                <Label htmlFor="item-desc">Description</Label>
                <Textarea 
                    id="item-desc"
                    placeholder="Describe the object and its role in the puzzle."
                    value={selectedItem.description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <AIClueGenerator
                puzzleDescription={selectedItem.description}
            />
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground border-2 border-dashed rounded-lg p-8">
            <p>No object selected</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
