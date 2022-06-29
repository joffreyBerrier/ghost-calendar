import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { DayType, LocaleType, Period } from "ghost-calendar";

import { useStyle } from "../hooks/useStyle";

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
  paginateIndex: number;
  rangeDates: Required<Period>[];
  visualMonth: number;
};

const CalendarComponent = ({
  bookingDayHandler,
  locale,
  rangeDates,
  rangeMarkerHanlder,
  withInteraction,
  startDate,
  endDate,
  paginateIndex,
  visualMonth,
}: CalendarComponentType) => {
  const style = useStyle();
  const { calendar, setPeriod } = useCalendar({
    locale,
    startDate,
    endDate,
    rangeDates,
    paginateIndex,
    visualMonth,
  });

  if (!calendar) {
    return (
      <View style={style("flex-1 justify-center items-center")}>
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
    <View style={style("flex justify-center")}>
      <ScrollView>
        {calendar.months.map((month, idx) => (
          <View key={`${month.id}${idx}`}>
            <View style={style("mb-8 mt-10 pl-7")}>
              <Text style={style("font-bold text-base")}>
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
