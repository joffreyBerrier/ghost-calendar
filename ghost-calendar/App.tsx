import { View } from "react-native";
import { CalendarComponent } from "./react-native/components";

export default function App() {
  return (
    <View>
      <CalendarComponent
        bookingDayHandler={(day) => {
          /* Return booking day information on click */
        }}
        rangeMarkerHanlder={(range) => {
          /* return range date selected on click */
        }}
        locale="en"
        startDate={new Date()}
        endDate={new Date(new Date().getFullYear() + 2, 0, 1)}
        checkIn={new Date("2022-09-01")}
        checkOut={new Date("2022-09-10")}
        visualMonth={2}
        rangeDates={[]}
        bookingColors={{ other: { startEnd: "#00FF00", beetween: "#FF0FF0" } }}
        withInteraction
      />
    </View>
  );
}
