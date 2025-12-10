import { Link } from "react-router-dom";
interface Props {
  to: string;
  title: string;
  description: string;
  icon: React.ElementType;
}
export const CardNavigation: React.FC<Props> = ({
  to,
  title,
  description,
  icon: Icon,
}) => (
  <Link
    to={to}
    className="rounded-lg w-full bg-yellow-700/10 p-6 flex items-start text-sm text-yellow-900 gap-2 hover:bg-yellow-700/20 transition-all duration-300 cursor-pointer"
  >
    <div className="p-2 bg-yellow-500/10 rounded-lg">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex flex-col gap-1 ">
      <p className="text-sm font-semibold text-left w-full">{title}</p>
      <p className="text-xs text-yellow-800 text-left w-full">{description}</p>
    </div>
  </Link>
);
