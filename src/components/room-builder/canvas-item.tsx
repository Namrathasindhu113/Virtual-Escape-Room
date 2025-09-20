
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
    const { selectedItemId, setSelectedItemId, handleItemMouseDown, draggingItemId } = useBuilder();
    const isSelected = selectedItemId === item.id;
    const isDragging = draggingItemId === item.id;

    return (
        <div
            className={cn(
                "absolute p-2 border-2 rounded-lg flex flex-col items-center bg-card shadow-md",
                "transition-all duration-75 ease-in-out",
                isSelected ? "border-primary shadow-lg z-10" : "border-transparent hover:border-primary/50",
                isDragging ? "cursor-grabbing z-20 scale-110 shadow-2xl" : "cursor-grab"
            )}
            style={{ 
                top: `${item.position.y}px`, 
                left: `${item.position.x}px`,
                transform: isDragging ? 'translate(-50%, -50%)' : 'none',
             }}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedItemId(item.id);
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                handleItemMouseDown(e, item.id);
            }}
        >
            <div className="text-primary">{objectIcons[item.type]}</div>
            <p className="text-xs text-foreground truncate select-none">{item.name}</p>
        </div>
    );
};
