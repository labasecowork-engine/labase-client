import { ContractCard } from "../contract_card";
import type { Contract } from "../../types";

interface Props {
  contracts: Contract[];
  onPay: (contract: Contract) => void;
  onRenew: (id: string) => void;
  onDelete: (contract: Contract) => void;
}

export const ContractsGrid = ({
  contracts,
  onPay,
  onRenew,
  onDelete,
}: Props) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {contracts.map((contract) => (
      <ContractCard
        key={contract.id}
        contract={contract}
        onPay={onPay}
        onRenew={onRenew}
        onDelete={onDelete}
      />
    ))}
  </div>
);
