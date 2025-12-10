import { Button } from "@/components/ui";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface Props {
  handleRegisterAttendance: (type: "entry" | "exit") => void;
  isRegistering: boolean;
  type: "entry" | "exit";
}

export const CardButton: React.FC<Props> = ({
  handleRegisterAttendance,
  isRegistering,
  type,
}) => {
  return (
    <div className="flex justify-center items-center">
      <Button
        className={twMerge(
          "flex items-center gap-2 flex-col h-[200px] sm:h-[300px]  text-white rounded-lg w-full  text-sm md:text-base",
          type === "entry" && "bg-stone-800/50 hover:bg-stone-800/70",
          type === "exit" && "bg-orange-800/50 hover:bg-orange-800/70"
        )}
        onClick={() => handleRegisterAttendance(type)}
        disabled={isRegistering}
      >
        {type === "entry" ? (
          <PlayIcon className="size-10 md:size-16" />
        ) : (
          <StopIcon className="size-10 md:size-16" />
        )}
        {isRegistering
          ? type === "entry"
            ? "Registrando entrada..."
            : "Registrando salida..."
          : type === "entry"
            ? "Registrar entrada"
            : "Registrar salida"}
      </Button>
    </div>
  );
};
