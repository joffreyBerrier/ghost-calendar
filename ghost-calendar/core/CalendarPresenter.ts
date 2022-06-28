import Month from "./Month";
import Presenter from "./Presenter";

import { getBookingDates } from "./helpers/utils";
import { LocaleType, MonthType, Period } from "./helpers/types";

export class CalendarVM {
  endDate = "";
  months: MonthType[] = [];
  rangeDates: Required<Period>[] = [];
  startDate = "";
  visualMonth: number = 2;
  activeIndex: number = 0;
}

export class CalendarPresenter extends Presenter<CalendarVM> {
  private nextMonth: Date = new Date();
  private dates: Date[] = [];

  constructor(private locale?: LocaleType) {
    super(new CalendarVM());
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

  private getIndexMonth(date: string) {
    return this.vm.months.findIndex(
      (month) => month.monthKey === new Date(date as string).getMonth()
    );
  }

  private generateMonths(period?: Period, checkIn?: Date, checkOut?: Date) {
    this.vm.months = [];

    for (let d = 0; d < this.dates.length; d++) {
      const currentDate = this.dates[d];
      this.vm.months.push(
        new Month({
          date: currentDate,
          period,
          rangeDates: this.vm.rangeDates,
          checkIn,
          checkOut,
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

  setActiveIndex(operator: string, checkIn?: Date, checkOut?: Date) {
    if (operator === "+") {
      this.vm.activeIndex += 1;
      this.generateMonths({}, checkIn, checkOut);
    } else if (operator === "-") {
      this.vm.activeIndex -= 1;
      this.generateMonths({}, checkIn, checkOut);
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
    this.vm.startDate = "";
    this.vm.endDate = "";
  }

  displayStartDate(day: string) {
    this.vm.startDate = day;
    this.vm.endDate = "";
    this.displayCalendar({ period: { startDate: day, endDate: "" } });
    this.notifyVM();
  }

  displayEndDate(day: string, startDayState: string) {
    this.vm.startDate = startDayState;
    this.vm.endDate = day;

    if (this.vm.startDate === this.vm.endDate) {
      this.displayInitializePeriod();
    } else if (getBookingDates(this, startDayState, day).length === 0) {
      this.displayCalendar({
        period: { startDate: startDayState, endDate: day },
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
  }: {
    period?: Period;
    checkIn?: Date;
    checkOut?: Date;
    visualMonth?: number;
  }) {
    if (visualMonth) {
      this.vm.visualMonth = visualMonth;
    }

    this.generateMonths(period, checkIn, checkOut);
  }
}
