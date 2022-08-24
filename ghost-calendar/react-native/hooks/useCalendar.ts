import { useState, useEffect } from "react";

import {
  BookingColorType,
  Calendar,
  CalendarPresenter,
  CalendarVM,
  DayType,
  LocaleType,
  Period,
} from "../../core";

type CalendarProps = {
  locale: LocaleType;
  startDate: Date;
  endDate: Date;
  checkIn?: Date;
  checkOut?: Date;
  rangeDates: Required<Period>[];
  visualMonth: number;
  bookingColors: BookingColorType;
};

export const useCalendar = ({
  locale,
  startDate,
  endDate,
  checkIn,
  checkOut,
  rangeDates,
  visualMonth,
  bookingColors,
}: CalendarProps) => {
  const [calendarState, setCalendarState] = useState<CalendarVM | null>(null);

  const presenter = new CalendarPresenter(locale, startDate);
  const calendar = new Calendar({
    startDate,
    endDate,
    checkIn,
    checkOut,
    rangeDates,
    visualMonth,
    bookingColors,
  });

  calendar.build(presenter);

  const setPeriod = (day: DayType) => {
    if (calendarState) {
      calendar.setPeriod(
        presenter,
        day,
        calendarState.checkIn,
        calendarState.checkOut
      );

      presenter.subscribeVM((calendar) => {
        setCalendarState(calendar);
      });
    }
  };

  const clearCalendar = () => {
    calendar.clearCalendar(presenter);

    presenter.subscribeVM((calendar) => {
      setCalendarState(calendar);
    });
  };

  const setPaginate = (operator: string) => {
    calendar.paginate(presenter, operator);

    presenter.subscribeVM((calendar) => {
      setCalendarState(calendar);
    });
  };

  useEffect(() => {
    presenter.subscribeVM((calendar) => {
      setCalendarState(calendar);
    });
  }, []);

  return {
    calendar: calendarState,
    setPeriod,
    setPaginate,
    resetCalendar: () => clearCalendar(),
  };
};
