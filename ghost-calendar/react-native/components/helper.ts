import { DayType } from "../../core";

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

export const hasScrollToDown = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: {
  layoutMeasurement: { height: number };
  contentOffset: { y: number };
  contentSize: { height: number };
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
