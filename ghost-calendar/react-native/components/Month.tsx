import { memo } from "react";
import { View, Text } from "react-native";
import { CalendarVM, DayType, LocaleType, MonthType } from "../../core";

import { Days } from "./Days";
import { EditModeDays } from "./EditModeDays";
import { Separator } from "./Separator";
import { Week } from "./Week";

export const Month = memo(
  ({
    month,
    index,
    locale,
    editMode,
    bookingDayHandler,
    setPeriod,
    withInteraction,
    calendar,
  }: {
    month: MonthType;
    index: number;
    locale?: LocaleType;
    editMode: boolean;
    bookingDayHandler?: (day: DayType) => void;
    setPeriod: (day: DayType) => void;
    withInteraction: boolean;
    calendar: CalendarVM;
  }) => (
    <View key={`${month.id}${index}`}>
      <View style={{ marginBottom: 10, marginTop: 25, paddingLeft: 19 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: 24,
            color: "#202020",
          }}
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
  )
);
