import { getProfile } from "@/services";
import { useQuery } from "@tanstack/react-query";

import {
  ChangePassword,
  ErrorState,
  Header,
  LoadingState,
  PersonalInformation,
} from "../components";
import { useProfileForm, useUpdateProfile } from "../hooks";

const genderOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
  { value: "unspecified", label: "No especificado" },
];

export default function UpdateProfile() {
  const {
    data: user,
    isPending: userLoading,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    selectedDate,
    setValue,
  } = useProfileForm(user);

  const { onSubmit, isPending } = useUpdateProfile(setValue);

  if (userLoading) return <LoadingState />;
  if (isErrorUser) return <ErrorState />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto px-4 py-10"
    >
      <Header isPending={isPending} isDirty={isDirty} />

      <PersonalInformation
        register={register}
        control={control}
        errors={errors}
        genderOptions={genderOptions}
        selectedDate={selectedDate}
      />

      <ChangePassword
        register={register}
        errors={errors}
        userEmail={user?.email}
      />
    </form>
  );
}
