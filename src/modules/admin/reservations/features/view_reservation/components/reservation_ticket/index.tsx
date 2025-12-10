import { format } from "date-fns";
import { es } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";
import type { AdminReservationResponse } from "../../types";

type ReservationTicketProps = {
  reservationData: AdminReservationResponse;
};

export const ReservationTicket = ({
  reservationData,
}: ReservationTicketProps) => {
  const { reservation } = reservationData;
  const price = `S/${parseFloat(reservation.price).toFixed(2)}`;
  const userName = `${reservation.user.first_name} ${reservation.user.last_name}`;

  return (
    <>
      <div className="w-full mt-4 overflow-hidden rounded-lg mx-auto max-w-[400px] lg:max-w-none">
        <div className="bg-stone-100 relative w-full max-w-[400px] mx-auto lg:max-w-none">
          <div className="text-left px-6 sm:px-10 py-4 bg-stone-200">
            <h3 className="text-xl font-bold text-stone-900">RESERVA</h3>
            <p className="text-xs text-stone-500 mt-1">
              Ticket #{reservation.id.split("-")[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 lg:gap-16 px-6 sm:px-10 pb-10 mt-10">
            <div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-stone-700 mb-1">
                  ESPACIO:
                </p>
                <p className="text-sm text-stone-900">
                  {reservation.space.name}
                </p>
                <p className="text-xs text-stone-500">
                  {reservation.space.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                  NOMBRE DEL CLIENTE:
                </p>
                <p className="text-sm text-stone-900">{userName}</p>
              </div>

              <div className="border-b border-dashed border-stone-300 my-4"></div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    FECHA:
                  </p>
                  <p className="text-sm text-stone-900">
                    {format(new Date(reservation.start_time), "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    HORARIO:
                  </p>
                  <p className="text-sm text-stone-900">
                    {format(new Date(reservation.start_time), "HH:mm")} -{" "}
                    {format(new Date(reservation.end_time), "HH:mm", {
                      locale: es,
                    })}
                  </p>
                </div>
              </div>

              <div className="border-b border-dashed border-stone-300 my-4"></div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    PERSONAS:
                  </p>
                  <p className="text-sm text-stone-900">{reservation.people}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-1">
                    ESPACIO COMPLETO:
                  </p>
                  <p className="text-sm text-stone-900">
                    {reservation.full_room ? "Sí" : "No"}
                  </p>
                </div>
              </div>

              <div className="block lg:hidden">
                <p className="text-xs font-semibold text-stone-700 mb-1 border-t border-dashed border-stone-300 pt-4">
                  CÓDIGO DE RESERVA:
                </p>
                <div className="flex justify-center my-4 w-full">
                  <QRCodeSVG
                    value={reservation.code_qr}
                    bgColor="#f5f5f4"
                    size={250}
                  />
                </div>
              </div>

              <div className="border-t border-dashed border-stone-300 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-stone-700">
                    TOTAL ESTIMADO:
                  </p>
                  <p className="text-lg font-bold text-stone-900">{price}</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-start items-center h-full">
              <div>
                <QRCodeSVG
                  value={reservation.code_qr}
                  bgColor="#f5f5f4"
                  size={250}
                />
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>

          <div className="absolute -right-3 top-[50%] size-6 lg:size-8 bg-white rounded-full"></div>
        </div>
      </div>

      {/* <div className="mt-4 w-full lg:flex lg:justify-end max-w-[400px] mx-auto lg:max-w-none">
        <Button className="bg-stone-900 text-white py-4 px-8 flex w-full lg:w-auto">
          <PrinterIcon className="size-4 gap-2 text-white" />
          Imprimir ticket
        </Button>
      </div> */}
    </>
  );
};
