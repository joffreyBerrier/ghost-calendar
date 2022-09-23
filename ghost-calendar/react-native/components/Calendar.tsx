import { useEffect } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { BookingColorType, DayType, LocaleType, Period } from "../../core";

import { useCalendar } from "../hooks/useCalendar";

import { RangeType } from "./types";
import { Month } from "./Month";

type CalendarComponentType = {
  bookingColors?: BookingColorType;
  bookingDayHandler?: (day: DayType) => void;
  checkIn?: Date;
  checkOut?: Date;
  editMode?: boolean;
  endDate: Date;
  locale?: LocaleType;
  rangeDates: Required<Period>[];
  rangeMarkerHandler?: (info: RangeType) => void;
  startDate: Date;
  visualMonth: number;
  withInteraction?: boolean;
};

const CalendarComponent = ({
  bookingColors = {},
  bookingDayHandler,
  checkIn,
  checkOut,
  editMode = false,
  endDate,
  locale,
  rangeDates,
  rangeMarkerHandler,
  startDate,
  visualMonth,
  withInteraction = false,
}: CalendarComponentType) => {
  const { calendar, setPeriod, resetCalendar } = useCalendar({
    bookingColors,
    checkIn,
    checkOut,
    endDate,
    locale,
    rangeDates,
    startDate,
    visualMonth,
  });

  useEffect(() => {
    if (rangeMarkerHandler && calendar?.checkIn && calendar?.checkOut) {
      rangeMarkerHandler({
        startDate: calendar.checkIn,
        endDate: calendar.checkOut,
        resetCalendar: () => resetCalendar(),
      });
    }
  }, [calendar]);

  if (!calendar) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 12,
        marginRight: 12,
        height: "100%",
      }}
    >
      <FlatList
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        data={calendar.months}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: month, index }) => (
          <Month
            month={month}
            index={index}
            locale={locale}
            editMode={editMode}
            bookingDayHandler={bookingDayHandler}
            setPeriod={setPeriod}
            withInteraction={withInteraction}
            calendar={calendar}
          />
        )}
      />
    </View>
  );
};

export default CalendarComponent;
