import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { DayType } from "../../core";
import { communStyleType } from "./types";

export const getCurrentDayColor = (day: DayType) => {
  if (day.isCurrentDay || day.isStartDate || day.isEndDate) {
    return { fontWeight: "bold" };
  }

  if (day.isPastDay) {
    return { color: "#aaaaaa" };
  }

  return {};
};

const selectStyleManager = (day: DayType) => {
  if (day.isRangeDate) {
    return style.ownerDayBooking;
  }

  if (day.bookingType && !day.isStartDate && !day.isEndDate) {
    return style[`${day.bookingType}DayBooking`];
  }

  return style.day;
};

export const styleSelector = (day: DayType, editMode?: boolean) => {
  if (Object.keys(day).length === 0) {
    return style.day;
  }

  if (day.isCurrentDay && !day.isBooking) {
    return style.dayCurrent;
  }

  if (editMode && !day.isBooking) {
    return selectStyleManager(day);
  }

  return editMode ? style.day : selectStyleManager(day);
};

const WIDTH = 50;

const communStyle: communStyleType = {
  width: "13%",
  height: WIDTH,
  flexDirection: "row",
  justifyContent: "center",
  fontSize: 16,
  paddingTop: "4.5%",
  margin: 1,
  color: "#202020",
};

export const getTypeColor = (
  type: "other" | "contract" | "option" | "owner",
  noLeftColor?: boolean,
  noRightColor?: boolean
): StyleProp<ViewStyle> => {
  const theme = {
    other: { start: "#D9E8B0", end: "#D9E8B0" },
    contract: { start: "#E2D1B5", end: "#E9DDC8" },
    option: { start: "transparent", end: "transparent" },
    owner: { start: "#B8DED7", end: "#B8DED7" },
  };

  const MARGIN = 0;

  if (theme[type]) {
    return {
      position: "absolute",
      zIndex: 2,
      top: MARGIN,
      left: MARGIN,
      right: MARGIN,
      borderTopWidth: WIDTH,
      borderRightWidth: WIDTH - 3,
      borderRightColor: noRightColor ? "transparent" : theme[type].start,
      borderLeftColor: noLeftColor ? "transparent" : theme[type].end,
      borderBottomColor: noRightColor ? "transparent" : theme[type].start,
      borderTopColor: noLeftColor ? "transparent" : theme[type].end,
    };
  }
};

export const style = StyleSheet.create({
  day: {
    ...communStyle,
  },
  ach: {
    width: "100%",
    height: WIDTH,
    position: "absolute",
    flexDirection: "row",
    top: 0,
    flexWrap: "wrap",
  },
  ach2: {
    width: "100%",
    height: WIDTH,
    position: "absolute",
    opacity: 0.5,
    zIndex: 3,
    flexDirection: "row",
    top: 0,
    flexWrap: "wrap",
  },
  dayCurrent: {
    ...communStyle,
    borderColor: "#decaaa",
  },
  otherDayBooking: {
    ...communStyle,
    borderColor: "#E9F1D1",
    backgroundColor: "#E9F1D1",
  },
  ownerDayBooking: {
    ...communStyle,
    borderColor: "#E3F2EF",
    backgroundColor: "#E3F2EF",
  },
  optionDayBooking: {
    ...communStyle,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  contractDayBooking: {
    ...communStyle,
    borderColor: "#F1E8DA",
    backgroundColor: "#F1E8DA",
  },
});
