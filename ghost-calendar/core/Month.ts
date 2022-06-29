import Day from "./Day";

import { date } from "./helpers/date";
import {
  LocaleType,
  MonthType,
  Period,
  BookingColorType,
} from "./helpers/types";
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
    private props: {
      date: Date;
      period?: Period;
      rangeDates?: Required<Period>[];
      checkIn?: Date;
      checkOut?: Date;
      bookingColors?: BookingColorType;
    }
  ) {}

  private pushDayInMonth(day: Date, currentDate: Date) {
    const belongsToThisMonth = day.getMonth() === this.month?.monthKey;

    if (belongsToThisMonth) {
      this.month.days.push(
        new Day(day)
          .getDate()
          .getDayNumber()
          .isBooking(this.props.rangeDates)
          .isCurrentDay(currentDate)
          .isPast(currentDate)
          .isStartDate(this.props.period?.startDate)
          .isEndDate(this.props.period?.endDate)
          .setBookingType(this.props.rangeDates, this.props.bookingColors)
          .setRangeDate(
            this.props.period,
            this.props.checkIn,
            this.props.checkOut
          )
          .setCheckInOutTimes(this.props.rangeDates)
          .setPeriod(this.props.rangeDates)
          .isCheckInCheckOut(this.props.checkIn, this.props.checkOut)
          .isHalfDay()
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
    this.month.monthKey = this.props.date.getMonth();

    return this;
  }

  getMonthName(locale: LocaleType) {
    this.month.monthName = getMonthName(
      getFirstDayOfMonth(this.props.date),
      locale
    );

    return this;
  }

  getMonthYearKey() {
    this.month.yearKey = this.props.date.getFullYear();

    return this;
  }

  getMonth() {
    const firstDay = getFirstDayOfFirstWeekOfMonth(
      this.props.date,
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
    return { ...this.month };
  }
}
