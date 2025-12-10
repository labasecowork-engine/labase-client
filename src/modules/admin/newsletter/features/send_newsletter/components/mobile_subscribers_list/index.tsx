import { ChevronDown, Users } from "lucide-react";
import type { SubscriberResponse } from "../../types";
import { SubscribersTable } from "..";

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
  data: SubscriberResponse;
}

export const MobileSubscribersList: React.FC<Props> = ({
  isExpanded,
  onToggle,
  data,
}) => {
  return (
    <div className="lg:hidden mb-6">
      <div className=" bg-stone-50 rounded-lg">
        <div
          onClick={onToggle}
          className="p-4 cursor-pointer hover:bg-stone-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-stone-200 rounded-full flex items-center justify-center">
                <Users className="size-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-sm">
                  Lista de suscriptores
                </h3>
                <p className="text-sm text-stone-600">
                  {data.count || 0} usuarios suscritos
                </p>
              </div>
            </div>
            <ChevronDown
              className={`size-5 text-stone-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-stone-200">
            <div className="overflow-hidden">
              <div className="max-h-[400px] overflow-y-auto">
                <SubscribersTable subscribers={data.subscribers || []} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
