
import { RoomObject, RoomObjectType } from "./types";

export type RoomTemplate = {
  id: string;
  name: string;
  description: string;
  items: Omit<RoomObject, "id">[];
};

export const roomTemplates: RoomTemplate[] = [
  {
    id: "simple-treasure-hunt",
    name: "Simple Treasure Hunt",
    description: "A classic puzzle where a riddle on a note leads to a key for a locked box.",
    items: [
      {
        name: "Riddle Note",
        type: RoomObjectType.Note,
        description: "A dusty note reads: 'I have no voice, but I can tell you stories. What am I?'",
        position: { x: 50, y: 100 },
      },
      {
        name: "Locked Chest",
        type: RoomObjectType.Lock,
        description: "A sturdy wooden chest with a 4-letter combination lock. The answer to the riddle might be the code.",
        position: { x: 400, y: 250 },
      },
      {
        name: "Small Key",
        type: RoomObjectType.Key,
        description: "A small, ornate key. Perhaps it opens something important.",
        position: { x: 250, y: 180 },
      },
    ],
  },
    {
    id: "two-step-puzzle",
    name: "Two-Step Puzzle",
    description: "Find a key inside a puzzle box to unlock the final container.",
    items: [
      {
        name: "Main Door Lock",
        type: RoomObjectType.Lock,
        description: "A heavy-duty lock on the main exit. It looks like it needs a specific key.",
        position: { x: 500, y: 100 },
      },
      {
        name: "Sealed Puzzle Box",
        type: RoomObjectType.PuzzleBox,
        description: "A mysterious box with strange symbols on it. Solving the pattern on top reveals a hidden key.",
        position: { x: 100, y: 200 },
      },
    ],
  },
];
