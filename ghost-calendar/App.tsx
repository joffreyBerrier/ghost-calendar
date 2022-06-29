import { View } from "react-native";
import { CalendarComponent, rangeDates } from "./react-native/components";

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
        locale="fr"
        startDate={new Date()}
        endDate={new Date(new Date().getFullYear() + 2, 0, 1)}
        visualMonth={12}
        rangeDates={rangeDates}
        withInteraction
      />
    </View>
  );
}
