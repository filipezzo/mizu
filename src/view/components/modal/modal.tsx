import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "../../../app/utils/cn";

interface ModalProps {
  children: ReactNode;
  onClose(): void;
  title: string;
  size?: boolean;
}

export function Modal({ title, size = false, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onClose]);
  return (
    <div className="fixed inset-0 z-10 mx-4 flex items-center justify-center bg-black/60 lg:mx-0">
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[640px] flex-col gap-5 rounded-xl bg-zinc-900 px-6 py-5",
          size && "max-w-full",
        )}
      >
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
