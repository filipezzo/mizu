import { ComponentProps, forwardRef, ReactNode } from "react";
import { cn } from "../../app/utils/cn";

interface InputFormProps extends ComponentProps<"input"> {
  icon: ReactNode;
  className?: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ icon, className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "flex h-14 w-full items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4",
          className,
        )}
      >
        {icon}
        <input
          ref={ref}
          className={cn(
            "flex-1 bg-transparent placeholder-zinc-400 outline-none",
          )}
          {...rest}
        />
      </div>
    );
  },
);
