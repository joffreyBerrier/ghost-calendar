import { memo, useMemo } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { DayType } from "../../core";
import * as Haptics from "expo-haptics";

import { useStyle } from "../hooks/useStyle";

import {
  getNextDay,
  getPreviousDay,
  periodHasCompleted,
  periodHasNotEnDate,
  periodHasNotStartDate,
} from "./helper";

import {
  getCurrentDayColor,
  styleSelector,
  style as calendarStyle,
} from "./style";
import { CheckIn, CheckOut, CheckInCheckOut } from "./PeriodDelimiter";

type DayComponentType = {
  bookingDayHandler: (day: DayType) => void;
  days: DayType[];
  setPeriod: (day: DayType) => void;
  withInteraction: boolean;
};

type CheckMarkerType = {
  day: DayType;
  days: DayType[];
  index: number;
};

const CheckMarker = memo(({ day, days, index }: CheckMarkerType) => {
  if (periodHasNotEnDate(day)) {
    return <CheckIn day={day} />;
  }

  if (periodHasNotStartDate(day)) {
    return <CheckOut day={day} />;
  }

  if (periodHasCompleted(day)) {
    return (
      <CheckInCheckOut
        yesterday={getPreviousDay(days, index)}
        tomorrow={getNextDay(days, index)}
      />
    );
  }

  return null;
});

export const Days = memo(
  ({
    bookingDayHandler,
    days,
    setPeriod,
    withInteraction,
  }: DayComponentType) => {
    const style = useStyle();

    const onPress = (day: DayType) => {
      if (withInteraction && day.day) {
        if (day.isBooking) bookingDayHandler(day);

        setPeriod(day);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    };

    const renderDays = useMemo(
      () =>
        days.map((day, idx) => (
          <Pressable
            onPress={() => onPress(day)}
            style={styleSelector(day)}
            key={`${day.day}${idx}`}
          >
            <CheckMarker day={day} days={days} index={idx} />
            {day.bookingType === "option" &&
              !day.isStartDate &&
              !day.isEndDate && (
                <Image
                  source={require("./option.png")}
                  style={calendarStyle.ach}
                />
              )}
            <Text
              style={[
                style(getCurrentDayColor(day)),
                {
                  textDecorationLine: day.isPastDay ? "line-through" : "none",
                },
              ]}
            >
              {day.dayNumber}
            </Text>
          </Pressable>
        )),
      [days]
    );

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {renderDays}
      </View>
    );
  }
);
