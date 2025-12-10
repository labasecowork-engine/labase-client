import type { UseFormWatch } from "react-hook-form";
import { CreateAreaDialog } from "../create_area_dialog";
import { CreateCompanyDialog } from "../create_company_dialog";
import { DeleteDialog } from "../../../../../components/ui/delete_dialog";
import { UpdateAreaDialog } from "../update_area_dialog";
import { UpdateCompanyDialog } from "../update_company_dialog";
import type { CreateEmployeeForm } from "../../features/create_employee/types";
import type { EditEmployeeForm } from "../../features/edit_employee/types";
import type { Company, WorkArea } from "@/types";

interface Props {
  isOpenCompany: boolean;
  setIsOpenCompany: (isOpen: boolean) => void;
  isOpenWorkArea: boolean;
  setIsOpenWorkArea: (isOpen: boolean) => void;
  isOpenUpdateWorkArea: boolean;
  setIsOpenUpdateWorkArea: (isOpen: boolean) => void;
  isOpenUpdateCompany: boolean;
  setIsOpenUpdateCompany: (isOpen: boolean) => void;
  isDeleteCompany: boolean;
  setIsDeleteCompany: (isOpen: boolean) => void;
  isDeleteWorkArea: boolean;
  setIsDeleteWorkArea: (isOpen: boolean) => void;
  isPendingDeleteCompany: boolean;
  isPendingDeleteWorkArea: boolean;
  onDeleteCompany: (id: string) => void;
  onDeleteWorkArea: (id: string) => void;
  watch: UseFormWatch<CreateEmployeeForm | EditEmployeeForm>;
  areas: WorkArea[];
  companies: Company[];
}

export const DialogManager: React.FC<Props> = ({
  // company
  isOpenCompany,
  setIsOpenCompany,
  isDeleteCompany,
  setIsDeleteCompany,
  onDeleteCompany,
  isPendingDeleteCompany,
  companies,
  isOpenUpdateCompany,
  setIsOpenUpdateCompany,

  // workarea
  isPendingDeleteWorkArea,
  isOpenWorkArea,
  setIsOpenWorkArea,
  isOpenUpdateWorkArea,
  setIsOpenUpdateWorkArea,
  isDeleteWorkArea,
  setIsDeleteWorkArea,
  onDeleteWorkArea,
  areas,

  // watch
  watch,
}) => {
  return (
    <>
      <CreateCompanyDialog
        isOpen={isOpenCompany}
        onClose={() => setIsOpenCompany(false)}
      />
      <CreateAreaDialog
        isOpen={isOpenWorkArea}
        onClose={() => setIsOpenWorkArea(false)}
      />
      <UpdateAreaDialog
        isOpen={Boolean(watch("work_area_id")) && isOpenUpdateWorkArea}
        onClose={() => setIsOpenUpdateWorkArea(false)}
        workArea={{
          id: watch("work_area_id") || "",
          name:
            areas?.find((area) => area.id === watch("work_area_id"))?.name ||
            "",
          description:
            areas?.find((area) => area.id === watch("work_area_id"))
              ?.description || "",
          capacity:
            areas?.find((area) => area.id === watch("work_area_id"))
              ?.capacity || 0,
        }}
      />
      <UpdateCompanyDialog
        isOpen={isOpenUpdateCompany}
        onClose={() => setIsOpenUpdateCompany(false)}
        company={{
          id: watch("company_id") || "",
          name:
            companies?.find((company) => company.id === watch("company_id"))
              ?.name || "",
          description:
            companies?.find((company) => company.id === watch("company_id"))
              ?.description || "",
        }}
      />
      <DeleteDialog
        isOpen={isDeleteCompany}
        onClose={
          isPendingDeleteCompany ? () => {} : () => setIsDeleteCompany(false)
        }
        valueToDelete={
          companies?.find((company) => company.id === watch("company_id"))
            ?.name || ""
        }
        onDelete={() => onDeleteCompany(watch("company_id") || "")}
        isPending={isPendingDeleteCompany}
      />
      <DeleteDialog
        isOpen={isDeleteWorkArea}
        onClose={
          isPendingDeleteWorkArea ? () => {} : () => setIsDeleteWorkArea(false)
        }
        valueToDelete={
          areas?.find((area) => area.id === watch("work_area_id"))?.name || ""
        }
        onDelete={() => onDeleteWorkArea(watch("work_area_id") || "")}
        isPending={isPendingDeleteWorkArea}
      />
    </>
  );
};
