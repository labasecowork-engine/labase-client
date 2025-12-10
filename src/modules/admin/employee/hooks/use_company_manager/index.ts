import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCompany, getCompanies } from "../../services";
import { useState } from "react";
import { toast } from "sonner";

export const useCompanyManager = () => {
  const {
    data: companies,
    isPending: isPendingCompanies,
    isError: isErrorCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  const queryClient = useQueryClient();
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [isOpenUpdateCompany, setIsOpenUpdateCompany] = useState(false);
  const [isDeleteCompany, setIsDeleteCompany] = useState(false);

  const onSuccess = () => {
    toast.success("Empresa eliminada correctamente", {
      description:
        "La empresa se ha eliminado correctamente, puedes verlo en la lista de empresas.",
    });
    setIsDeleteCompany(false);
    queryClient.invalidateQueries({ queryKey: ["companies"] });
  };

  const onError = () => {
    toast.error("Error al eliminar la empresa", {
      description:
        "Sucedio un error al eliminar la empresa, si el error persiste, por favor contacta al administrador.",
    });
  };

  const {
    mutateAsync: deleteCompanyMutation,
    isPending: isPendingDeleteCompany,
  } = useMutation({
    mutationFn: deleteCompany,
    onSuccess: onSuccess,
    onError: onError,
  });

  const onDeleteCompany = async (id: string) => {
    toast.promise(deleteCompanyMutation(id), {
      loading: "Eliminando empresa...",
    });
  };

  return {
    // companies
    companies,
    isPendingCompanies,
    isErrorCompanies,

    // dialogs
    isOpenCompany,
    setIsOpenCompany,
    isOpenUpdateCompany,
    setIsOpenUpdateCompany,
    isDeleteCompany,
    setIsDeleteCompany,

    // mutations
    onDeleteCompany,
    isPendingDeleteCompany,
  };
};
