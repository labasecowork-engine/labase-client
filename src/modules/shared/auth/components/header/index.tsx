interface Props {
  title: string;
  description: string;
}
export const Header: React.FC<Props> = ({ title, description }) => (
  <div className="mb-8">
    <img src="/favicon.svg" alt="logo" className="size-14 rounded-lg" />
    <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2 mt-6">
      {title}
    </h1>
    <p className="text-stone-600 text-sm">{description}</p>
  </div>
);
