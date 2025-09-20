
"use client";

import { RoomObject, RoomObjectType } from "@/lib/types";
import { createContext, useContext, useState } from "react";


type BuilderContextType = {
  items: RoomObject[];
  addItem: (type: RoomObjectType) => void;
  updateItem: (id: string, updates: Partial<Omit<RoomObject, 'id' | 'type'>>) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  selectedItem: RoomObject | null;
};

const BuilderContext = createContext<BuilderContextType | null>(null);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};

export const BuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<RoomObject[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const addItem = (type: RoomObjectType) => {
    const newItem: RoomObject = {
      id: `${type}-${Date.now()}`,
      type,
      name: `New ${type}`,
      description: "",
      position: { x: 50, y: 50 },
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<Omit<RoomObject, 'id' | 'type'>>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const selectedItem = items.find((item) => item.id === selectedItemId) || null;

  return (
    <BuilderContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        selectedItemId,
        setSelectedItemId,
        selectedItem,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
