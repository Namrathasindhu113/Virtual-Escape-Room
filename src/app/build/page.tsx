
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { BuilderProvider } from "@/components/room-builder/builder-context";
import { BuilderCanvas } from "@/components/room-builder/builder-canvas";
import { ObjectPalette } from "@/components/room-builder/object-palette";
import { PropertiesPanel } from "@/components/room-builder/properties-panel";
import { Loader2 } from 'lucide-react';

export default function BuildPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/build');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-2xl font-headline text-foreground mb-2">Loading Builder...</h2>
            <p className="text-muted-foreground">Please wait, redirecting to login if needed.</p>
        </div>
      </div>
    );
  }

  return (
    <BuilderProvider>
      <div className="h-[calc(100vh-4rem)] bg-muted/40">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] h-full gap-4 p-4">
          <div className="flex flex-col gap-4">
            <ObjectPalette />
          </div>
          <BuilderCanvas />
          <PropertiesPanel />
        </div>
      </div>
    </BuilderProvider>
  );
}
