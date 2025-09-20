
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { publishRoom } from "@/lib/rooms-service";
import { Loader2, UploadCloud } from "lucide-react";
import { useBuilder } from "./builder-context";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Room title must be at least 5 characters.",
  }).max(50, {
    message: "Room title must be less than 50 characters.",
  }),
  description: z.string().min(10, {
    message: "Room description must be at least 10 characters.",
  }).max(500, {
    message: "Room description must be less than 500 characters.",
  }),
});

export function PublishRoomForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { items } = useBuilder();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Room",
        description: "You must add at least one object to the canvas before publishing.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await publishRoom({ ...values, items });
      toast({
        title: "Room Published!",
        description: "Your escape room is now live for others to play.",
      });
      router.push(`/rooms/${result.id}`);
    } catch (error) {
      console.error("Failed to publish room:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem publishing your room. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
        <h3 className="font-semibold mb-2 text-lg flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary"/>
            Publish Your Room
        </h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-background/50">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Room Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., The Alchemist's Laboratory" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Room Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="A brief, enticing summary of your room's story and challenge."
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <UploadCloud className="mr-2 h-4 w-4" />
                )}
                Publish to Community
                </Button>
            </form>
        </Form>
    </div>
  );
}
