import Month from "./Month";
import Presenter from "./Presenter";

import { getBookingDates, getMonthDiff } from "./helpers/utils";
import {
  LocaleType,
  MonthType,
  Period,
  BookingColorType,
} from "./helpers/types";

export class CalendarVM {
  checkOut = "";
  months: MonthType[] = [];
  rangeDates: Required<Period>[] = [];
  checkIn = "";
  visualMonth: number = 2;
  activeIndex: number = 0;
  bookingColors: BookingColorType = {};
}

export class CalendarPresenter extends Presenter<CalendarVM> {
  private nextMonth: Date;
  private dates: Date[] = [];

  constructor(private locale?: LocaleType, private startMonth?: Date) {
    super(new CalendarVM());
    this.nextMonth = this.startMonth || new Date();
  }

  private getNextMonth(date: Date, countMonth: number) {
    if (date.getMonth() === 11) {
      this.nextMonth = new Date(date.getFullYear() + 1, 0, 1);
    } else if (countMonth === 0) {
      this.nextMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    } else {
      this.nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }

    return this.nextMonth;
  }

  private generateMonths(props: {
    period?: Period;
    checkIn?: Date;
    checkOut?: Date;
    bookingColors?: BookingColorType;
  }) {
    this.vm.months = [];

    for (let d = 0; d < this.dates.length; d++) {
      const currentDate = this.dates[d];
      this.vm.months.push(
        new Month({
          date: currentDate,
          period: props.period,
          rangeDates: this.vm.rangeDates,
          checkIn: props.checkIn,
          checkOut: props.checkOut,
          bookingColors: props.bookingColors,
        })
          .getMonthKey()
          .getMonthName(this.locale)
          .getMonthYearKey()
          .getMonthUniqueId()
          .getMonth()
          .build()
      );
    }

    if (this.vm.visualMonth) {
      this.vm.months = this.vm.months.slice(
        this.vm.activeIndex,
        this.vm.visualMonth + this.vm.activeIndex
      );
    }
  }

  setActiveIndex(checkIn: Date, checkOut: Date) {
    if (checkIn && checkOut) {
      const startDate = new Date();
      const startIndex = getMonthDiff(startDate, checkIn);

      this.vm.activeIndex = startIndex;
    } else {
      this.vm.activeIndex = 0;
    }
  }

  paginate(operator: string, checkIn?: Date, checkOut?: Date) {
    if (operator === "+") {
      this.vm.activeIndex += 1;
      this.generateMonths({
        period: {},
        checkIn,
        checkOut,
        bookingColors: this.vm.bookingColors,
      });
    } else if (operator === "-") {
      this.vm.activeIndex -= 1;
      this.generateMonths({
        period: {},
        checkIn,
        checkOut,
        bookingColors: this.vm.bookingColors,
      });
    }
  }

  displayRangeDates(rangeDates: Required<Period>[]) {
    this.vm.rangeDates = rangeDates;
  }

  displayMonthRange(max: number) {
    for (let countMonth = 0; countMonth < max; countMonth++) {
      const tempNextMonth = this.getNextMonth(this.nextMonth, countMonth);

      this.dates.push(tempNextMonth);
      this.nextMonth = tempNextMonth;
    }
  }

  displayInitializePeriod() {
    this.vm.checkIn = "";
    this.vm.checkOut = "";
  }

  displayStartDate(day: string) {
    this.vm.checkIn = day;
    this.vm.checkOut = "";
    this.displayCalendar({
      period: { startDate: day, endDate: "" },
      bookingColors: this.vm.bookingColors,
    });
    this.notifyVM();
  }

  displayEndDate(day: string, startDayState: string) {
    this.vm.checkIn = startDayState;
    this.vm.checkOut = day;

    if (this.vm.checkIn === this.vm.checkOut) {
      this.displayInitializePeriod();
    } else if (getBookingDates(this, startDayState, day).length === 0) {
      this.displayCalendar({
        period: { startDate: startDayState, endDate: day },
        bookingColors: this.vm.bookingColors,
      });
    } else {
      this.displayInitializePeriod();
    }
    this.notifyVM();
  }

  displayCalendar({
    period,
    checkIn,
    checkOut,
    visualMonth,
    bookingColors,
  }: {
    period?: Period;
    checkIn?: Date;
    checkOut?: Date;
    visualMonth?: number;
    bookingColors?: BookingColorType;
  }) {
    if (visualMonth) {
      this.vm.visualMonth = visualMonth;
    }

    if (bookingColors) {
      this.vm.bookingColors = bookingColors;
    }

    this.generateMonths({ period, checkIn, checkOut, bookingColors });
  }
}
