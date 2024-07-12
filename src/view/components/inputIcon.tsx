import { ComponentProps, forwardRef, ReactNode } from "react";
import { cn } from "../../app/utils/cn";

interface InputIconProps extends ComponentProps<"input"> {
  icon: ReactNode;
  spand?: boolean;
  className?: string;
}

export const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
  ({ spand = false, icon, className, ...rest }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", spand && "flex-1")}>
        {icon}
        <input
          {...rest}
          ref={ref}
          className={cn(
            "w-full bg-transparent text-lg placeholder-zinc-400 outline-none placeholder:text-nowrap placeholder:text-sm placeholder:xl:text-base",
            className,
          )}
        />
      </div>
    );
  },
);
