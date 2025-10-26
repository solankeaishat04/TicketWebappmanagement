import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { cn } from "../../lib/utils";

interface StatChange {
  type: "up" | "down";
  value: string | number;
  label?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: StatChange;
  note?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  note,
  className,
}) => {
  return (
    <section
      className={cn(
        "rounded-2xl border p-4 shadow-sm bg-white h-full flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{title}</span>
          {icon}
        </div>

        <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>

        {change && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-sm",
              change.type === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {change.type === "up" ? <FaArrowUp size={16} /> : <FaArrowDown size={16} />}
            <span>{change.value}</span>
            {change.label && <span>{change.label}</span>}
          </div>
        )}

        {note && <div className="mt-2 text-sm text-gray-500">{note}</div>}
      </div>
    </section>
  );
};
