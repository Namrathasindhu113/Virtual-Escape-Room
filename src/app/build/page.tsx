
import { BuilderProvider } from "@/components/room-builder/builder-context";
import { BuilderCanvas } from "@/components/room-builder/builder-canvas";
import { ObjectPalette } from "@/components/room-builder/object-palette";
import { PropertiesPanel } from "@/components/room-builder/properties-panel";

export default function BuildPage() {
  return (
    <BuilderProvider>
      <div className="h-[calc(100vh-4rem)] bg-muted/40">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] h-full gap-4 p-4">
          <ObjectPalette />
          <BuilderCanvas />
          <PropertiesPanel />
        </div>
      </div>
    </BuilderProvider>
  );
}
