import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  text: string;
}

export const Back: React.FC<Props> = ({ link, text }) => (
  <div className="text-center mt-6 text-sm text-stone-600">
    <Link
      to={link}
      className="text-stone-900 font-semibold hover:underline flex items-center gap-2 justify-center"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      {text}
    </Link>
  </div>
);
