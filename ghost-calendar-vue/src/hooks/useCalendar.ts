import { ref } from "vue";

import { Calendar, CalendarPresenter, CalendarVM } from "core";

import type { DayType, LocaleType, Period } from "ghost-calendar";

type CalendarProps = {
  locale: LocaleType;
  nbMonths: number;
  rangeDates: Required<Period>[];
  checkIn: Date;
  checkOut: Date;
};

export const useCalendar = ({
  locale,
  nbMonths,
  rangeDates,
  checkIn,
  checkOut,
}: CalendarProps) => {
  const calendarState = ref<CalendarVM | null>(null);
  const presenter = new CalendarPresenter(locale);
  const calendar = new Calendar(nbMonths + 1, rangeDates, checkIn, checkOut);

  calendar.build(presenter);

  const setPeriod = (day: DayType) => {
    if (calendarState.value) {
      calendar.setPeriod(
        presenter,
        day,
        calendarState.value.startDate,
        calendarState.value.endDate
      );

      presenter.subscribeVM((calendar) => {
        calendarState.value = { ...calendar };
      });
    }
  };

  presenter.subscribeVM((calendar) => {
    calendarState.value = { ...calendar };
  });

  return {
    calendar: calendarState,
    setPeriod,
  };
};
