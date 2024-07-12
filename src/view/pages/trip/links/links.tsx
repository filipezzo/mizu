import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link2, Tag } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreateLink } from "../../../../app/hooks/useCreateLink";
import { useGetLinks } from "../../../../app/hooks/useGetLinks";
import { Button } from "../../../components/button";
import { InputForm } from "../../../components/inputForm";
import { Loader } from "../../../components/loader";
import { Modal } from "../../../components/modal/modal";
import { ModalForm } from "../../../components/modal/modalForm";
import { ModalParagraph } from "../../../components/modal/modalParagraph";

interface LinksProps {
  tripId: string | undefined;
  title: string;
  btnTitle: string | undefined;
  btnIcon: ReactNode | undefined;
}

const schema = z.object({
  title: z.string(),
  url: z.string(),
});

type Tschema = z.infer<typeof schema>;

export function Links({ tripId, title, btnTitle, btnIcon }: LinksProps) {
  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: links, isLoading, isError } = useGetLinks(tripId || "");
  const { mutateAsync, isPending } = useCreateLink(tripId || "");

  const {
    register,
    handleSubmit: onCreatingLink,
    formState: { isDirty },
    reset,
  } = useForm<Tschema>({
    resolver: zodResolver(schema),
  });

  const handleCloseLinkModal = () => setIsNewLinkModalOpen(false);
  const handleSubmit = onCreatingLink(async (data) => {
    if (links?.some((item) => item.title === data.title)) {
      return toast.error("Já existe um link com esse nome!");
    }
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries({
        queryKey: ["links", tripId],
      });
      reset();
      handleCloseLinkModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data.message === "Invalid input") {
          return toast.error("Título ou Link inválido");
        }
      }

      console.log(error);
    }
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError) {
    return <p>algo deu errado!</p>;
  }
  return (
    <>
      <article className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ul className="flex flex-col gap-5">
          {links && links.length > 0 ? (
            links.map((item) => (
              <li key={item.id} className="flex items-center">
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-medium text-zinc-100">{item.title}</h3>
                  <a
                    href={item.url}
                    target="_blank"
                    className="truncate text-xs text-zinc-400"
                  >
                    {item.url}
                  </a>
                </div>
                <a href={item.url} target="_blank" className="shrink-0">
                  <Link2 className="size-5 text-zinc-400" />
                </a>
              </li>
            ))
          ) : (
            <li>Sem links</li>
          )}
        </ul>
        <Button
          onClick={() => setIsNewLinkModalOpen(true)}
          variant="secondary"
          className="h-[42px] w-full justify-center"
        >
          {btnIcon}
          <span>{btnTitle}</span>
        </Button>
      </article>
      {isNewLinkModalOpen && (
        <Modal onClose={handleCloseLinkModal} title="Cadastrar link">
          <ModalParagraph>
            Todos convidados podem visualizar os links importantes.
          </ModalParagraph>
          <ModalForm onSubmit={handleSubmit}>
            <InputForm
              placeholder="Título do link"
              icon={<Tag className="size-5 text-zinc-400" />}
              {...register("title")}
              required
            />

            <InputForm
              placeholder="URL"
              icon={<Link2 className="size-5 text-zinc-400" />}
              {...register("url")}
              required
            />
            <Button
              type="submit"
              disabled={!isDirty || isPending}
              variant="tertiary"
            >
              {isPending ? <Loader /> : "Salvar link"}
            </Button>
          </ModalForm>
        </Modal>
      )}
    </>
  );
}
