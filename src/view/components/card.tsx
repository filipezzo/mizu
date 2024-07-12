import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export function Card({ children }: WrapperProps) {
  return (
    <div className="flex h-16 w-full items-center gap-5 rounded-xl bg-zinc-900 px-4 shadow-shadow">
      {children}
    </div>
  );
}
