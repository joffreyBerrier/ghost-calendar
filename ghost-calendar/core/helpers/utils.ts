import { CalendarPresenter } from "../CalendarPresenter";

import { DayType, MonthType, LocaleType } from "./types";
import { date, dayFormatter } from "./date";

export const getMonthName = (day: Date, locale?: LocaleType): string => {
  const currentMonth = date(day).toString("MMMM", locale);
  const currentYear = date(day).toString("yyyy");

  return `${currentMonth} ${currentYear}`;
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getFirstDayOfFirstWeekOfMonth = (
  day: Date,
  firstDayOfWeek: number
) => {
  const firstDay = getFirstDayOfMonth(day);
  let offset = firstDayOfWeek - firstDay.getDay();

  if (offset > 0) {
    offset -= 7;
  }

  return date(firstDay.setDate(firstDay.getDate() + offset));
};

export const checkCurrentDayAndPastDay = (date: string, currentDay: Date) => {
  return (
    new Date(date).getTime() <
    new Date(dayFormatter(currentDay, "yyyy-MM-dd")).getTime()
  );
};

export const checkBetweenDates = (
  startDate: string,
  endDate: string,
  currentDate: string | undefined
) => {
  if (currentDate) {
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    const currentDateTime = new Date(currentDate).getTime();

    if (currentDateTime > startDateTime && currentDateTime < endDateTime) {
      return true;
    }

    return false;
  }
};

const findMonth = (
  presenter: CalendarPresenter,
  endDateMonth: number,
  endDateYear: number
) => {
  return presenter.vm.months.find((month) => {
    if (month.monthKey === endDateMonth && month.yearKey === endDateYear) {
      return month;
    }
  });
};

const pushBookingDates = (
  monthFound: MonthType | undefined,
  startDate: Date,
  endDate: Date,
  bookingDate: DayType[]
) => {
  if (monthFound) {
    const daysFound = monthFound.days.filter((day) => {
      if (day.day) {
        if (
          !checkCurrentDayAndPastDay(day.day, startDate) &&
          checkCurrentDayAndPastDay(day.day, endDate)
        ) {
          return day;
        }
      }
    });

    daysFound.forEach((day) => {
      if (day.isBooking && !day.isEndDate && !day.isStartDate) {
        bookingDate.push(day);
      }
    });
  }
};

// Todo: Refacto this function
export const getBookingDates = (
  presenter: CalendarPresenter,
  startDayState: string,
  endDayState: string
) => {
  const endDate = new Date(endDayState);
  const startDate = new Date(startDayState);
  const bookingDate: DayType[] = [];

  const startDateMonth = startDate.getMonth();
  const startDateYear = startDate.getFullYear();
  const endDateMonth = endDate.getMonth();
  const endDateYear = endDate.getFullYear();

  if (endDateMonth === startDateMonth) {
    const monthFound = findMonth(presenter, endDateMonth, endDateYear);

    pushBookingDates(monthFound, startDate, endDate, bookingDate);
  } else if (endDateMonth > startDateMonth && startDateYear === endDateYear) {
    const fistMonthFound = findMonth(presenter, startDateMonth, startDateYear);
    const secondMonthFound = findMonth(presenter, endDateMonth, endDateYear);

    pushBookingDates(fistMonthFound, startDate, endDate, bookingDate);
    pushBookingDates(secondMonthFound, startDate, endDate, bookingDate);
  } else if (startDateYear < endDateYear) {
    const fistMonthFound = findMonth(presenter, startDateMonth, startDateYear);
    const secondMonthFound = findMonth(presenter, endDateMonth, endDateYear);

    pushBookingDates(fistMonthFound, startDate, endDate, bookingDate);
    pushBookingDates(secondMonthFound, startDate, endDate, bookingDate);
  }

  return bookingDate;
};
