import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { Mail, User } from "lucide-react";
import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateTrip } from "../../../app/hooks/useCreateTrip";
import { Button } from "../button";
import { InputForm } from "../inputForm";
import { ModalForm } from "./modalForm";
import { ModalParagraph } from "./modalParagraph";

interface ConfirmationModalProps {
  whereTo: string;
  when: DateRange | undefined;
  emailsToInvite: string[];
  formatedSelectedDate: string | null;
}

const schema = z.object({
  name: z.string().min(3, "Seu nome deve conter minimo 3 caracteres."),
  email: z.string().email(),
});

type TypeSchema = z.infer<typeof schema>;

export function ConfirmationModal({
  whereTo,
  when,
  emailsToInvite,
  formatedSelectedDate,
}: ConfirmationModalProps) {
  const { mutateAsync, isPending, data: tripId } = useCreateTrip();

  const nav = useNavigate();
  const { register, handleSubmit: handleCreateEventOwner } =
    useForm<TypeSchema>({
      resolver: zodResolver(schema),
    });

  const handleSubmit = handleCreateEventOwner(async (data: TypeSchema) => {
    const realData = {
      emails_to_invite: emailsToInvite,
      destination: whereTo,
      starts_at: when?.from ? format(when.from, "yyyy-MM-dd") : "",
      ends_at: when?.to ? format(when.to, "yyyy-MM-dd") : "",
      owner_name: data.name,
      owner_email: data.email,
    };

    try {
      await mutateAsync(realData);
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Erro ao cadastrar Viagem");
    }
  });

  useEffect(() => {
    if (tripId) {
      nav(`/trip/${tripId}`);
    }
  }, [tripId, nav]);

  return (
    <>
      <ModalParagraph>
        Para concluir a criação da viagem para{" "}
        <strong className="font-bold text-zinc-100">{whereTo} </strong>
        nas datas de{" "}
        <strong className="font-bold text-zinc-100">
          {formatedSelectedDate}
        </strong>{" "}
        preencha seus dados abaixo:
      </ModalParagraph>
      <ModalForm onSubmit={handleSubmit}>
        <InputForm
          required
          {...register("name")}
          icon={<User className="size-5 text-zinc-400" />}
          placeholder="Seu nome completo"
        />
        <InputForm
          {...register("email")}
          type="email"
          required
          icon={<Mail className="size-5 text-zinc-400" />}
          placeholder="Seu email pessoal"
        />
        <Button disabled={isPending} type="submit" variant="tertiary">
          {isPending ? "loading..." : "Confirmar criação da viagem"}
        </Button>
      </ModalForm>
    </>
  );
}
