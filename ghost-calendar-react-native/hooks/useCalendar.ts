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
  nbMonths: number;
  rangeDates: Required<Period>[];
};

export const useCalendar = ({
  locale,
  nbMonths,
  rangeDates,
}: CalendarProps) => {
  const [calendarState, setCalendarState] = useState<CalendarVM | null>(null);

  const presenter = new CalendarPresenter(locale);
  const calendar = new Calendar(nbMonths + 1, rangeDates);

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
