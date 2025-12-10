import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type {
  USER_GENDER_FEMALE,
  USER_GENDER_MALE,
  USER_GENDER_UNSPECIFIED,
  UserResponse,
} from "@/types/user";
import { updateProfileSchema, type UpdateProfileFormData } from "../../schema";

export function useProfileForm(user?: UserResponse) {
  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: "",
      gender: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const { reset, watch } = form;

  useEffect(() => {
    if (user) {
      let formattedBirthDate = "";
      if (user.birth_date) {
        try {
          const dateString = user.birth_date;
          if (dateString.includes("T")) {
            formattedBirthDate = dateString.split("T")[0];
          } else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            formattedBirthDate = dateString;
          } else {
            const date = new Date(dateString + "T12:00:00");
            formattedBirthDate = format(date, "yyyy-MM-dd");
          }
        } catch {
          formattedBirthDate = "";
        }
      }

      reset({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        phone: user.phone || "",
        birthDate: formattedBirthDate,
        gender: user.gender as
          | typeof USER_GENDER_MALE
          | typeof USER_GENDER_FEMALE
          | typeof USER_GENDER_UNSPECIFIED
          | undefined,
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const birthDateValue = watch("birthDate");
  const selectedDate = birthDateValue
    ? new Date(birthDateValue + "T12:00:00")
    : undefined;

  return {
    ...form,
    selectedDate,
  };
}
