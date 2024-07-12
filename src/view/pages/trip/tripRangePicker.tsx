import { Dispatch, SetStateAction } from "react";
import { DateInterval, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface TripRangePickerProps {
  start: string;
  end: string;
  selectedActivityDate: Date | undefined;
  onSelectedActivityDate: Dispatch<SetStateAction<Date | undefined>>;
}

export function TripRangePicker({
  start,
  end,
  selectedActivityDate,
  onSelectedActivityDate,
}: TripRangePickerProps) {
  const from = new Date(start);
  const to = new Date(end);

  const intervalMatcher: DateInterval = {
    after: to,
    before: from,
  };
  return (
    <DayPicker
      mode="single"
      selected={selectedActivityDate}
      onSelect={onSelectedActivityDate}
      disabled={intervalMatcher}
      required
    />
  );
}
