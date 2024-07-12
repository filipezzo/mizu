import { useParams } from "react-router-dom";
import { useTripDetails } from "../../../app/hooks/useTripDetails";
import { Activities } from "./activities/activities";
import { Informations } from "./informations";
import { TripHeader } from "./tripHeader";

export function Trip() {
  const { tripId } = useParams();
  const { data, isPending, error } = useTripDetails(tripId || "");

  if (isPending) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>Erro ao puxar a viagem </p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pt-10">
      <TripHeader data={data} />
      <main className="flex flex-col gap-10 px-6 lg:grid lg:grid-cols-[1fr_320px] lg:gap-16">
        <Activities data={data} />
        <Informations tripId={tripId} />
      </main>
    </div>
  );
}
