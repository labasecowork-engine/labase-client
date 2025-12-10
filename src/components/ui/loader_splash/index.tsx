import { useState, useEffect } from "react";

const frases = [
  "cargando la aplicación...",
  "cargando reservas...",
  "cargando usuarios...",
  "cargando espacios...",
  "preparando todo para ti...",
];

export const LoaderSplash = () => {
  const [fraseActual, setFraseActual] = useState(0);
  const [textoMostrado, setTextoMostrado] = useState("");
  const [indiceCaracter, setIndiceCaracter] = useState(0);
  const [escribiendo, setEscribiendo] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(
      () => {
        const fraseCompleta = frases[fraseActual];

        if (escribiendo) {
          if (indiceCaracter < fraseCompleta.length) {
            setTextoMostrado(fraseCompleta.substring(0, indiceCaracter + 1));
            setIndiceCaracter(indiceCaracter + 1);
          } else {
            setTimeout(() => setEscribiendo(false), 2000);
          }
        } else {
          if (indiceCaracter > 0) {
            setTextoMostrado(fraseCompleta.substring(0, indiceCaracter - 1));
            setIndiceCaracter(indiceCaracter - 1);
          } else {
            setFraseActual((prev) => (prev + 1) % frases.length);
            setEscribiendo(true);
          }
        }
      },
      escribiendo ? 100 : 50
    );

    return () => clearInterval(intervalo);
  }, [fraseActual, indiceCaracter, escribiendo, frases]);

  return (
    <div className="w-screen h-screen bg-stone-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-48" />
        <p className="text-stone-200 text-base font-serif font-medium h-6">
          Estamos {textoMostrado}
          <span className="animate-pulse text-stone-400">|</span>
        </p>
      </div>
    </div>
  );
};
