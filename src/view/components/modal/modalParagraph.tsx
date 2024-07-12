import { ReactNode } from "react";

interface ModalParagraphProps {
  children: ReactNode;
}

export function ModalParagraph({ children }: ModalParagraphProps) {
  return <p className="-mt-[12px] text-sm text-gray-400">{children}</p>;
}
