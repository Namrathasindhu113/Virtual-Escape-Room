
"use client";

import { RoomObject, RoomObjectType } from "@/lib/types";
import { useBuilder } from "./builder-context";
import { Box, KeyRound, Lock, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";


type CanvasItemProps = {
    item: RoomObject;
};

const objectIcons: Record<RoomObjectType, React.ReactNode> = {
    [RoomObjectType.Key]: <KeyRound />,
    [RoomObjectType.Lock]: <Lock />,
    [RoomObjectType.Note]: <ScrollText />,
    [RoomObjectType.PuzzleBox]: <Box />,
};


export const CanvasItem = ({ item }: CanvasItemProps) => {
    const { selectedItemId, setSelectedItemId } = useBuilder();
    const isSelected = selectedItemId === item.id;

    return (
        <div
            className={cn(
                "absolute p-2 border-2 rounded-lg flex flex-col items-center cursor-pointer bg-card",
                isSelected ? "border-primary shadow-lg" : "border-transparent hover:border-primary/50"
            )}
            style={{ top: `${item.position.y}px`, left: `${item.position.x}px` }}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedItemId(item.id);
            }}
        >
            <div className="text-primary">{objectIcons[item.type]}</div>
            <p className="text-xs text-foreground truncate">{item.name}</p>
        </div>
    );
};
