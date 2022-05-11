import {
  useCheckIncheckOutHalfDay,
  useCreateHalfDayDates,
  useCreateMultipleMonths,
  useFlatBooking,
  useGetNextBookingDate,
  useGetPeriod,
} from "./services";

import {
  addDays,
  getDatesBetweenTwoDates,
  getMonthDiff,
  isDateAfter,
  isDateBefore,
  validateDateBetweenTwoDates,
} from "./helpers";

import { format } from "./plugins/day";

import {
  Booking,
  BookingColor,
  CheckInCheckOutHalfDay,
  Day,
  FlatBooking,
  HeaderDay,
  Month,
  Period,
} from "./types";

export type { HeaderDay, Booking, Period };

export type TypeCalendar = {
  bookedDates: string[];
  bookingColor: BookingColor;
  bookingDates: Booking[];
  checkIncheckOutHalfDay: CheckInCheckOutHalfDay;
  disabledDaysBeforeDayDate: boolean;
  endDate: Date;
  flatBookingDates: FlatBooking[];
  periodDates: Period[];
  startDate: Date;
};

abstract class Presenter<T> {
  constructor(public vm: T) {}
}

class VmCalendar {
  activeIndex = 0;
  checkIn = null;
  checkOut = null;
  months = [];
  setBookingDates = () => {};

  get slicedMonths() {
    const count = 2;

    return this.months.slice(this.activeIndex, count + this.activeIndex);
  }

  paginate(operator: string): void {
    const count = 1;

    if (operator === "-") {
      this.activeIndex -= count;
    }
    if (operator === "+") {
      this.activeIndex += count;
    }
  }
}

class Calendar extends Presenter<VmCalendar> {
  bookedDates: string[];
  bookingColor: BookingColor;
  bookingDates: Booking[];
  checkIncheckOutHalfDay: CheckInCheckOutHalfDay;
  currentPeriod: Period;
  disabledDates: string[];
  disabledDaysBeforeDayDate: Boolean;
  flatBookingDates: FlatBooking[];
  formatDate: string;
  newBookingDate: Booking[];
  newBookingDates: Booking[];
  nextDisableBookingDate: Date;
  nightlyPeriods: string[];
  periodDates: Period[];
  saturdayWeeklyPeriods: string[];
  sundayWeeklyPeriods: string[];
  today: Date;

  constructor({
    bookedDates = [],
    bookingColor = {},
    bookingDates = [],
    disabledDaysBeforeDayDate,
    endDate,
    periodDates = [],
    startDate,
  }: TypeCalendar) {
    const countOfMonth = getMonthDiff(startDate, endDate);
    const multipleMonths = useCreateMultipleMonths(startDate, countOfMonth);

    super(new VmCalendar());
    // Vm
    this.vm.months = multipleMonths;
    this.vm.activeIndex = this.setStartActiveIndex(startDate);
    this.vm.checkIn = null;
    this.vm.checkOut = null;

    // Core logic
    this.formatDate = "YYYY-MM-DD";
    this.disabledDaysBeforeDayDate = disabledDaysBeforeDayDate;
    this.today = new Date();
    this.nextDisableBookingDate = null;
    this.newBookingDate = [];
    this.checkIncheckOutHalfDay = {};

    // PeriodDates
    this.currentPeriod = null;
    this.periodDates = periodDates;
    this.saturdayWeeklyPeriods = [];
    this.sundayWeeklyPeriods = [];
    this.nightlyPeriods = [];

    // Booking Dates / Booked Dates
    this.bookedDates = bookedDates;
    this.bookingColor = bookingColor;
    this.bookingDates = bookingDates;

    this.setStyleOnDay();
  }

  getCurrentPeriod(day: Day) {
    const currentPeriod = this.periodDates.find((period: Period) => {
      if (
        period.endAt !== day.formatDay &&
        (period.startAt === day.formatDay ||
          validateDateBetweenTwoDates(
            period.startAt,
            period.endAt,
            day.formatDay
          ))
      ) {
        return period;
      }
    });

    if (currentPeriod) {
      const durationType =
        currentPeriod.periodType === "weekly_by_saturday" ||
        currentPeriod.periodType === "weekly_by_sunday"
          ? "week"
          : "day";
      const minimumDuration =
        durationType === "week"
          ? currentPeriod.minimumDuration * 7
          : currentPeriod.minimumDuration;

      return {
        ...currentPeriod,
        nextEnableDate: addDays(day.date, minimumDuration),
      };
    }

    return null;
  }

