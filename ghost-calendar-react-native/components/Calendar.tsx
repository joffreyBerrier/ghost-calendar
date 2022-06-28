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
  nbMonths: number;
  rangeDates: Required<Period>[];
  rangeMarkerHanlder: (day: { startDate: string; endDate: string }) => void;
  withInteraction: boolean;
};

const CalendarComponent = ({
  bookingDayHandler,
  locale,
  nbMonths,
  rangeDates,
  rangeMarkerHanlder,
  withInteraction,
}: CalendarComponentType) => {
  const style = useStyle();
  const { calendar, setPeriod } = useCalendar({ locale, nbMonths, rangeDates });

  if (!calendar) {
    return (
      <View style={style("flex-1 justify-center items-center")}>
        <ActivityIndicator />
      </View>
    );
  }

  if (calendar.startDate && calendar.endDate) {
    rangeMarkerHanlder({
      startDate: calendar.startDate,
      endDate: calendar.endDate,
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
