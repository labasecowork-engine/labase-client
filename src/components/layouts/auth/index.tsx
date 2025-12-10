import { Image } from "@/components/ui";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[1fr_auto]">
      {/* Panel Izquierdo - Imagen */}
      <div className="hidden lg:flex flex-1 ">
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src="/images/recepcion.jpg"
            alt="Recepción"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/70 flex items-end justify-start p-4"></div>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="flex items-center justify-center p-4 lg:p-16 w-full lg:w-xl">
        <Outlet />
      </div>
    </main>
  );
}
