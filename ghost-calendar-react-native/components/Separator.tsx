import { memo } from "react";
import { View } from "react-native";

import { useStyle } from "../hooks/useStyle";

export const Separator = memo(() => {
  const style = useStyle();

  return (
    <View
      style={[
        style("border border-gray-200 flex justify-center"),
        { width: "90%", marginLeft: 20 },
      ]}
    />
  );
});
