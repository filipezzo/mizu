import { CircleCheck, CircleDashed } from "lucide-react";
import { ReactNode } from "react";

import { useGetParticipants } from "../../../../app/hooks/useGetParticipants";
import { IParticipant } from "../../../../app/models/participants";
import { Button } from "../../../components/button";

interface ParticipantsProps {
  tripId: string | undefined;
  title: string;
  btnTitle?: string;
  btnIcon?: ReactNode;
}

export function Participants({
  tripId,
  title,
  btnIcon,
  btnTitle,
}: ParticipantsProps) {
  const { data } = useGetParticipants(tripId || "");

  return (
    <>
      <article className="flex flex-col gap-6 pb-10 md:pb-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ul className="flex flex-col gap-5">
          {data && data.length > 0 ? (
            data.map((item: IParticipant, index: number) => (
              <li key={item.id} className="flex items-center">
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-medium text-zinc-100">
                    {item.name || `Convidado ${index}`}
                  </h3>
                  <p className="truncate text-xs text-zinc-400">{item.email}</p>
                </div>
                <a href="#" className="shrink-0">
                  {item.is_confirmed ? (
                    <CircleCheck className="size-5 text-blue-400" />
                  ) : (
                    <CircleDashed className="size-5 text-gray-400" />
                  )}
                </a>
              </li>
            ))
          ) : (
            <li>Nenhum convidado</li>
          )}
        </ul>
        {btnTitle && (
          <Button
            variant="secondary"
            className="h-[42px] w-full justify-center"
          >
            {btnIcon}
            <span>{btnTitle}</span>
          </Button>
        )}
      </article>
    </>
  );
}
