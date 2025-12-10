import { useState } from "react";
import { Image } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CancelReservationDialog } from "../cancel_reservation_dialog";
import { Link } from "react-router-dom";
import { RESERVATION_STATUS_PENDING } from "@/types";

interface Props {
  id: string;
  spaceName: string;
  spaceImageUrl: string;
  people: number;
  price: string;
  dateReservation: string;
  timeReservation: string;
  status: string;
}

export const SpaceCard: React.FC<Props> = ({
  id,
  spaceName,
  spaceImageUrl,
  people,
  price,
  dateReservation,
  timeReservation,
  status,
}) => {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCancelDialogOpen(true);
  };

  return (
    <>
      <Link
        to={`/client/reservations/${id}`}
        key={id}
        className="overflow-hidden bg-stone-50 rounded-lg block"
      >
        <div className="flex relative h-[200px]">
          <div className="absolute top-0 left-0 w-full h-full z-10">
            <Image
              src={spaceImageUrl}
              alt="image"
              className="w-full object-cover h-full"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-20"></div>
          <div className="text-sm/6 font-medium text-stone-50 p-4 z-30 absolute bottom-0">
            {spaceName}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-2 top-2 z-30 block text-stone-50 hover:text-stone-100 bg-stone-50/30 rounded-full p-1 hover:bg-stone-50/50 transition-all cursor-pointer">
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-0 z-30 mt-0.5 rounded-lg w-32 origin-top-right bg-white py-2 shadow-lg ring-1 ring-stone-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
              <DropdownMenuItem className="px-3 py-1 rounded-lg cursor-pointer">
                <a
                  href="#"
                  className="block text-sm/6 text-stone-900 data-focus:bg-stone-50 data-focus:outline-hidden transition-all"
                >
                  Ver<span className="sr-only">, {spaceName}</span>
                </a>
              </DropdownMenuItem>

              {status === RESERVATION_STATUS_PENDING && (
                <DropdownMenuItem
                  className="px-3 py-1 rounded-lg cursor-pointer"
                  variant="destructive"
                >
                  <button
                    onClick={handleCancelClick}
                    className="block text-sm/6 text-rose-800 data-focus:outline-hidden transition-all w-full text-left"
                  >
                    Cancelar<span className="sr-only">, {spaceName}</span>
                  </button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="divide-y divide-stone-100 px-3 py-3 text-xs">
          <div className="py-3">
            <div className="flex justify-between gap-x-4 mb-1">
              <div className="text-stone-500">Fecha de reserva</div>
              <div className="text-stone-700">
                <time>{dateReservation}</time>
              </div>
            </div>
            <div className="flex justify-between gap-x-4">
              <div className="text-stone-500">Hora de reserva</div>
              <div className="text-stone-700">
                <time>{timeReservation}</time>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <div className="text-stone-500">Personas</div>
            <div className="text-stone-700">
              <span className="text-stone-900 font-medium">{people}</span>
            </div>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <div className="text-stone-500">Precio</div>
            <div className="flex items-start gap-x-2">
              <div className="font-medium text-stone-900">{price}</div>
            </div>
          </div>
        </div>
      </Link>
      <CancelReservationDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        reservationId={id}
        spaceName={spaceName}
      />
    </>
  );
};
