import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

export const HalfDaySeparator = () => (
  <View
    style={{
      position: "absolute",
      zIndex: 3,
    }}
  >
    <Svg height="50" width="50">
      <Line x1="50" y1="0" x2="0" y2="52" stroke="white" strokeWidth="2" />
    </Svg>
  </View>
);
