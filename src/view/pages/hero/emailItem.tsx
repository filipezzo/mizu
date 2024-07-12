import { X } from "lucide-react";

interface EmailItemProps {
  email: string;
  onDeleteFriend(id: string): void;
}

export function EmailItem({ email, onDeleteFriend }: EmailItemProps) {
  return (
    <li className="flex w-fit items-center gap-2.5 rounded-md bg-zinc-800 px-2.5 py-1.5">
      <span className="text-zinc-300">{email}</span>
      <button onClick={() => onDeleteFriend(email)} className="text-zinc-400">
        <X />
      </button>
    </li>
  );
}
