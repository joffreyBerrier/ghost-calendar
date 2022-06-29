import { useState, useEffect } from "react";

import {
  Calendar,
  CalendarPresenter,
  CalendarVM,
  DayType,
  LocaleType,
  Period,
} from "ghost-calendar";

type CalendarProps = {
  locale: LocaleType;
  startDate: Date;
  endDate: Date;
  checkIn?: Date;
  checkOut?: Date;
  paginateIndex: number;
  rangeDates: Required<Period>[];
  visualMonth: number;
};

export const useCalendar = ({
  locale,
  startDate,
  endDate,
  checkIn,
  checkOut,
  paginateIndex,
  rangeDates,
  visualMonth,
}: CalendarProps) => {
  const [calendarState, setCalendarState] = useState<CalendarVM | null>(null);

  const presenter = new CalendarPresenter(locale);
  const calendar = new Calendar({
    startDate,
    endDate,
    checkIn,
    checkOut,
    paginateIndex,
    rangeDates,
    visualMonth,
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

  useEffect(() => {
    presenter.subscribeVM((calendar) => {
      setCalendarState(calendar);
    });
  }, []);

  return {
    calendar: calendarState,
    setPeriod,
  };
};
