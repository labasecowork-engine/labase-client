import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Image,
} from "@/components/ui";
import {
  formatSpaceType,
  formatDurationUnit,
  formatPriceMode,
} from "@/utilities";
import { Tag, Users, Shield, KeyRound, Calendar } from "lucide-react";

import { InfoItem } from "../info_item";
import { PermissionItem } from "../permission_item";
import type { Price, Space, SpaceImage } from "@/types/spaces";

export const SpaceDetails: React.FC<Space> = (props) => {
  return (
    <Card className="mt-8 border-stone-200 overflow-hidden">
      {props.space_images.length > 0 && (
        <Carousel>
          <CarouselContent>
            {props.space_images.map((image: SpaceImage) => (
              <CarouselItem key={image.id}>
                <Image
                  src={image.url}
                  alt={props.name}
                  className="w-full h-[500px] object-cover rounded-t-sm"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {props.space_images.length > 1 && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2" />
            </>
          )}
        </Carousel>
      )}
      <CardHeader>
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div className="w-full">
            <CardDescription>{props.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-lg bg-stone-100 p-6">
          <InfoItem
            icon={Tag}
            label="Tipo"
            value={formatSpaceType(props.type)}
          />
          <InfoItem
            icon={Shield}
            label="Acceso"
            value={props.access === "public" ? "Público" : "Privado"}
          />
          <InfoItem
            icon={Users}
            label="Capacidad"
            value={`${props.capacity_min} - ${props.capacity_max} personas`}
          />
          <InfoItem
            icon={KeyRound}
            label="Estado"
            value={props.disabled ? "Desactivado" : "Activado"}
            isStatus
            statusValue={!props.disabled}
          />
        </div>

        <div className="mt-6 mb-4">
          <h3 className="text-lg font-semibold font-serif text-stone-800 mb-2">
            Modalidades de reserva
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PermissionItem
              label="Reserva por persona (individual)"
              allowed={props.allow_by_unit}
            />
            <PermissionItem
              label="Reserva de espacio completo (grupal)"
              allowed={props.allow_full_room}
            />
          </div>
        </div>

        <div className="mt-6 mb-4">
          <h3 className="text-lg font-semibold font-serif text-stone-800 mb-2">
            Tarifas establecidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {props.prices.map((price: Price, index: number) => (
              <div
                key={price.id || `${price.duration}-${price.mode}-${index}`}
                className="p-4 rounded-lg bg-stone-100 "
              >
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="size-4" />
                  <p className="font-medium text-xs">
                    {formatDurationUnit(price.duration)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-stone-600 mt-1">
                  <Users className="size-4" />
                  <p className="font-medium text-xs">
                    {formatPriceMode(price.mode)}
                  </p>
                </div>
                <div className="flex items-baseline gap-2 ">
                  <p className="text-sm text-muted-foreground">S/</p>
                  <p className="font-bold text-2xl text-stone-900 font-serif">
                    {price.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {props.prices.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No hay tarifas definidas para este espacio.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-stone-50 border-t border-stone-200 rounded-b-lg ">
        <p className="text-xs text-muted-foreground px-4">
          ID del Espacio: {props.id}
        </p>
      </CardFooter>
    </Card>
  );
};
