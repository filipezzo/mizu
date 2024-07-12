import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useGetActivity } from "../../../../app/hooks/useGetActivity";
import { ITripDetails } from "../../../../app/models/trip";
import { Button } from "../../../components/button";
import { Activity } from "./activity";
import { NewActivityModal } from "./newActivityModal";

interface ActivitiesProps {
  data: ITripDetails;
}

export function Activities({ data }: ActivitiesProps) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleCloseModal = () => {
    setIsActivityModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["activities"] });
  };
  const { data: activity, isLoading, isError } = useGetActivity(data.id);

  if (isLoading) {
    return <p>carregando...</p>;
  }

  if (isError) {
    return <p>algo deu errado..</p>;
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-zinc-50">Atividades</h2>
        <Button
          onClick={() => setIsActivityModalOpen(true)}
          className="h-[42px]"
        >
          <Plus />
          <span>Cadastrar atividade</span>
        </Button>
      </header>
      <section className="flex flex-col gap-8">
        {activity?.map((act, index) => <Activity key={index} act={act} />)}
      </section>

      {isActivityModalOpen && (
        <NewActivityModal data={data} handleCloseModal={handleCloseModal} />
      )}
    </section>
  );
}
