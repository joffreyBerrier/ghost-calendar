import { memo } from "react";
import { View, Image } from "react-native";
import { DayType } from "../../core";

import { style, getTypeColor } from "./style";

export const CheckIn = memo(({ day }: { day: DayType }) => {
  if (day.bookingType) {
    return (
      <>
        {day.bookingType === "option" && (
          <Image source={require("./optionLeft.png")} style={style.ach2} />
        )}
        <View style={getTypeColor(day.bookingType, true, false)} />
      </>
    );
  }

  return <View style={getTypeColor("owner", true, false)} />;
});

export const CheckOut = memo(({ day }: { day: DayType }) => {
  if (day.bookingType) {
    return (
      <>
        {day.bookingType === "option" && (
          <Image source={require("./optionRight.png")} style={style.ach2} />
        )}
        <View style={getTypeColor(day.bookingType, false, true)} />
      </>
    );
  }

  return <View style={getTypeColor("owner", false, true)} />;
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
        {yesterday.bookingType === "option" && (
          <Image source={require("./optionLeft.png")} style={style.ach2} />
        )}
        {tomorrow.bookingType === "option" && (
          <Image source={require("./optionRight.png")} style={style.ach2} />
        )}
        <View style={getTypeColor(yesterday.bookingType)} />
        <View style={getTypeColor(yesterday.bookingType)} />
      </>
    );
  }

  if (!yesterday.bookingType && tomorrow.bookingType) {
    return (
      <>
        {tomorrow.bookingType === "option" && (
          <Image source={require("./optionLeft.png")} style={style.ach2} />
        )}
        <View style={getTypeColor(tomorrow.bookingType, true, false)} />
        <View style={getTypeColor("owner", false, true)} />
      </>
    );
  }

  if (yesterday.bookingType && !tomorrow.bookingType) {
    return (
      <>
        {yesterday.bookingType === "option" && (
          <Image source={require("./optionRight.png")} style={style.ach2} />
        )}
        <View style={getTypeColor(yesterday.bookingType, false, true)} />
        <View style={getTypeColor("owner", true, false)} />
      </>
    );
  }

  return null;
};
