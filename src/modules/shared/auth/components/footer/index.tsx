import { Link } from "react-router-dom";

interface Props {
  link: string;
  text: string;
  description: string;
}

export const Footer: React.FC<Props> = ({ link, text, description }) => (
  <div className="text-center mt-6 text-sm text-stone-600">
    {description}{" "}
    <Link to={link} className="text-stone-900 font-semibold hover:underline">
      {text}
    </Link>
  </div>
);
