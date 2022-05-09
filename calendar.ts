import { useCreateMultipleMonths } from "./compose/useCreateMultipleMonths";
import { getMonthDiff } from "./helpers";

class Calendar {
  constructor(startDate: Date, endDate: Date) {
    const countOfMonth = getMonthDiff(startDate, endDate);
    const multipleMonths = useCreateMultipleMonths(startDate, countOfMonth);

    this.months = multipleMonths;
  }
}

export { Calendar };
