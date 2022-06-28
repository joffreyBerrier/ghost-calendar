import { ref } from "vue";

import { Calendar, CalendarPresenter, CalendarVM } from "ghost-calendar";

import type { LocaleType, Period } from "ghost-calendar";

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
  const calendarState = ref<CalendarVM | null>(null);

  const presenter = new CalendarPresenter(locale);
  const calendar = new Calendar(nbMonths + 1, rangeDates);

  calendar.build(presenter);

  const setPeriod = (day: DayType) => {
    if (calendarState) {
      calendar.setPeriod(
        presenter,
        day,
        calendarState.startDate,
        calendarState.endDate
      );

      presenter.subscribeVM((calendar) => {
        calendarState.value = calendar;
      });
    }
  };

  presenter.subscribeVM((calendar) => {
    calendarState.value = calendar;
  });

  return {
    calendar: calendarState,
    setPeriod,
  };
};