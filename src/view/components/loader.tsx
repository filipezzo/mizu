import { cn } from "../../app/utils/cn";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        "size-6 animate-spin rounded-full border-r border-t border-r-black border-t-black",
        className,
      )}
    />
  );
}
