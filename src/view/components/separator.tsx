import { cn } from "../../app/utils/cn";

interface SeparatorProps {
  variant: "horizontal" | "vertical";
}

export function Separator({ variant = "vertical" }: SeparatorProps) {
  return (
    <div
      className={cn(
        "h-6 w-[1px] bg-zinc-800",
        variant === "horizontal" && "h-[1px] w-full",
      )}
    />
  );
}
