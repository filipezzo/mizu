import { ReactNode } from "react";

interface InfoProps {
  icon: ReactNode;
  text: string;
}
export function Info({ icon, text }: InfoProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="ml-auto text-zinc-100">{text}</span>
    </div>
  );
}
