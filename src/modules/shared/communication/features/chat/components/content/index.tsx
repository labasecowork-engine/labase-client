import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getMessages } from "../../services";
import type { Message } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { socket } from "@/services/socket";

export const Content = () => {
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery<{ [key: string]: Message[] }>({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("new_message", (message: Message) => {
      queryClient.setQueryData<{ [key: string]: Message[] }>(
        ["messages"],
        (oldData) => {
          if (!oldData) return oldData;

          const dateKey = formatDate(message.created_at, "yyyy-MM-dd");
          const updatedData = { ...oldData };

          if (updatedData[dateKey]) {
            const messageExists = updatedData[dateKey].some(
              (existingMessage) => existingMessage.id === message.id
            );

            if (!messageExists) {
              updatedData[dateKey] = [...updatedData[dateKey], message];
            }
          } else {
            updatedData[dateKey] = [message];
          }

          return updatedData;
        }
      );
    });

    return () => {
      socket.off("new_message");
    };
  }, [queryClient]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      scrollToBottom();
    }
  }, [data]);

  return (
    <div className="flex-1 bg-stone-50 rounded-lg overflow-y-auto px-6 pt-4 pb-10 space-y-4">
      {Object.entries(data || {}).map(([date, dateMessages]) => (
        <div key={date}>
          <p className="text-sm font-semibold text-stone-600 mx-auto bg-stone-200 rounded-lg px-4 py-2 w-fit my-8">
            {formatDate(date, "dd 'de' MMMM 'del' yyyy", { locale: es })}
          </p>
          <div className="mb-4">
            {dateMessages.map((message, index) => {
              const previousMessage =
                index > 0 ? dateMessages[index - 1] : null;
              const isConsecutiveMessage =
                previousMessage && previousMessage.user_id === message.user_id;

              return (
                <div
                  key={message.id}
                  className={`flex space-x-3 items-start ${isConsecutiveMessage ? "mt-1" : "mt-4"}`}
                >
                  <div className="size-10 relative">
                    {!isConsecutiveMessage ? (
                      <Avatar className="size-10 relative">
                        <AvatarImage src={message.user.profile_image || ""} />
                        <AvatarFallback>
                          {message.user.first_name.charAt(0)}
                          {message.user.last_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="size-10" />
                    )}
                  </div>

                  <div className="flex-col flex-1">
                    {!isConsecutiveMessage && (
                      <div className="flex items-center justify-start gap-2 mb-1">
                        <h1 className="text-sm font-medium text-stone-900">
                          {message.user.first_name} {message.user.last_name}
                        </h1>
                        <p className="text-xs text-stone-500">
                          {formatDate(message.created_at, "HH:mm")}
                        </p>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-lg px-4 py-2 border border-stone-100 relative group">
                        <p className="text-stone-800 text-sm leading-relaxed">
                          {message.message}
                        </p>
                        {isConsecutiveMessage && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded">
                              {formatDate(message.created_at, "HH:mm")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
