import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck, CircleDashed } from "lucide-react";
import useUpdateActivity from "../../../../app/hooks/useUpdateActivity";
import {
  IActivityDetail,
  ISingleActivity,
} from "../../../../app/models/activity";
interface ActivityProps {
  act: ISingleActivity;
}

export function Activity({ act }: ActivityProps) {
  const day = format(act.date, "d");
  const week = format(act.date, "cccc", { locale: ptBR });

  const { mutateAsync } = useUpdateActivity();

  const handleUpdateComplete = async (id: string, isCompleted: boolean) => {
    try {
      mutateAsync({ id, isCompleted });
    } catch (error) {
      console.error("Erro ao atualizar o status da atividade:", error);
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-semibold text-zinc-300"> dia {day}</h3>
        <span className="text-xs text-zinc-500">{week}</span>
      </div>

      <ul className="space-y-2.5">
        {act.activities.length > 0 ? (
          act.activities.map((act: IActivityDetail) => (
            <li
              className="flex h-10 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shadow"
              key={act.id}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleUpdateComplete(act.id, !act.is_completed)
                  }
                >
                  {act.is_completed ? (
                    <CircleCheck className="size-5 text-blue-400" />
                  ) : (
                    <CircleDashed className="size-5 text-zinc-400" />
                  )}
                </button>
                <p className="font-medium text-zinc-100">{act.title}</p>
              </div>

              <span className="text-zinc-400">
                {format(act.occurs_at, "HH:mm", { locale: ptBR })}h
              </span>
            </li>
          ))
        ) : (
          <p className="text-sm text-zinc-500">
            Nenhuma atividade cadastrada nessa data.
          </p>
        )}
      </ul>
    </section>
  );
}
