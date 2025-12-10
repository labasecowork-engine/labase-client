import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast p-4 transition-all duration-300 border-none shadow-none flex gap-2 rounded-lg",
          title: "text-sm font-bold",
          description: "text-sm opacity-70",
          error: "text-rose-800 bg-rose-50 ",
          success: "text-emerald-800 bg-emerald-50",
          warning: "text-orange-800 bg-orange-50",
          loading: "text-stone-700 bg-stone-100 gap-2 pl-8",
          loader: " mt-[18px] text-stone-700 pl-6",
          info: "text-sky-800 bg-sky-50",
          icon: "text-sm mt-[2px]  self-start flex h-full",
          actionButton: "bg-white text-black font-medium rounded-lg px-2 py-1",
          cancelButton: "bg-transparent text-white underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
