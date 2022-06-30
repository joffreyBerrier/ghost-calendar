import { StyleSheet, Dimensions } from "react-native";

import { DayType } from "../../core";
import {
  communStyleType,
  leftBookingStyleType,
  rightBookingStyleType,
} from "./types";

const SMALL_PHONE = Dimensions.get("window").width <= 375;

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

const communStyle: communStyleType = {
  width: "13%",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: 12,
  paddingBottom: 12,
  fontSize: 16,
};

const rightBookingStyle: rightBookingStyleType = {
  flexDirection: "row",
  flexWrap: "wrap",
  right: 0,
  position: "absolute",
  top: 0,
  borderTopWidth: 41,
  borderRightWidth: SMALL_PHONE ? 49 : 51,
  borderRightColor: "transparent",
};

const leftBookingStyle: leftBookingStyleType = {
  flexDirection: "row",
  flexWrap: "wrap",
  left: 0,
  position: "absolute",
  top: 0,
  borderBottomWidth: 41,
  borderLeftWidth: SMALL_PHONE ? 49 : 51,
  borderLeftColor: "transparent",
};

export const style = StyleSheet.create({
  day: {
    width: "13%",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
  },
  ach: {
    width: SMALL_PHONE ? 49 : 50.6,
    height: SMALL_PHONE ? 41 : 41,
    position: "absolute",
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
    borderColor: "#EEEEEE",
    backgroundColor: "#EEEEEE",
  },
  contractDayBooking: {
    ...communStyle,
    borderColor: "#F1E8DA",
    backgroundColor: "#F1E8DA",
  },
  otherStartDate: {
    ...leftBookingStyle,
    borderBottomColor: "#AAAAAA",
  },
  otherEndDate: {
    ...rightBookingStyle,
    borderTopColor: "#CCCCCC",
  },
  ownerStartDate: {
    ...leftBookingStyle,
    borderBottomColor: "#AEC1C1",
  },
  ownerEndDate: {
    ...rightBookingStyle,
    borderTopColor: "#C2D1D1",
  },
  optionStartDate: {
    ...leftBookingStyle,
    borderBottomColor: "#EEEEEE",
  },
  optionEndDate: {
    ...rightBookingStyle,
    borderTopColor: "#E6E6E6",
  },
  contractStartDate: {
    ...leftBookingStyle,
    borderBottomColor: "#E2D1B5",
  },
  contractEndDate: {
    ...rightBookingStyle,
    borderTopColor: "#E9DDC8",
  },
});
