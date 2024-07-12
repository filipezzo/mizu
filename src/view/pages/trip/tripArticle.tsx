import { ReactNode } from "react";
import { Links } from "./links/links";
import { Participants } from "./participants/participants";

interface TripArticleProps {
  title: string;
  btnTitle?: string;
  btnIcon?: ReactNode;
  tripId: string | undefined;
}

export function TripArticle({
  title,
  btnTitle,
  btnIcon,
  tripId,
}: TripArticleProps) {
  const linksTitle = title.startsWith("Links");

  if (linksTitle) {
    return (
      <Links
        title={title}
        btnIcon={btnIcon}
        btnTitle={btnTitle}
        tripId={tripId}
      />
    );
  }

  return (
    <Participants
      title={title}
      btnIcon={btnIcon}
      btnTitle={btnTitle}
      tripId={tripId}
    />
  );
}
