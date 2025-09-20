
"use client";

import type { RoomObject } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Box, KeyRound, Lock, ScrollText, Eye } from "lucide-react";
import { RoomObjectType } from "@/lib/types";

type InteractiveRoomProps = {
  items: RoomObject[];
};

const objectIcons: Record<RoomObjectType, React.ReactNode> = {
    [RoomObjectType.Key]: <KeyRound className="w-5 h-5" />,
    [RoomObjectType.Lock]: <Lock className="w-5 h-5" />,
    [RoomObjectType.Note]: <ScrollText className="w-5 h-5" />,
    [RoomObjectType.PuzzleBox]: <Box className="w-5 h-5" />,
};


export function InteractiveRoom({ items }: InteractiveRoomProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Examine the Room
            </CardTitle>
            <CardDescription>
                Look closely at the objects in the room. The clues you need are hidden in their descriptions.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <span className="text-primary">{objectIcons[item.type]}</span>
                                <span className="font-semibold">{item.name}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-foreground/80 pl-8">{item.description || "There's nothing noteworthy about this object."}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
    </Card>
  );
}
