import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export const formattedDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: idLocale });
};
