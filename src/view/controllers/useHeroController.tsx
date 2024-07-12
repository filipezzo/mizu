import { format } from "date-fns";
import { ChangeEvent, FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";

export default function useHeroController() {
  const [friend, setFriend] = useState("");
  const [whereTo, setWhereTo] = useState("");
  const [when, setWhen] = useState<DateRange | undefined>();
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [isSecondInputShown, setIsSeconInputShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const hasInvitedFriends = emailsToInvite?.length;
  const formatedSelectedDate =
    when && when.from && when.to
      ? format(when.from, "d ' de' LLL")
          .concat(" até ")
          .concat(format(when.to, "d ' de' LLL"))
      : null;

  const handleShowInput = () => {
    if (whereTo.length <= 3) {
      return toast.error("Seu destino deve conter no minimo 4 caracteres.");
    }
    setIsSeconInputShown(true);
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleShowConfirmationModal = () => setIsConfirmationModalOpen(true);

  const handleHideInput = () => setIsSeconInputShown(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);
  const handleCloseDayPickerModal = () => setIsDayPickerOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFriend(value);
    } else if (name === "where") {
      setWhereTo(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!friend.trim()) {
      return;
    }
    if (emailsToInvite.map((item) => item).includes(friend)) {
      return;
    }

    if (friend) {
      setEmailsToInvite((state) => [...state, friend]);
      setFriend("");
    }
  };

  const handleDeleteFriend = (em: string) => {
    const filteredFriend = emailsToInvite.filter((email) => email !== em);
    setEmailsToInvite(filteredFriend);
  };

  {
    return {
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
      whereTo,
      friend,
      setIsDayPickerOpen,
      setWhereTo,
      when,
    };
  }
}
