import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { Calendar } from "../../core/calendar";

const days = [
  { key: 1, name: "Mo" },
  { key: 2, name: "Tu" },
  { key: 3, name: "We" },
  { key: 4, name: "Th" },
  { key: 5, name: "Fr" },
  { key: 6, name: "Sa" },
  { key: 0, name: "Su" },
];

const dayStyle = () => ({
  marginTop: 12,
  width: "22%",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "white",
  paddingStart: 16,
  paddingEnd: 16,
  paddingTop: 8,
  marginRight: 10,
  paddingBottom: 8,
  borderRadius: 8,
});

export default function App() {
  const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
  const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
  const calendar = new Calendar(startDate, endDate, true);

  const [vm, setVM] = useState(calendar.vm);

  const [color, setColor] = useState(null);

  const updater = (day) => {
    if (color !== day) setColor(day);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {vm.months.slice(27, 29).map((month) => (
          <View key={month.monthKey}>
            <Text style={styles.months}>{month.monthName}</Text>

            <View style={styles.days}>
              {/* {days.map((day) => (
                <View key={day.name}>
                  <Text>{day.name}</Text>
                </View>
              ))} */}

              {month.days.map((day) => {
                const startEndColor =
                  day.isCheckIn || day.isCheckOut ? "red" : "white";
                const betweenColor = "";
                return (
                  <Pressable
                    onPress={() => {
                      calendar.clickOnCalendar(day);
                      updater(day);
                    }}
                    key={day.date}
                    style={[
                      styles.day,
                      {
                        backgroundColor: startEndColor,
                      },
                    ]}
                  >
                    {day.belongsToThisMonth && <Text>{day.dayNumber}</Text>}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  months: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    marginTop: 12,
    width: "22%",
    flexDirection: "row",
    justifyContent: "center",
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    marginRight: 10,
    paddingBottom: 8,
    borderRadius: 8,
  },
});
