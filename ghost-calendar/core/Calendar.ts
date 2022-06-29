import { getMonthDiff } from "./helpers/utils";

import { dayFormatter } from "./helpers/date";
import { DayType, Period } from "./helpers/types";
import { notifyIfPeriodIsUncompleted } from "./helpers/notifiers";

import { CalendarPresenter } from "./CalendarPresenter";

export default class Calendar {
  constructor(
    private props: {
      startDate: Date;
      endDate: Date;
      checkIn?: Date;
      checkOut?: Date;
      paginateIndex: number;
      rangeDates: Required<Period>[];
      visualMonth: number;
      bookingColors: Record<string, string>;
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
    const isEndDateOrBookingMarker = day.isEndDate || day.isRangeDate;

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

  paginate(presenter: CalendarPresenter, operator: string) {
    presenter.paginate(operator, this.props.checkIn, this.props.checkOut);
  }

  private setActiveIndex(presenter: CalendarPresenter) {
    if (this.props.checkIn && this.props.checkOut) {
      presenter.setActiveIndex(this.props.checkIn, this.props.checkOut);
    }
  }

  private setStartDateAndEndDate() {
    if (!this.props.startDate) {
      this.props.startDate = new Date();
    }
    if (!this.props.endDate) {
      this.props.endDate = new Date(new Date().getFullYear() + 2, 0, 1);
    }
  }

  private setCheckInCheckOut(presenter) {
    if (this.props.checkIn && this.props.checkOut) {
      presenter.displayEndDate(
        dayFormatter(this.props.checkOut, "yyyy-MM-dd"),
        dayFormatter(this.props.checkIn, "yyyy-MM-dd")
      );

      this.setActiveIndex(presenter);
    }
  }

  private setNbMonth(presenter) {
    const nbMonths: number = getMonthDiff(
      this.props.startDate,
      this.props.endDate
    );
    presenter.displayMonthRange(nbMonths);
  }

  build(presenter: CalendarPresenter) {
    this.setStartDateAndEndDate();
    this.setCheckInCheckOut(presenter);
    this.setNbMonth(presenter);

    presenter.displayRangeDates(this.props.rangeDates);
    presenter.displayCalendar({
      period: {},
      checkIn: this.props.checkIn,
      checkOut: this.props.checkOut,
      visualMonth: this.props.visualMonth,
      bookingColors: this.props.bookingColors,
    });
  }
}
