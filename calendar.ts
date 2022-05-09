import { useCreateMultipleMonths } from "./compose/useCreateMultipleMonths";
import { getMonthDiff, getDatesBetweenTwoDates } from "./helpers";
import { Day, Month } from "./types";

abstract class Presenter<T> {
  constructor(public vm: T) {}
}

class VmCalendar {
  months = [];
}

class Calendar extends Presenter<VmCalendar> {
  checkIn: Date;
  checkOut: Date;
  formatDate: string;

  constructor(startDate: Date, endDate: Date, checkIn = null, checkOut = null) {
    const countOfMonth = getMonthDiff(startDate, endDate);
    const multipleMonths = useCreateMultipleMonths(startDate, countOfMonth);

    super(new VmCalendar());
    this.vm.months = multipleMonths;

    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.formatDate = "YYYY-MM-DD";
  }

  getDays(): Array<Day> {
    return this.vm.months.map((m: Month) => m.days).flat(1);
  }

  cleanAttribute(attribute: string): void {
    const days = this.getDays();

    const hasCheckIn = days.some((d: Day) => d[attribute]);

    if (hasCheckIn) {
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
      this.checkIn = day.date;

      day.isCheckIn = true;
    }
  }

  setCheckOut(day: Day): void {
    this.cleanAttribute("isCheckOut");

    if (day.belongsToThisMonth) {
      this.checkOut = day.date;

      day.isCheckOut = true;

      this.setColorBetweenTwoDates(this.checkIn, this.checkOut);
    }
  }

  clickOnCalendar(date: Day): void {
    if (!this.checkIn) {
      this.setCheckIn(date);
    } else if (this.checkIn && !this.checkOut) {
      this.setCheckOut(date);
    } else {
      this.checkOut = null;

      this.setCheckIn(date);
    }
  }
}

export { Calendar, VmCalendar };
