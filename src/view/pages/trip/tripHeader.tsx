import { format } from "date-fns";
import { Calendar, MapPin, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ITripDetails } from "../../../app/models/trip";
import { Button } from "../../components/button";
import { Info } from "../../components/info";
import { Separator } from "../../components/separator";

interface TripHeaderProps {
  data: ITripDetails;
}

export function TripHeader({ data }: TripHeaderProps) {
  const formatedDate = format(data.starts_at, "d 'a '").concat(
    format(data.ends_at, "d 'de ' MMM"),
  );

  return (
    <header className="flex h-16 w-full items-center justify-between gap-1 text-nowrap rounded-xl bg-zinc-900 px-6 shadow-shadow">
      <Info
        icon={<MapPin className="hidden size-5 text-zinc-400 md:block" />}
        text={data.destination}
      />

      <div className="flex items-center gap-5">
        <Info
          icon={<Calendar className="size-5 text-zinc-400" />}
          text={formatedDate}
        />
        <Separator variant="vertical" />
        <Link to="/">
          <Button className="text-nowrap text-sm" variant="secondary">
            Novo Evento
            <PlusCircle className="size-4 lg:size-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
