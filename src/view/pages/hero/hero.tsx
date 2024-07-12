import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "../../../app/utils/cn";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { InputIcon } from "../../components/inputIcon";
import { Logo } from "../../components/logo";
import { ConfirmationModal } from "../../components/modal/confirmationModal";
import { Modal } from "../../components/modal/modal";
import { ModalParagraph } from "../../components/modal/modalParagraph";
import { Separator } from "../../components/separator";
import { Terms } from "../../components/terms";
import useHeroController from "../../controllers/useHeroController";
import { EmailList } from "./emailList";

export function Hero() {
  const {
    emailsToInvite,
    handleChange,
    handleDeleteFriend,
    handleSubmit,
    handleCloseConfirmationModal,
    handleCloseDayPickerModal,
    handleOpenModal,
    setWhen,
    isSecondInputShown,
    isDayPickerOpen,
    isModalOpen,
    isConfirmationModalOpen,
    hasInvitedFriends,
    formatedSelectedDate,
    handleShowInput,
    handleShowConfirmationModal,
    handleHideInput,
    handleCloseModal,
    setIsDayPickerOpen,
    friend,
    when,
    whereTo,
  } = useHeroController();

  return (
    <main
      className={cn(
        "relative flex min-h-screen items-center justify-center bg-pattern bg-center bg-no-repeat",
      )}
    >
      <div
        className={cn(
          "mt-2.5 w-full max-w-3xl space-y-10 px-6 text-center",
          isModalOpen && "blur-sm",
        )}
      >
        <Logo />

        <div className="space-y-4">
          <Card>
            <InputIcon
              value={whereTo}
              spand
              name="where"
              onChange={handleChange}
              icon={<MapPin className="hidden md:block" size={20} />}
              disabled={isSecondInputShown}
              placeholder="Para onde você vai?"
              className="text-sm md:text-lg"
            />

            <button
              onClick={() => setIsDayPickerOpen(true)}
              className="flex w-fit items-center gap-2"
            >
              <Calendar className="hidden size-5 text-zinc-400 md:block" />
              <span className="text-nowrap text-sm text-zinc-400 md:text-lg">
                {formatedSelectedDate ?? "Quando?"}
              </span>
            </button>

            <Separator variant="vertical" />

            {isSecondInputShown ? (
              <Button
                className="text-sm md:text-base"
                variant="secondary"
                onClick={handleHideInput}
              >
                Alterar local/data
                <Settings2 size={20} />
              </Button>
            ) : (
              <Button
                disabled={!whereTo || !formatedSelectedDate}
                onClick={handleShowInput}
              >
                Continuar
                <ArrowRight size={20} />
              </Button>
            )}
          </Card>

          {isSecondInputShown && (
            <Card>
              <button
                onClick={handleOpenModal}
                className="flex flex-1 items-center gap-2"
              >
                <UserRoundPlus size={20} />
                <span className="m:text-lg text-sm text-zinc-400">
                  {" "}
                  {hasInvitedFriends
                    ? `${hasInvitedFriends} pessoa(s) convidada(s)`
                    : "Quem estará na viagem?"}
                </span>
              </button>

              <Button
                onClick={handleShowConfirmationModal}
                disabled={!hasInvitedFriends}
              >
                Confirmar viagem
                <ArrowRight size={20} />
              </Button>
            </Card>
          )}
        </div>
        <Terms />
      </div>
      {isModalOpen && (
        <Modal title="Selecionar convidados" onClose={handleCloseModal}>
          <ModalParagraph>
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </ModalParagraph>
          <EmailList
            emailsToInvite={emailsToInvite}
            onDeleteFriend={handleDeleteFriend}
          />
          <Separator variant="horizontal" />
          <form
            onSubmit={handleSubmit}
            className="flex h-14 w-full items-center justify-between rounded-lg bg-zinc-950 px-4 py-2.5 shadow-shadow"
          >
            <InputIcon
              value={friend}
              spand
              name="email"
              onChange={handleChange}
              icon={<AtSign className="size-5" />}
              type="email"
              placeholder="Digite o e-mail do convidado"
            />

            <Button>
              <span className="font-medium">Convidar</span>
              <Plus className="size-5" />
            </Button>
          </form>
        </Modal>
      )}
      {isConfirmationModalOpen && (
        <Modal
          title="Confirmar criação da viagem"
          onClose={handleCloseConfirmationModal}
        >
          <ConfirmationModal
            when={when}
            whereTo={whereTo}
            emailsToInvite={emailsToInvite}
            formatedSelectedDate={formatedSelectedDate}
          />
        </Modal>
      )}

      {isDayPickerOpen && (
        <Modal
          onClose={handleCloseDayPickerModal}
          title="Confirmar data da viagem"
        >
          <DayPicker mode="range" selected={when} onSelect={setWhen} />
        </Modal>
      )}
    </main>
  );
}
