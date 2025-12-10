import { Button, Input } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { sendMessage } from "../../services";
import { toast } from "sonner";

export const SendMessage = () => {
  const [newMessage, setNewMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
  });

  const onSuccess = () => {
    toast.success("Mensaje enviado", {
      description: "Tu mensaje ha sido enviado correctamente",
    });
    setNewMessage("");
  };

  const onError = (error: Error) => {
    toast.error("Error al enviar mensaje", {
      description: error.message,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      mutate(newMessage, {
        onSuccess,
        onError,
      });
    }
  };

  return (
    <div className="fixed max-w-4xl mx-auto bottom-0 left-0 right-0 rounded-lg px-4">
      <div className="bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="px-4 py-3 h-[40px]"
            />
          </div>
          <Button
            type="submit"
            className="rounded-lg h-[40px]"
            disabled={!newMessage.trim() || isPending}
          >
            <SendIcon className="w-5 h-5" />
            {isPending ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </div>
    </div>
  );
};
