import { CircleDotDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
  return (
    <article className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <ul className="flex flex-col gap-5">
        <li className="flex items-center">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-medium text-zinc-100">Jessica White</h3>
            <p className="truncate text-xs text-zinc-400">
              jessica.white44@yahoo.com
            </p>
          </div>
          <a href="#" className="shrink-0">
            <CircleDotDashed className="size-5 text-zinc-400" />
          </a>
        </li>

        <li className="flex items-center">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-medium text-zinc-100">Jessica White</h3>
            <p className="truncate text-xs text-zinc-400">
              jessica.white44@yahoo.com
            </p>
          </div>
          <a href="#" className="shrink-0">
            <CircleDotDashed className="size-5 text-zinc-400" />
          </a>
        </li>
      </ul>
      <Button variant="secondary" className="h-[42px] w-full justify-center">
        <UserCog />
        <span>Gerenciar convidados</span>
      </Button>
    </article>
  );
}
