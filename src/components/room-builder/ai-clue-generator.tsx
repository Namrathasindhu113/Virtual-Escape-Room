
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateClue } from "@/ai/flows/generate-clues";
import { Loader2, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  roomDescription: z.string().min(10, {
    message: "Room description must be at least 10 characters.",
  }),
  puzzleDescription: z.string().min(10, {
    message: "Puzzle description must be at least 10 characters.",
  }),
});

type AIClueGeneratorProps = {
    puzzleDescription: string;
}

export function AIClueGenerator({ puzzleDescription }: AIClueGeneratorProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedClue, setGeneratedClue] = React.useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomDescription: "",
      puzzleDescription: "",
    },
  });

  React.useEffect(() => {
    form.setValue("puzzleDescription", puzzleDescription);
  }, [puzzleDescription, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedClue("");
    try {
      const result = await generateClue(values);
      setGeneratedClue(result.clue);
      toast({
        title: "Clue Generated!",
        description: "A new hint has been successfully created by the AI.",
      });
    } catch (error) {
      console.error("Failed to generate clue:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem generating your clue. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-muted/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-headline">
                <Wand2 className="w-5 h-5 text-primary" />
                AI Clue Generator
            </CardTitle>
            <CardDescription>
                Stuck on a hint? Describe the room and the selected object to create a clever clue.
            </CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roomDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A dusty Victorian study with a large globe and a locked roll-top desk."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puzzleDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Object Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., The globe has symbols for continents. The desk has a 4-digit combination lock."
                      {...field}
                      readOnly
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading || !form.getValues().puzzleDescription} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Clue
            </Button>
          </form>
        </Form>
        {generatedClue && (
          <div className="mt-6">
            <Separator />
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Generated Clue:</h4>
                <p className="text-sm p-3 bg-background rounded-md border text-foreground/80">
                    {generatedClue}
                </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
