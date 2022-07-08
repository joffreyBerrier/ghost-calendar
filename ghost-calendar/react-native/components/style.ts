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

export const styleSelector = (day: DayType) => {
  if (Object.keys(day).length === 0) {
    return style.day;
  }

  if (day.isCurrentDay && !day.isBooking) {
    return style.dayCurrent;
  }

  return selectStyleManager(day);
};

const WIDTH = 50;

const communStyle: communStyleType = {
  width: "13%",
  height: WIDTH,
  flexDirection: "row",
  justifyContent: "center",
  fontSize: 16,
  paddingTop: "4.2%",
  margin: 2,
};

export const getTypeColor = (
  type: "other" | "contract" | "option" | "owner",
  noLeftColor?: boolean,
  noRightColor?: boolean
): StyleProp<ViewStyle> => {
  const theme = {
    other: { start: "#AAAAAA", end: "#CCCCCC" },
    contract: { start: "#E2D1B5", end: "#E9DDC8" },
    option: { start: "transparent", end: "transparent" },
    owner: { start: "#AEC1C1", end: "#C2D1D1" },
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
      borderRightWidth: WIDTH,
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
    zIndex: 2,
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
    borderColor: "#DDDDDD",
    backgroundColor: "#DDDDDD",
  },
  ownerDayBooking: {
    ...communStyle,
    borderColor: "#D7E0E0",
    backgroundColor: "#D7E0E0",
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
