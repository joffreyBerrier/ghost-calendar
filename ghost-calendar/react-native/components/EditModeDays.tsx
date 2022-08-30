import { memo, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

import { styleSelector } from "./style";
import { DayComponentType, CheckMarker } from "./Days";
import { CurrentDayPointer } from "./CurrentDayPointer";

import { DayType } from "../../core/helpers/types";
import { CalendarVM } from "../../core";

const isDisableDay = (day: DayType) => {
  return (
    day.isPastDay ||
    (day.isBooking && !day.isEndDate && !day.isStartDate) ||
    (day.isBooking && day.isEndDate && day.isStartDate)
  );
};

export const EditModeDays = memo(
  ({
    bookingDayHandler,
    days,
    setPeriod,
  }: Omit<DayComponentType, "withInteraction">) => {
    const onPress = (day: DayType) => {
      if (day.day) {
        if (day.isBooking && bookingDayHandler) bookingDayHandler(day);

        setPeriod(day);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    };

    const renderDays = useMemo(
      () =>
        days.map((day, idx) => (
          <Pressable
            onPress={() => onPress(day)}
            style={styleSelector(day, true)}
            key={`${day.day}${idx}`}
          >
            <CheckMarker day={day} days={days} index={idx} editMode />
            {day.isCurrentDay && <CurrentDayPointer />}
            <Text
              style={{
                color: isDisableDay(day) ? "#aaaaaa" : "#000",
                textDecorationLine: isDisableDay(day) ? "line-through" : "none",
                zIndex: 3,
              }}
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
