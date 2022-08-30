import { memo } from "react";
import { View, Image } from "react-native";

import { DayType } from "../../core";

import { style, getTypeColor } from "./style";
import { HalfDaySeparator } from "./HalfDaySeparator";

export const CheckIn = memo(
  ({ day, editMode }: { day: DayType; editMode?: boolean }) => {
    if (day.bookingType) {
      return (
        <>
          {day.bookingType === "option" && !editMode && (
            <Image source={require("./optionLeft.png")} style={style.ach2} />
          )}
          {!editMode && (
            <View style={getTypeColor(day.bookingType, true, false)} />
          )}
        </>
      );
    }

    return <View style={getTypeColor("owner", true, false)} />;
  }
);

export const CheckOut = memo(
  ({ day, editMode }: { day: DayType; editMode?: boolean }) => {
    if (day.bookingType) {
      return (
        <>
          {day.bookingType === "option" && !editMode && (
            <Image source={require("./optionRight.png")} style={style.ach2} />
          )}
          {!editMode && (
            <View style={getTypeColor(day.bookingType, false, true)} />
          )}
        </>
      );
    }

    return <View style={getTypeColor("owner", false, true)} />;
  }
);

export const CheckInCheckOut = ({
  tomorrow,
  yesterday,
  editMode,
}: {
  yesterday: DayType;
  tomorrow: DayType;
  editMode?: boolean;
}) => {
  if (yesterday.bookingType && tomorrow.bookingType) {
    return !editMode ? (
      <>
        {yesterday.bookingType === "option" && (
          <Image source={require("./optionRight.png")} style={style.ach2} />
        )}
        {tomorrow.bookingType === "option" && (
          <Image source={require("./optionLeft.png")} style={style.ach2} />
        )}
        <HalfDaySeparator />
        <View style={getTypeColor(yesterday.bookingType, false, true)} />
        <View style={getTypeColor(tomorrow.bookingType, true, false)} />
      </>
    ) : null;
  }

  if (!yesterday.bookingType && tomorrow.bookingType) {
    return (
      <>
        {tomorrow.bookingType === "option" && !editMode && (
          <Image source={require("./optionLeft.png")} style={style.ach2} />
        )}
        <HalfDaySeparator />
        {!editMode && (
          <View style={getTypeColor(tomorrow.bookingType, true, false)} />
        )}
        <View style={getTypeColor("owner", false, true)} />
      </>
    );
  }

  if (yesterday.bookingType && !tomorrow.bookingType) {
    return (
      <>
        {yesterday.bookingType === "option" && !editMode && (
          <Image source={require("./optionRight.png")} style={style.ach2} />
        )}
        <HalfDaySeparator />
        {!editMode && (
          <View style={getTypeColor(yesterday.bookingType, false, true)} />
        )}
        <View style={getTypeColor("owner", true, false)} />
      </>
    );
  }

  return null;
};
