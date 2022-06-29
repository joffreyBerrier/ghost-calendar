import type { DayType } from "ghost-calendar";
import { dayFormatter } from "core";

export const getPreviousDay = (days: DayType[], index: number) => {
  return days[index - 1];
};

export const getNextDay = (days: DayType[], index: number) => {
  return days[index + 1];
};

export const periodHasNotEnDate = (day: DayType) => {
  day.isStartDate && !day.isEndDate;
};

export const periodHasNotStartDate = (day: DayType) => {
  !day.isStartDate && day.isEndDate;
};

export const periodHasCompleted = (day: DayType) => {
  day.isStartDate && day.isEndDate;
};

export const getDatesBetweenTwoDates = (
  startDate: string,
  endDate: string | undefined
): string[] => {
  const arr = [];

  for (
    let dt = new Date(startDate);
    dt <= new Date(endDate);
    dt.setDate(dt.getDate() + 1)
  ) {
    const formatDay = dayFormatter(new Date(dt), "yyyy-MM-dd");

    arr.push(formatDay);
  }

  return arr;
};
