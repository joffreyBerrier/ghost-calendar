import Day from "./Day";

import { date } from "./helpers/date";
import { LocaleType, MonthType, Period } from "./helpers/types";
import {
  getMonthName,
  getFirstDayOfMonth,
  getFirstDayOfFirstWeekOfMonth,
} from "./helpers/utils";

const FIRST_DAY_OF_WEEK = 1;
const MAX_DAYS_IN_MONTH = 42;

export default class Month {
  private month: MonthType = { days: [] };

  constructor(
    private date: Date,
    private period?: Period,
    private rangeDates?: Required<Period>[]
  ) {}

  private pushDayInMonth(day: Date, currentDate: Date) {
    const belongsToThisMonth = day.getMonth() === this.month?.monthKey;

    if (belongsToThisMonth) {
      this.month.days.push(
        new Day(day)
          .getDate()
          .getDayNumber()
          .isBooking(this.rangeDates)
          .isCurrentDay(currentDate)
          .isPast(currentDate)
          .isStartDate(this.period?.startDate)
          .isEndDate(this.period?.endDate)
          .setBookingType(this.rangeDates)
          .setBookingMarker(this.period)
          .setCheckInOutTimes(this.rangeDates)
          .setPeriod(this.rangeDates)
          .build()
      );
    } else {
      this.month.days.push({});
    }
  }

  getMonthUniqueId() {
    this.month.id = `${this.month.monthKey}-${this.month.yearKey}`;

    return this;
  }

  getMonthKey() {
    this.month = { days: [] };
    this.month.monthKey = this.date.getMonth();

    return this;
  }

  getMonthName(locale: LocaleType) {
    this.month.monthName = getMonthName(getFirstDayOfMonth(this.date), locale);

    return this;
  }

  getMonthYearKey() {
    this.month.yearKey = this.date.getFullYear();

    return this;
  }

  getMonth() {
    const firstDay = getFirstDayOfFirstWeekOfMonth(
      this.date,
      FIRST_DAY_OF_WEEK
    );
    const currentDate = new Date();

    for (let i = 0; i < MAX_DAYS_IN_MONTH; i++) {
      const day = date(firstDay).addDays(i) as unknown as Date;

      this.pushDayInMonth(day, currentDate);
    }

    return this;
  }

  build() {
    return JSON.parse(JSON.stringify(this.month));
  }
}
