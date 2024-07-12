import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export function Button({
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex h-9 items-center gap-2 rounded-lg bg-blue-300 px-5 font-semibold text-blue-950 transition-colors hover:bg-blue-400 disabled:opacity-40",
        variant === "secondary" &&
          "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
        variant === "tertiary" && "h-[42px] justify-center",
        className,
      )}
      {...rest}
    />
  );
}
