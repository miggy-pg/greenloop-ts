import { format } from "date-fns";

function formatDateTime(datetime: Date) {
  return format(new Date(datetime), "MMMM dd, yyyy");
}

export { formatDateTime };
