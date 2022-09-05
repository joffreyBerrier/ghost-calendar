import { dayFormatter } from "./helpers/date";
import {
  DayType,
  Period,
  BookingColorType,
  BookingInfo,
} from "./helpers/types";
import { checkCurrentDayAndPastDay, checkBetweenDates } from "./helpers/utils";

export default class Day {
  private day: DayType = {};

  constructor(private currentDay: Date) {}

  getDate() {
    this.day.day = dayFormatter(this.currentDay, "yyyy-MM-dd");

    return this;
  }

  getDayNumber() {
    this.day.dayNumber = dayFormatter(this.currentDay, "d");

    return this;
  }

  isCurrentDay(date: Date) {
    if (
      dayFormatter(this.currentDay, "yyyy-MM-dd") ===
      dayFormatter(date, "yyyy-MM-dd")
    ) {
      this.day.isCurrentDay = true;
    }

    return this;
  }

  isPast(date: Date) {
    if (this.day.day && checkCurrentDayAndPastDay(this.day.day, date)) {
      this.day.isPastDay = true;
    }

    return this;
  }

  isCheckInCheckOut(checkIn?: Date, checkOut?: Date) {
    if (checkIn && dayFormatter(checkIn, "yyyy-MM-dd") === this.day.day) {
      this.day.isStartDate = true;
    } else if (
      checkOut &&
      dayFormatter(checkOut, "yyyy-MM-dd") === this.day.day
    ) {
      this.day.isEndDate = true;
    }

    return this;
  }

  isStartDate(day: string | undefined) {
    if (this.day.day === day) {
      this.day.isStartDate = true;
    }

    return this;
  }

  isEndDate(day: string | undefined) {
    if (this.day.day === day) {
      this.day.isEndDate = true;
    }

    return this;
  }

  isHalfDay() {
    if (this.day.isStartDate && this.day.isEndDate) {
      this.day.isHalfDay = true;
    }

    return this;
  }

  setRangeDate(period?: Period, checkIn?: Date, checkOut?: Date) {
    if (
      checkIn &&
      checkOut &&
      checkBetweenDates(
        dayFormatter(checkIn, "yyyy-MM-dd"),
        dayFormatter(checkOut, "yyyy-MM-dd"),
        this.day.day
      )
    ) {
      this.day.isRangeDate = true;
    }

    if (period?.startDate && period?.endDate) {
      if (checkBetweenDates(period.startDate, period.endDate, this.day.day)) {
        this.day.isRangeDate = true;
      }
    }

    return this;
  }

  isBooking(range: Required<Period>[] | undefined) {
    if (range) {
      range.forEach((day) => {
        if (day.startDate === this.day.day) {
          this.day.isStartDate = true;
          this.day.isBooking = true;
        }

        if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
          this.day.isBooking = true;
        }

        if (day.endDate === this.day.day) {
          this.day.isEndDate = true;
          this.day.isBooking = true;
        }
      });
    }
    return this;
  }

  setBookingType(
    range: Required<Period>[] | undefined,
    bookingColors?: BookingColorType
  ) {
    if (range) {
      range.forEach((day) => {
        if (day.startDate === this.day.day) {
          this.day.bookingType = day.type;

          if (
            bookingColors &&
            bookingColors[day.type] &&
            bookingColors[day.type].startEnd
          ) {
            this.day.bookingColor = bookingColors[day.type].startEnd;
          }
        }

        if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
          this.day.bookingType = day.type;

          if (
            bookingColors &&
            bookingColors[day.type] &&
            bookingColors[day.type].beetween
          ) {
            this.day.bookingColor = bookingColors[day.type].beetween;
          }
        }

        if (day.endDate === this.day.day) {
          this.day.bookingType = day.type;

          if (
            bookingColors &&
            bookingColors[day.type] &&
            bookingColors[day.type].startEnd
          ) {
            this.day.bookingColor = bookingColors[day.type].startEnd;
          }
        }
      });
    }
    return this;
  }

  setCheckInOutTimes(range: Required<Period>[] | undefined) {
    if (range) {
      range.forEach((day) => {
        if (day.startDate === this.day.day) {
          this.day.checkInTime = day.checkInTime;
          this.day.checkOutTime = day.checkOutTime;
        }

        if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
          this.day.checkInTime = day.checkInTime;
          this.day.checkOutTime = day.checkOutTime;
        }

        if (day.endDate === this.day.day) {
          this.day.checkInTime = day.checkInTime;
          this.day.checkOutTime = day.checkOutTime;
        }
      });
    }
    return this;
  }

  setPeriod(range: Required<Period>[] | undefined) {
    if (range) {
      range.forEach((day) => {
        if (day.startDate === this.day.day) {
          this.day.period = { checkIn: day.startDate, checkOut: day.endDate };
        }

        if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
          this.day.period = { checkIn: day.startDate, checkOut: day.endDate };
        }

        if (day.endDate === this.day.day) {
          this.day.period = { checkIn: day.startDate, checkOut: day.endDate };
        }
      });
    }
    return this;
  }

  setBookingId(range: Required<Period>[] | undefined) {
    if (range) {
      range.forEach((day) => {
        if (day.startDate === this.day.day) {
          this.day.id = day.id;
        }

        if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
          this.day.id = day.id;
        }

        if (day.endDate === this.day.day) {
          this.day.id = day.id;
        }
      });
    }
    return this;
  }

  setBookingContractInfo(range: BookingInfo | undefined) {
    if (range) {
      range.forEach((day) => {
        if (day.type === "contract") {
          if (day.startDate === this.day.day) {
            this.day.clientFirstname = day.clientFirstname;
            this.day.clientLastname = day.clientLastname;
            this.day.currencyTrigram = day.currencyTrigram;
            this.day.clientPrice = day.clientPrice;
          }

          if (checkBetweenDates(day.startDate, day.endDate, this.day.day)) {
            this.day.clientFirstname = day.clientFirstname;
            this.day.clientLastname = day.clientLastname;
            this.day.currencyTrigram = day.currencyTrigram;
            this.day.clientPrice = day.clientPrice;
          }

          if (day.endDate === this.day.day) {
            this.day.clientFirstname = day.clientFirstname;
            this.day.clientLastname = day.clientLastname;
            this.day.currencyTrigram = day.currencyTrigram;
            this.day.clientPrice = day.clientPrice;
          }
        }
      });
    }
    return this;
  }

  build() {
    return { ...this.day };
  }
}
