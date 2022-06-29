import { memo } from "react";
import { View } from "react-native";
import { DayType } from "../../core";

import { style } from "./style";

export const CheckIn = memo(({ day }: { day: DayType }) => {
  if (day.bookingType) {
    return <View style={style[`${day.bookingType}StartDate`]} />;
  }

  return <View style={style.ownerStartDate} />;
});

export const CheckOut = memo(({ day }: { day: DayType }) => {
  if (day.bookingType) {
    return <View style={style[`${day.bookingType}EndDate`]} />;
  }

  return <View style={style.ownerEndDate} />;
});

export const CheckInCheckOut = ({
  tomorrow,
  yesterday,
}: {
  yesterday: DayType;
  tomorrow: DayType;
}) => {
  if (yesterday.bookingType && tomorrow.bookingType) {
    return (
      <>
        <View style={style[`${yesterday.bookingType}EndDate`]} />
        <View style={style[`${tomorrow.bookingType}StartDate`]} />
      </>
    );
  }

  if (!yesterday.bookingType && tomorrow.bookingType) {
    return (
      <>
        <View style={style[`${tomorrow.bookingType}StartDate`]} />
        <View style={style.ownerEndDate} />
      </>
    );
  }

  if (yesterday.bookingType && !tomorrow.bookingType) {
    return (
      <>
        <View style={style[`${yesterday.bookingType}EndDate`]} />
        <View style={style.ownerStartDate} />
      </>
    );
  }

  return null;
};
