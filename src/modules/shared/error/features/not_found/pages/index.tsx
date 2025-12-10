import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="grid w-full h-screen grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr]">
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="max-w-lg">
          <p className="text-base/8 font-semibold text-stone-500">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-stone-900 sm:text-6xl font-serif">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-stone-500 sm:text-xl/8">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <div className="mt-10">
            <Link
              to={ROUTES.Client.ViewReservations}
              className="text-sm/7 px-8 py-3.5 rounded-full font-semibold bg-stone-600 text-white hover:bg-stone-700 transition-colors"
            >
              <span aria-hidden="true">&larr;</span> Volver a la página
              principal
            </Link>
          </div>
        </div>
      </main>

      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <Image
          alt="El Hangar"
          src="/images/base_operativa.webp"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}
