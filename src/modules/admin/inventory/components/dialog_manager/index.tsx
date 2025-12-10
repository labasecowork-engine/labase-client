import { DeleteDialog } from "@/components/ui";
import { CreateBrandDialog, UpdateBrandDialog } from "../../components";
import type { UseFormWatch } from "node_modules/react-hook-form/dist/types/form";
import type { CreateProductFormData } from "../../features/create_product/types";
import type { EditProductFormData } from "../../features/edit_product/types";
import type { Brand } from "@/types";

interface DialogManagerProps {
  isOpenCreateBrandDialog: boolean;
  setIsOpenCreateBrandDialog: (isOpen: boolean) => void;
  isOpenUpdateBrandDialog: boolean;
  setIsOpenUpdateBrandDialog: (isOpen: boolean) => void;
  isOpenDeleteBrandDialog: boolean;
  setIsOpenDeleteBrandDialog: (isOpen: boolean) => void;
  watch: UseFormWatch<CreateProductFormData | EditProductFormData>;
  onDeleteBrand: () => void;
  isPendingDeleteBrand: boolean;
  brands: Brand[];
}
export const DialogManager = ({
  isOpenCreateBrandDialog,
  setIsOpenCreateBrandDialog,
  isOpenUpdateBrandDialog,
  setIsOpenUpdateBrandDialog,
  isOpenDeleteBrandDialog,
  setIsOpenDeleteBrandDialog,
  watch,
  onDeleteBrand,
  isPendingDeleteBrand,
  brands,
}: DialogManagerProps) => {
  return (
    <>
      <CreateBrandDialog
        isOpen={isOpenCreateBrandDialog}
        onClose={() => setIsOpenCreateBrandDialog(false)}
      />
      <UpdateBrandDialog
        isOpen={isOpenUpdateBrandDialog}
        onClose={() => setIsOpenUpdateBrandDialog(false)}
        brand={{
          id: watch("brand") || "",
          name:
            brands?.find((brand: Brand) => brand.id === watch("brand"))?.name ||
            "",
        }}
      />
      <DeleteDialog
        isOpen={isOpenDeleteBrandDialog}
        onClose={() => setIsOpenDeleteBrandDialog(false)}
        onDelete={onDeleteBrand}
        valueToDelete={
          brands?.find((brand: Brand) => brand.id === watch("brand"))?.name ||
          ""
        }
        isPending={isPendingDeleteBrand}
      />
    </>
  );
};
