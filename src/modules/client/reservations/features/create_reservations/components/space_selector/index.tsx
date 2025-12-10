import { forwardRef } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
import type { Space } from "@/types/spaces";
import { LoadingSpaceState } from "../loading_space_state";
import { SpaceCardList } from "../";

interface Props {
  spaces: Space[];
  selectedSpace: string | null;
  onSpaceSelect: (spaceId: string) => void;
  error?: string;
  isLoading: boolean;
}

export const SpaceSelector = forwardRef<HTMLDivElement, Props>(
  ({ spaces, selectedSpace, onSpaceSelect, error, isLoading }, ref) => {
    return (
      <Card ref={ref} className="mb-8 w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Selecciona tu espacio</CardTitle>
          <CardDescription>
            Espacios ideales para tu productividad y trabajo en equipo.
          </CardDescription>
        </CardHeader>

        <ScrollArea className="  overflow-auto h-[430px]">
          <div className="px-6">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {isLoading ? (
                <LoadingSpaceState />
              ) : (
                spaces.map((space) => (
                  <SpaceCardList
                    key={space.id}
                    space={space}
                    selectedSpace={selectedSpace}
                    onSpaceSelect={onSpaceSelect}
                  />
                ))
              )}
            </div>
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {error && <p className="text-rose-800 text-xs px-6 pb-4">{error}</p>}
      </Card>
    );
  }
);
