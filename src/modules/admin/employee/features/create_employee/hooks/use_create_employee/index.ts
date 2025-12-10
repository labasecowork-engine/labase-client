import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services";
import type { CreateEmployeeForm } from "../../types";
import { toast } from "sonner";
import { ROUTES } from "@/routes/routes";

export const useCreateEmployee = () => {
  const navigate = useNavigate();
  const { mutate: createEmployeeMutation, isPending } = useMutation({
    mutationFn: createEmployee,
  });

  const onSubmit = async (data: CreateEmployeeForm) => {
    const employeeData = {
      ...data,
      profile_image:
        "https://portfolio-harvey.netlify.app/images/photo-harvey.png",
      user_type: "employee",
    };

    createEmployeeMutation(employeeData, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  const onSuccess = () => {
    toast.success("Empleado creado correctamente", {
      description:
        "El empleado se ha creado correctamente, puedes verlo en la lista de empleados.",
    });
    navigate(ROUTES.Admin.ViewEmployees);
  };

  const onError = (error: Error) => {
    toast.error("Error al crear empleado", {
      description: error.message,
    });
  };
  return {
    onSubmit,
    isPending,
  };
};
