const getColor = (value: number) => {
  if (value < 40) return "bg-red-500";
  if (value < 75) return "bg-yellow-500";
  return "bg-green-500";
};

export default function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div
        className={`${getColor(
          value
        )} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
