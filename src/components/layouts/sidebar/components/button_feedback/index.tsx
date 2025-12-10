import { MessageCircleIcon } from "lucide-react";

export const ButtonFeedback = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      <a
        href="https://forms.gle/pYU3v1GwJrmjhQVU6"
        target="_blank"
        className="group flex items-center rounded-full bg-stone-500 px-3 py-3 text-white hover:bg-stone-400 justify-center opacity-75 hover:opacity-100 transition-all duration-300 text-sm font-medium hover:px-8 overflow-hidden"
      >
        <MessageCircleIcon className="size-5 flex-shrink-0" />
        <span className="whitespace-nowrap opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-300 group-hover:ml-2">
          Valorar
        </span>
      </a>
    </div>
  );
};
