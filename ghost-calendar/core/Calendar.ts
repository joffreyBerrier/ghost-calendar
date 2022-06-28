import { notifyIfPeriodIsUncompleted } from "./helpers/notifiers";

import { CalendarPresenter } from "./CalendarPresenter";

import { dayFormatter } from "./helpers/date";

import { DayType, Period } from "./helpers/types";

export default class Calendar {
  constructor(
    private max: number,
    private rangeDates: Required<Period>[],
    private checkIn?: Date,
    private checkOut?: Date
  ) {}

  setPeriod(
    presenter: CalendarPresenter,
    day: DayType,
    startDayState: string,
    endDayState: string
  ) {
    const canBeStartDate = !day.isStartDate && !day.isBooking && !day.isPastDay;
    const periodIsUncompleted = startDayState && !endDayState;
    const periodIsCompleted = startDayState && endDayState;
    const isEndDateOrBookingMarker = day.isEndDate || day.isBookingMarker;

    const date = day.day as string;

    if (
      canBeStartDate ||
      isEndDateOrBookingMarker ||
      (day.isStartDate && startDayState)
    ) {
      if (periodIsUncompleted) {
        notifyIfPeriodIsUncompleted(presenter, date, startDayState);
      } else if (periodIsCompleted) {
        presenter.displayStartDate(date);
      } else {
        presenter.displayStartDate(date);
      }
    }
  }

  build(presenter: CalendarPresenter) {
    if (this.checkIn && this.checkOut) {
      presenter.displayEndDate(
        dayFormatter(this.checkOut, "yyyy-MM-dd"),
        dayFormatter(this.checkIn, "yyyy-MM-dd")
      );
    }

    presenter.displayMonthRange(this.max);
    presenter.displayRangeDates(this.rangeDates);
    presenter.displayCalendar([], this.checkIn, this.checkOut);
  }
}
