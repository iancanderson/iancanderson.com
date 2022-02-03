import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <span className="italic text-slate-500">
      <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>
    </span>
  );
};

export default DateFormatter;
