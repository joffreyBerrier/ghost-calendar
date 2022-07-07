import { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
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
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const currentMonth = new Date().getMonth();

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

  const showScrollingToIndex = () => {
    if (ref.current && ref.current.scrollToIndex) {
      ref.current?.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIndex(currentMonth);
      showScrollingToIndex();
    }, 500);

    return () => {
      setIndex(0);
    };
  }, []);

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
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        onScrollToIndexFailed={() => {
          showScrollingToIndex();
        }}
        data={calendar.months}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: month, index }) => (
          <View key={`${month.id}${index}`}>
            <View style={{ marginBottom: 10, marginTop: 25, paddingLeft: 28 }}>
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

            {index !== calendar.months.length - 1 && <Separator />}
          </View>
        )}
      />
    </View>
  );
};

export default CalendarComponent;
