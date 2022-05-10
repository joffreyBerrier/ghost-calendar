import { useCreateMultipleMonths } from "./services/useCreateMultipleMonths";
import { getMonthDiff, getDatesBetweenTwoDates, isDateBefore } from "./helpers";

import { format } from "./plugins/day";

import { Day, Month, HeaderDay } from "./types";

export type { HeaderDay };

abstract class Presenter<T> {
  constructor(public vm: T) {}
}

class VmCalendar {
  checkIn = null;
  checkOut = null;
  months = [];
}

class Calendar extends Presenter<VmCalendar> {
  disabledDates: Array<string>;
  disabledDaysBeforeDayDate: Boolean;
  formatDate: string;
  today: Date;

  constructor(
    startDate: Date,
    endDate: Date,
    disabledDaysBeforeDayDate: boolean
  ) {
    const countOfMonth = getMonthDiff(startDate, endDate);
    const multipleMonths = useCreateMultipleMonths(startDate, countOfMonth);

    super(new VmCalendar());
    this.vm.months = multipleMonths;

    this.disabledDaysBeforeDayDate = disabledDaysBeforeDayDate;
    this.formatDate = "YYYY-MM-DD";
    this.today = new Date();
    this.vm.checkIn = null;
    this.vm.checkOut = null;

    this.disabledDates = [];
    this.setDisabledDays();
  }

  setDisabledDays() {
    const days = this.getDays();

    days.forEach((d: Day) => {
      if (this.inDisabledDay(d) && d.belongsToThisMonth) {
        d.isDisabled = true;
      } else {
        d.isDisabled = false;
      }
    });
  }

  getDays(): Array<Day> {
    return this.vm.months.map((m: Month) => m.days).flat(1);
  }

  cleanAttribute(attribute: string): void {
    const days = this.getDays();

    const hasAttribute = days.some((d: Day) => d[attribute]);

    if (hasAttribute) {
      days.find((x) => x[attribute])[attribute] = false;
    }
  }

  cleanAttributes(attribute: string): void {
    const days = this.getDays();

    days
      .filter((d: Day) => d[attribute])
      .forEach(() => {
        this.cleanAttribute(attribute);
      });
  }

  formatToday(): string {
    return format(this.today, this.formatDate);
  }

  inDisabledDay(day: Day): boolean {
    return (
      (this.disabledDaysBeforeDayDate &&
        day.formatDay !== this.formatToday() &&
        this.today > day.date) ||
      isDateBefore(day.date, this.vm.checkIn)
      // (disabledDates.includes(day.formatDay) &&
      //   !checkIncheckOutHalfDay[day.formatDay]) ||
      // (this.vm.checkIn &&
      //   nextDisableBookingDate &&
      //   isDateAfter(day.date, nextDisableBookingDate))
    );
  }

  setColorBetweenTwoDates(startDate: Date, endDate: Date): void {
    const days = this.getDays();
    const dateBetweenCheckInCheckOutDate = getDatesBetweenTwoDates(
      startDate,
      endDate,
      this.formatDate
    );

    days.forEach((day: Day) => {
      if (
        day.belongsToThisMonth &&
        dateBetweenCheckInCheckOutDate.includes(day.formatDay)
      ) {
        day.isBetweenCheckInCheckOut = true;
      }
    });
  }

  setCheckIn(day: Day): void {
    this.cleanAttribute("isCheckIn");
    this.cleanAttribute("isCheckOut");
    this.cleanAttributes("isBetweenCheckInCheckOut");

    if (day.belongsToThisMonth) {
      this.vm.checkIn = day.date;

      day.isCheckIn = true;
    }
  }

  setCheckOut(day: Day): void {
    this.cleanAttribute("isCheckOut");

    if (day.belongsToThisMonth) {
      this.vm.checkOut = day.date;

      day.isCheckOut = true;

      this.setColorBetweenTwoDates(this.vm.checkIn, this.vm.checkOut);
    }
  }

  clickOnCalendar(day: Day): void {
    const formatCheckIn = format(this.vm.checkIn, this.formatDate);

    if (day.formatDay === formatCheckIn) {
      this.vm.checkIn = null;
      day.isCheckIn = false;
    } else if (this.vm.checkIn && !this.vm.checkOut) {
      this.setCheckOut(day);
    } else if (!this.vm.checkIn) {
      this.setCheckIn(day);
    } else {
      this.setCheckIn(day);

      this.vm.checkOut = null;
      day.isCheckOut = false;
      this.cleanAttribute("isCheckOut");
    }

    this.setDisabledDays();
  }
}

export { format, Calendar, VmCalendar };
