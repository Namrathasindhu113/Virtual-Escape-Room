
"use client";

import { RoomObject, RoomObjectType } from "@/lib/types";
import { RoomTemplate } from "@/lib/room-templates";
import React, { createContext, useContext, useState, useRef, useCallback } from "react";

type BuilderContextType = {
  items: RoomObject[];
  addItem: (type: RoomObjectType) => void;
  updateItem: (id: string, updates: Partial<Omit<RoomObject, 'id' | 'type'>>) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  selectedItem: RoomObject | null;
  loadTemplate: (template: RoomTemplate) => void;
  
  // Drag and Drop state
  draggingItemId: string | null;
  handleItemMouseDown: (e: React.MouseEvent, itemId: string) => void;
  handleCanvasMouseMove: (e: React.MouseEvent) => void;
  handleCanvasMouseUp: () => void;
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
  
  // Drag and Drop state
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

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

  const updateItem = useCallback((id: string, updates: Partial<Omit<RoomObject, 'id' | 'type'>>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const loadTemplate = (template: RoomTemplate) => {
    const templateItems = template.items.map((item, index) => ({
        ...item,
        id: `${item.type}-${Date.now()}-${index}`,
    }));
    setItems(templateItems);
    setSelectedItemId(null);
  }

  const handleItemMouseDown = (e: React.MouseEvent, itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    setDraggingItemId(itemId);
    setSelectedItemId(itemId);

    const canvasRect = (e.currentTarget.offsetParent as HTMLElement)?.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - canvasRect.left - item.position.x,
      y: e.clientY - canvasRect.top - item.position.y,
    };

    e.preventDefault();
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!draggingItemId) return;
    const canvasRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffsetRef.current.x;
    const newY = e.clientY - canvasRect.top - dragOffsetRef.current.y;
    
    // Boundary checks to keep the item within the canvas
    const clampedX = Math.max(0, Math.min(newX, canvasRect.width - 50)); // Assuming item width is approx 50
    const clampedY = Math.max(0, Math.min(newY, canvasRect.height - 50)); // Assuming item height is approx 50
    
    updateItem(draggingItemId, { position: { x: clampedX, y: clampedY } });
  };
  
  const handleCanvasMouseUp = () => {
    setDraggingItemId(null);
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
        loadTemplate,
        draggingItemId,
        handleItemMouseDown,
        handleCanvasMouseMove,
        handleCanvasMouseUp,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
