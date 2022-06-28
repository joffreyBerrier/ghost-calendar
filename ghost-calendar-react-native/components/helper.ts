import { DayType } from "ghost-calendar";

export const getPreviousDay = (days: DayType[], index: number) => {
  return days[index - 1];
};

export const getNextDay = (days: DayType[], index: number) => {
  return days[index + 1];
};

export const periodHasNotEnDate = (day: DayType) =>
  day.isStartDate && !day.isEndDate;

export const periodHasNotStartDate = (day: DayType) =>
  !day.isStartDate && day.isEndDate;

export const periodHasCompleted = (day: DayType) =>
  day.isStartDate && day.isEndDate;
