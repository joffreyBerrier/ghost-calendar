import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { BookingColorType, DayType, LocaleType, Period } from "../../core";

import { useCalendar } from "../hooks/useCalendar";

import { Days } from "./Days";
import { Separator } from "./Separator";
import { Week } from "./Week";

type CalendarComponentType = {
  bookingDayHandler: (day: DayType) => void;
  locale?: LocaleType;
  rangeMarkerHanlder: (day: { startDate: string; endDate: string }) => void;
  withInteraction: boolean;
  startDate: Date;
  endDate: Date;
  checkIn?: Date;
  checkOut?: Date;
  rangeDates: Required<Period>[];
  visualMonth: number;
  bookingColors?: BookingColorType;
};

const CalendarComponent = ({
  bookingDayHandler,
  locale,
  rangeDates,
  rangeMarkerHanlder,
  withInteraction,
  startDate,
  endDate,
  visualMonth,
  checkIn,
  checkOut,
  bookingColors = {},
}: CalendarComponentType) => {
  const { calendar, setPeriod } = useCalendar({
    bookingColors,
    checkIn,
    checkOut,
    endDate,
    locale,
    rangeDates,
    startDate,
    visualMonth,
  });

  if (!calendar) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (calendar.checkIn && calendar.checkIn) {
    rangeMarkerHanlder({
      startDate: calendar.checkIn,
      endDate: calendar.checkOut,
    });
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <ScrollView>
        {calendar.months.map((month, idx) => (
          <View key={`${month.id}${idx}`}>
            <View style={{ marginBottom: 32, marginTop: 40, paddingLeft: 28 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, lineHeight: 24 }}
              >
                {month.monthName}
              </Text>
            </View>
            <Week locale={locale} />
            <Days
              bookingDayHandler={bookingDayHandler}
              days={month.days}
              setPeriod={setPeriod}
              withInteraction={withInteraction}
            />

            {idx !== calendar.months.length - 1 && <Separator />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CalendarComponent;
