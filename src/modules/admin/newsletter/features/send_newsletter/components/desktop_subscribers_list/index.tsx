import { SubscribersTable } from "..";
import type { SubscriberResponse } from "../../types";

interface Props {
  data: SubscriberResponse;
}

export const DesktopSubscribersList: React.FC<Props> = ({ data }) => {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="h-[675px] w-full">
        <SubscribersTable subscribers={data.subscribers || []} />
      </div>
    </div>
  );
};
