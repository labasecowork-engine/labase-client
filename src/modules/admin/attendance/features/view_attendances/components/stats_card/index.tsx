interface Props {
  title: string;
  value: string | number;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

export const StatsCard: React.FC<Props> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  textColor,
}) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <div className="flex items-center gap-3">
      <div className={`p-4 ${bgColor} rounded-lg`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <p className={`text-sm ${textColor} font-medium`}>{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  </div>
);
