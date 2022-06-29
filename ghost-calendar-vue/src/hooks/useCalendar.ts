import { ref } from "vue";

import { Calendar, CalendarPresenter, CalendarVM } from "core";

import type { DayType, LocaleType, Period } from "ghost-calendar";

type CalendarProps = {
  locale: LocaleType;
  nbMonths: number;
  rangeDates: Required<Period>[];
  checkIn: Date;
  checkOut: Date;
  visualMonth: number;
};

export const useCalendar = ({
  locale,
  nbMonths,
  rangeDates,
  checkIn,
  checkOut,
  visualMonth,
}: CalendarProps) => {
  const calendarState = ref<CalendarVM | null>(null);
  const presenter = new CalendarPresenter(locale);

  const calendar = new Calendar({
    nbMonths,
    rangeDates,
    checkIn,
    checkOut,
    visualMonth,
    bookingColors: { other: "#000000" },
  });

  calendar.build(presenter);

  const setPeriod = (day: DayType) => {
    if (calendarState.value) {
      calendar.setPeriod(
        presenter,
        day,
        calendarState.value.checkIn,
        calendarState.value.checkOut
      );

      presenter.subscribeVM((calendar) => {
        calendarState.value = { ...calendar };
      });
    }
  };

  const setPaginate = (operator: string) => {
    calendar.paginate(presenter, operator);

    presenter.subscribeVM((calendar) => {
      calendarState.value = { ...calendar };
    });
  };

  presenter.subscribeVM((calendar) => {
    calendarState.value = { ...calendar };
  });

  return {
    calendar: calendarState,
    setPeriod,
    setPaginate,
  };
};
