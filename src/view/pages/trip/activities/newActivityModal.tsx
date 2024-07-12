import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateActivity } from "../../../../app/hooks/useCreateActivity";
import { ICreateTripActivity, ITripDetails } from "../../../../app/models/trip";
import { Button } from "../../../components/button";
import { InputForm } from "../../../components/inputForm";
import { Modal } from "../../../components/modal/modal";
import { ModalForm } from "../../../components/modal/modalForm";

interface NewActivityModalProps {
  handleCloseModal(): void;
  data: ITripDetails;
}

const schema = z.object({
  title: z.string().min(4, "O titulo deve conter ao menos 4 caracteres"),
  occurs_at: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export function NewActivityModal({
  handleCloseModal,
  data,
}: NewActivityModalProps) {
  const { mutateAsync, isPending } = useCreateActivity(data.id);

  const { register, handleSubmit: onCreatingActivity } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = onCreatingActivity(async (formData) => {
    const newData: ICreateTripActivity = {
      occurs_at: formData.occurs_at.toString(),
      title: formData.title,
    };

    try {
      await mutateAsync(newData);
      toast.success("Atividade criada com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      toast.error("Erro ao criar atividade. Tente novamente mais tarde.");
    }
  });

  return (
    <Modal onClose={handleCloseModal} title="Cadastrar Atividade">
      <ModalForm onSubmit={handleSubmit}>
        <InputForm
          placeholder="Qual a atividade?"
          icon={<Tag className="size-5 text-zinc-400" />}
          {...register("title")}
          required
        />
        <div className="flex gap-2">
          <InputForm
            placeholder="Horário"
            icon={<Clock className="size-5 text-zinc-400" />}
            className=""
            type="datetime-local"
            {...register("occurs_at")}
            required
          />
        </div>
        <Button variant="tertiary" disabled={isPending} type="submit">
          {isPending ? "Salvando..." : "Salvar atividade"}
        </Button>
      </ModalForm>
    </Modal>
  );
}
