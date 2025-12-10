import {
  AsyncSelect,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { getUsers } from "@/services";
import { useState } from "react";
import type { ReservationFormData } from "../../types";
import { CreateUserDialog } from "..";

interface Props {
  watchedValues: ReservationFormData;
  setValue: (name: string, value: string) => void;
}
export const SelectUser = ({ watchedValues, setValue }: Props) => {
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(undefined, undefined, undefined, "client"),
  });
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);

  return (
    <>
      <CreateUserDialog
        isOpen={isOpenCreateUser}
        onClose={() => setIsOpenCreateUser(false)}
      />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Selecciona el usuario</CardTitle>
          <CardDescription>
            Si no encuentras el usuario, puedes crear uno nuevo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex items-center gap-2">
            <AsyncSelect
              className="w-full"
              value={watchedValues.user_id || undefined}
              onChange={(value) => setValue("user_id", value || "")}
              placeholder="Selecciona un usuario"
              options={
                usersData?.users.map((user) => ({
                  id: user.id,
                  name: user.first_name + " " + user.last_name,
                })) || []
              }
              showAllOption={false}
              isLoading={isLoadingUsers}
              isError={isErrorUsers}
            />
            <Button
              type="button"
              className="bg-white shadow-xs px-3.5 h-[40px] hover:bg-stone-100 border-stone-200 border rounded-lg"
              onClick={() => setIsOpenCreateUser(true)}
            >
              <PlusIcon className="size-4 text-stone-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
