import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { getSubscribers, sendNewsletter } from "../service";
import { sendNewsletterSchema } from "../schemas";
import {
  DesktopSubscribersList,
  EmptyState,
  ErrorState,
  MobileSubscribersList,
  NewsletterForm,
} from "../components";
import type { SendNewsletterData } from "../types";
import { ROUTES } from "@/routes/routes";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function SendNewsletterPage() {
  const { changeTitle } = useTitle();
  const { mutate: sendNewsletterMutation, isPending } = useMutation({
    mutationFn: sendNewsletter,
    mutationKey: ["send-newsletter"],
  });
  const {
    data: subscribers,
    isPending: isPendingSubscribers,
    isError,
  } = useQuery({
    queryKey: ["get-subscribers"],
    queryFn: getSubscribers,
  });
  const [isSubscribersExpanded, setIsSubscribersExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendNewsletterData>({
    resolver: zodResolver(sendNewsletterSchema),
  });

  const onSubmit = (data: SendNewsletterData) => {
    sendNewsletterMutation(data, {
      onSuccess,
      onError,
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al enviar newsletter", {
      description: error.message || "Hubo un problema al enviar el newsletter",
    });
  };

  const onSuccess = () => {
    toast.success("Newsletter enviado exitosamente", {
      description: `Se envió a ${subscribers?.data?.count} suscriptores`,
    });
    reset();
  };

  const toggleSubscribersExpansion = () => {
    setIsSubscribersExpanded(!isSubscribersExpanded);
  };

  useEffect(() => {
    changeTitle("Gestor de newsletters - La base");
  }, [changeTitle]);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <CustomHeader
          title="Gestor de Newsletters"
          to={ROUTES.Admin.ViewTools}
        />
      </div>

      {isPendingSubscribers && (
        <div className="h-[675px] animate-pulse w-full bg-stone-100"></div>
      )}

      {!isPendingSubscribers && isError && <ErrorState />}

      {!isPendingSubscribers && !isError && subscribers?.data?.total === 0 && (
        <EmptyState />
      )}

      {!isPendingSubscribers &&
        !isError &&
        subscribers?.data &&
        subscribers.data.total > 0 && (
          <>
            <MobileSubscribersList
              isExpanded={isSubscribersExpanded}
              onToggle={toggleSubscribersExpansion}
              data={subscribers.data}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <NewsletterForm
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isPending={isPending}
                subscriberData={subscribers.data}
              />

              <DesktopSubscribersList data={subscribers.data} />
            </div>
          </>
        )}
    </div>
  );
}
