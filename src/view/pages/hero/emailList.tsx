import { EmailItem } from "./emailItem";

interface EmailListProps {
  emailsToInvite: string[];
  onDeleteFriend(id: string): void;
}

export function EmailList({ emailsToInvite, onDeleteFriend }: EmailListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {emailsToInvite.length > 0 ? (
        emailsToInvite.map((email) => (
          <EmailItem
            key={email}
            email={email}
            onDeleteFriend={onDeleteFriend}
          />
        ))
      ) : (
        <small className="text-zinc-400">Sem convidados</small>
      )}
    </ul>
  );
}
