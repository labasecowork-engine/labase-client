import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FormInput, Label, Input } from "@/components/ui";
import type { UpdateProfileFormData } from "../../schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  userEmail?: string;
  register: UseFormRegister<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
}

export const ChangePassword: React.FC<Props> = ({
  userEmail,
  register,
  errors,
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>
          Deja los campos vacíos si no deseas cambiar tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Email */}
          <div>
            <Label className="block mb-2">Correo electrónico</Label>
            <Input
              value={userEmail || ""}
              placeholder="Ej. juanperez@gmail.com"
              type="email"
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nueva contraseña"
              name="password"
              register={register}
              errors={errors}
              placeholder="Ej. gsbXaST15%!"
              type="password"
            />
            <FormInput
              label="Confirmar contraseña"
              name="confirmPassword"
              register={register}
              errors={errors}
              placeholder="Ej. gsbXaST15%!"
              type="password"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
