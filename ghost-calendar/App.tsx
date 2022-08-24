import { useState } from "react";
import { View, Button } from "react-native";
import {
  CalendarComponent,
  rangeDates,
  RangeType,
} from "./react-native/components";

export default function App() {
  const [showRange, setShowRange] = useState<RangeType | null>(null);

  return (
    <View>
      <CalendarComponent
        rangeMarkerHandler={(range) => {
          if (range) setShowRange(range);
        }}
        locale="fr"
        startDate={new Date(new Date().getFullYear(), 0, 1)}
        endDate={new Date(new Date().getFullYear() + 2, 0, 1)}
        visualMonth={24}
        rangeDates={rangeDates}
      />
      {showRange && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 50,
            backgroundColor: "#fff",
            bottom: 0,
          }}
        >
          <Button
            title="Reset Calendar"
            onPress={() => {
              showRange.resetCalendar();
              setShowRange(null);
            }}
          />
        </View>
      )}
    </View>
  );
}
