import { CircleCheck, CircleDashed } from "lucide-react";
import { ActivityData } from "./activity";

interface ItemProps {
  item: ActivityData;
}

export function ActivityItem({ item }: ItemProps) {
  return (
    <li className="flex h-10 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shadow">
      {item.isCompleted ? (
        <CircleCheck className="size-5 text-lime-300" />
      ) : (
        <CircleDashed className="size-5 text-zinc-400" />
      )}
      <span className="text-zinc-100">{item.activity}</span>
      <span className="ml-auto">{item.hour}</span>
    </li>
  );
}
