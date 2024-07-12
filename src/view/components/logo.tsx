import { Waves } from "lucide-react";

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Waves className="size-5 text-gray-400" />
        <h1 className="text-lg font-bold text-gray-400">Mizu</h1>
      </div>

      <p className="text-lg">
        Convide seus amigos e planeje sua próxima viagem!
      </p>
    </div>
  );
}
