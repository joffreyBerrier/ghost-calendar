import { useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { BookingColorType, DayType, LocaleType, Period } from "../../core";

import { useCalendar } from "../hooks/useCalendar";

import { Days } from "./Days";
import { EditModeDays } from "./EditModeDays";
import { Separator } from "./Separator";
import { RangeType } from "./types";
import { Week } from "./Week";

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
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={calendar.months}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: month, index }) => (
          <View key={`${month.id}${index}`}>
            <View style={{ marginBottom: 10, marginTop: 25, paddingLeft: 19 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, lineHeight: 24 }}
              >
                {month.monthName}
              </Text>
            </View>
            <Week locale={locale} />
            {editMode ? (
              <EditModeDays
                bookingDayHandler={bookingDayHandler}
                days={month.days}
                setPeriod={setPeriod}
              />
            ) : (
              <Days
                bookingDayHandler={bookingDayHandler}
                days={month.days}
                setPeriod={setPeriod}
                withInteraction={withInteraction}
              />
            )}

            {index !== calendar.months.length - 1 && <Separator />}
          </View>
        )}
      />
    </View>
  );
};

export default CalendarComponent;
