import { Plus } from "lucide-react";
import { Separator } from "../../components/separator";

import { TripArticle } from "./tripArticle";

export function Informations({ tripId }: { tripId: string | undefined }) {
  return (
    <aside className="space-y-6">
      <TripArticle
        title="Links importantes"
        btnIcon={<Plus />}
        btnTitle="Cadastrar novo link"
        tripId={tripId}
      />
      <Separator variant="horizontal" />
      <TripArticle title="Convidados" tripId={tripId} />
    </aside>
  );
}
