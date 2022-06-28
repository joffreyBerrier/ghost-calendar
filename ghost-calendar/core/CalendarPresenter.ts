import Month from "./Month";
import Presenter from "./Presenter";

import { getBookingDates } from "./helpers/utils";
import { LocaleType, MonthType, Period } from "./helpers/types";

export class CalendarVM {
  months: MonthType[] = [];
  startDate = "";
  endDate = "";
  rangeDates: Required<Period>[] = [];
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

  private generateMonths(period?: Period) {
    this.vm.months = [];

    for (let d = 0; d < this.dates.length; d++) {
      const currentDate = this.dates[d];
      this.vm.months.push(
        new Month(currentDate, period, this.vm.rangeDates)
          .getMonthKey()
          .getMonthName(this.locale)
          .getMonthYearKey()
          .getMonthUniqueId()
          .getMonth()
          .build()
      );
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
    this.displayCalendar({ startDate: day });
    this.notifyVM();
  }

  displayEndDate(day: string, startDayState: string) {
    this.vm.startDate = startDayState;
    this.vm.endDate = day;

    if (this.vm.startDate === this.vm.endDate) {
      this.displayInitializePeriod();
    } else if (getBookingDates(this, startDayState, day).length === 0) {
      this.displayCalendar({ startDate: startDayState, endDate: day });
    } else {
      this.displayInitializePeriod();
    }
    this.notifyVM();
  }

  displayCalendar(period?: Period) {
    this.generateMonths(period);
  }
}