  setDifferentPeriodType() {
    this.saturdayWeeklyPeriods = useGetPeriod(
      this.periodDates,
      "weekly_by_saturday",
      this.formatDate
    );

    this.sundayWeeklyPeriods = useGetPeriod(
      this.periodDates,
      "weekly_by_sunday",
      this.formatDate
    );

    this.nightlyPeriods = useGetPeriod(
      this.periodDates,
      "nightly",
      this.formatDate
    );
  }

  setStartActiveIndex(startDate) {
    return getMonthDiff(startDate, new Date()) - 1;
  }

  setBookingDates() {
    const res = useCreateHalfDayDates(
      this.bookingDates,
      this.bookedDates,
      this.bookingColor,
      this.formatDate
    );

    this.flatBookingDates = useFlatBooking(
      this.bookingDates,
      this.bookingColor,
      this.formatDate
    );

    this.disabledDates = res.disabledDates;
    this.newBookingDates = res.newBookingDates;
  }

  setHalfDay() {
    this.checkIncheckOutHalfDay = useCheckIncheckOutHalfDay(
      this.bookingDates,
      this.bookedDates
    );
  }

  setStyleOnDay() {
    this.setDifferentPeriodType();
    this.setBookingDates();
    this.setHalfDay();

    const days = this.getDays();

    days.forEach((d: Day) => {
      const isDisabled = this.inDisabledDay(d);
      const isBooking =
        this.isInBookingDates(d) &&
        !this.isInCheckinHalfDayAndCheckin(d) &&
        !this.isInCheckinHalfDayAndNotCheckin(d) &&
        !this.isInCheckoutHalfDay(d);

      // Half Day
      const isCheckOutCheckInHalfDay = this.isInCheckoutHalfDay(d);
      const isCheckOutHalfDay = this.isInCheckoutHalfDay(d);
      const isCheckInHalfDay = this.isInCheckinHalfDayAndCheckin(d);
      const isInCheckinHalfDayAndNotCheckin =
        this.isInCheckinHalfDayAndNotCheckin(d);

      // Periods
      const inWeeklyPeriodsCheckin = this.inWeeklyPeriodsCheckin(d);
      const inWeeklyPeriods = this.inWeeklyPeriods(d);
      const inNightlyPeriod = this.inNightlyPeriod(d);

      if (d.belongsToThisMonth) {
        if (isDisabled) {
          d.isDisabled = true;
        } else {
          d.isDisabled = false;
        }

        // Bookings
        if (isBooking) {
          d.isBookingDate = true;
        } else {
          d.isBookingDate = false;
        }

        // HalfDays
        if (isCheckOutCheckInHalfDay) {
          d.isCheckInCheckOutHalfDay = true;
        } else {
          d.isCheckInCheckOutHalfDay = false;
        }

        if (isCheckInHalfDay) {
          d.isCheckInHalfDay = true;
        } else {
          d.isCheckInHalfDay = false;
        }

        if (isCheckOutHalfDay) {
          d.isCheckOutHalfDay = true;
        } else {
          d.isCheckOutHalfDay = false;
        }

        if (isInCheckinHalfDayAndNotCheckin) {
          d.isInCheckinHalfDayAndNotCheckin = true;
        } else {
          d.isInCheckinHalfDayAndNotCheckin = false;
        }

        // Periods
        if (inWeeklyPeriodsCheckin) {
          d.isInWeeklyPeriodsCheckin = true;
        } else {
          d.isInWeeklyPeriodsCheckin = false;
        }
        if (inWeeklyPeriods) {
          d.isInWeeklyPeriods = true;
        } else {
          d.isInWeeklyPeriods = false;
        }
        if (inNightlyPeriod) {
          d.isInNightlyPeriod = true;
        } else {
          d.isInNightlyPeriod = false;
        }
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

  getNextBookingDate(day: Day) {
    if (this.newBookingDates.length > 0) {
      let newDate = day.date;
      if (this.checkIncheckOutHalfDay[day.formatDay]?.checkOut) {
        newDate = addDays(day.date, 1);
      }

      this.nextDisableBookingDate = useGetNextBookingDate(
        this.newBookingDates,
        newDate
      );
    }
  }

  // In periods
  inWeeklyPeriods(day: Day) {
    return (
      (this.saturdayWeeklyPeriods.includes(day.formatDay) &&
        day.date.getDay() !== 6) ||
      (this.sundayWeeklyPeriods.includes(day.formatDay) &&
        day.date.getDay() !== 0)
    );
  }
  inNightlyPeriod(day: Day) {
    return (
      this.vm.checkIn !== day.date &&
      this.currentPeriod?.nextEnableDate > day.date &&
      this.currentPeriod?.periodType === "nightly" &&
      this.nightlyPeriods.includes(day.formatDay)
    );
  }
  inWeeklyPeriodsCheckin(day) {
    return (
      this.vm.checkIn !== day.date &&
      this.currentPeriod?.nextEnableDate > day.date &&
      (this.currentPeriod?.periodType === "weekly_by_saturday" ||
        this.currentPeriod?.periodType === "weekly_by_sunday") &&
      (this.saturdayWeeklyPeriods.includes(day.formatDay) ||
        this.sundayWeeklyPeriods.includes(day.formatDay)) &&
      (day.date.getDay() === 6 || day.date.getDay() === 0)
    );
  }

  // Is in
  isInBookingDates(day: Day) {
    return (
      this.flatBookingDates.some((x) => x.value.includes(day.formatDay)) &&
      day.belongsToThisMonth &&
      !this.isInCheckoutHalfDay(day)
    );
  }
  isInCheckinHalfDayAndCheckin(day: Day): boolean {
    return (
      Boolean(this.checkIncheckOutHalfDay[day.formatDay]?.checkIn) &&
      Boolean(this.vm.checkIn)
    );
  }
  isInCheckinHalfDayAndNotCheckin(day: Day): boolean {
    return (
      Boolean(this.checkIncheckOutHalfDay[day.formatDay]?.checkIn) &&
      Boolean(!this.vm.checkIn)
    );
  }
  isInCheckoutHalfDay(day: Day): boolean {
    return Boolean(this.checkIncheckOutHalfDay[day.formatDay]?.checkOut);
  }
  inDisabledDay(day: Day): boolean {
    return (
      (this.disabledDaysBeforeDayDate &&
        day.formatDay !== this.formatToday() &&
        this.today > day.date) ||
      isDateBefore(day.date, this.vm.checkIn) ||
      (this.disabledDates.includes(day.formatDay) &&
        !this.checkIncheckOutHalfDay[day.formatDay]) ||
      (this.vm.checkIn &&
        this.nextDisableBookingDate &&
        isDateAfter(day.date, this.nextDisableBookingDate))
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
    if (!day.isDisabled) {
      this.cleanAttribute("isCheckIn");
      this.cleanAttribute("isCheckOut");
      this.cleanAttributes("isBetweenCheckInCheckOut");

      if (day.belongsToThisMonth) {
        this.vm.checkIn = day.date;

        day.isCheckIn = true;
      }
    }
  }

  setCheckOut(day: Day): void {
    if (!day.isDisabled) {
      this.cleanAttribute("isCheckOut");

      if (day.belongsToThisMonth) {
        this.vm.checkOut = day.date;

        day.isCheckOut = true;

        this.setColorBetweenTwoDates(this.vm.checkIn, this.vm.checkOut);
      }
    }
  }

  clickOnCalendar(day: Day): void {
    const formatCheckIn = format(this.vm.checkIn, this.formatDate);

    const enabledClick =
      !day.isDisabled &&
      !day.isInCheckinHalfDayAndNotCheckin &&
      !day.isInWeeklyPeriodsCheckin &&
      !day.isInWeeklyPeriods &&
      !day.isInNightlyPeriod;

    if (enabledClick) {
      if (day.formatDay === formatCheckIn) {
        // CheckIn when already CheckIn
        this.vm.checkIn = null;
        day.isCheckIn = false;
        this.nextDisableBookingDate = null;
        this.currentPeriod = null;
      } else if (this.vm.checkIn && !this.vm.checkOut) {
        // CheckIn + !ChecKout
        this.setCheckOut(day);
        this.nextDisableBookingDate = null;
        this.currentPeriod = null;
      } else if (!this.vm.checkIn) {
        // CheckIn
        this.setCheckIn(day);
        this.getNextBookingDate(day);
        this.currentPeriod = this.getCurrentPeriod(day);
      } else {
        // CheckIn + CheckOut
        this.setCheckIn(day);
        this.getNextBookingDate(day);

        this.vm.checkOut = null;
        day.isCheckOut = false;
        this.cleanAttribute("isCheckOut");
        this.currentPeriod = this.getCurrentPeriod(day);
      }

      this.setStyleOnDay();
    }
  }
}

export { format, Calendar, VmCalendar };
