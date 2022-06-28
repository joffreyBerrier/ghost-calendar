import { notifyIfPeriodIsUncompleted } from "./helpers/notifiers";

import { CalendarPresenter } from "./CalendarPresenter";

import { dayFormatter } from "./helpers/date";

import { DayType, Period } from "./helpers/types";

export default class Calendar {
  constructor(
    private props: {
      checkIn?: Date;
      checkOut?: Date;
      nbMonths: number;
      paginateIndex: number;
      rangeDates: Required<Period>[];
      visualMonth: number;
    }
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

  setPaginate(presenter: CalendarPresenter, operator: string) {
    presenter.setActiveIndex(operator, this.props.checkIn, this.props.checkOut);
  }

  build(presenter: CalendarPresenter) {
    if (this.props.checkIn && this.props.checkOut) {
      presenter.displayEndDate(
        dayFormatter(this.props.checkOut, "yyyy-MM-dd"),
        dayFormatter(this.props.checkIn, "yyyy-MM-dd")
      );
    }

    presenter.displayMonthRange(this.props.nbMonths);
    presenter.displayRangeDates(this.props.rangeDates);
    presenter.displayCalendar({
      period: {},
      checkIn: this.props.checkIn,
      checkOut: this.props.checkOut,
      visualMonth: this.props.visualMonth,
    });
  }
}
