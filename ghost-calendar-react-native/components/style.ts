import { StyleSheet, Dimensions } from "react-native";

import { DayType, TypeBookingFormatted } from "ghost-calendar";
import {
  communStyleType,
  leftBookingStyleType,
  rightBookingStyleType,
} from "./types";

const SMALL_PHONE = Dimensions.get("window").width <= 375;

const hasBookingCondition = (day: DayType, type: TypeBookingFormatted) => {
  return (
    day.isBooking &&
    !day.isStartDate &&
    !day.isEndDate &&
    day.bookingType === type
  );
};

export const getCurrentDayColor = (day: DayType) => {
  if (day.isCurrentDay || day.isStartDate || day.isEndDate) {
    return "font-bold";
  }

  if (day.isPastDay) {
    return "text-gray-400";
  }

  return "";
};

const selectStyleManager = (day: DayType) => {
  if (hasBookingCondition(day, "other")) {
    return style.dayBookingOther;
  }

  if (hasBookingCondition(day, "owner")) {
    return style.dayBookingOwner;
  }

  if (hasBookingCondition(day, "option")) {
    return style.dayBookingOption;
  }

  if (hasBookingCondition(day, "contract")) {
    return style.dayBookingContract;
  }

  if (day.isBookingMarker) {
    return style.dayBookingOwner;
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

  if (day.isCurrentDay && day.isBooking) {
    return selectStyleManager(day);
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
  borderRightWidth: SMALL_PHONE ? 49 : 54,
  borderRightColor: "transparent",
};

const leftBookingStyle: leftBookingStyleType = {
  flexDirection: "row",
  flexWrap: "wrap",
  left: 0,
  position: "absolute",
  top: 0,
  borderBottomWidth: 41,
  borderLeftWidth: SMALL_PHONE ? 49 : 54,
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
    width: SMALL_PHONE ? 49 : 54,
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
  dayBookingOther: {
    ...communStyle,
    borderColor: "#DDDDDD",
    backgroundColor: "#DDDDDD",
  },
  dayBookingOwner: {
    ...communStyle,
    borderColor: "#D7E0E0",
    backgroundColor: "#D7E0E0",
  },
  dayBookingOption: {
    ...communStyle,
    borderColor: "#EEEEEE",
    backgroundColor: "#EEEEEE",
  },
  dayBookingContract: {
    ...communStyle,
    borderColor: "#F1E8DA",
    backgroundColor: "#F1E8DA",
  },
  startDateOther: {
    ...leftBookingStyle,
    borderBottomColor: "#AAAAAA",
  },
  endDateOther: {
    ...rightBookingStyle,
    borderTopColor: "#CCCCCC",
  },

  startDateOwner: {
    ...leftBookingStyle,
    borderBottomColor: "#AEC1C1",
  },
  endDateOwner: {
    ...rightBookingStyle,
    borderTopColor: "#C2D1D1",
  },
  startDateOption: {
    ...leftBookingStyle,
    borderBottomColor: "#EEEEEE",
  },
  endDateOption: {
    ...rightBookingStyle,
    borderTopColor: "#E6E6E6",
  },
  startDateContract: {
    ...leftBookingStyle,
    borderBottomColor: "#E2D1B5",
  },
  endDateContract: {
    ...rightBookingStyle,
    borderTopColor: "#E9DDC8",
  },
});
