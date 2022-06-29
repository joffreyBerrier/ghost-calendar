import { memo } from "react";
import { View, Text } from "react-native";
import { LocaleType } from "../../core";

import { style as customStyle } from "./style";

const getWeekName = (locale?: LocaleType) => [
  { id: 1, name: locale === "fr" ? "Lun" : "Mo" },
  { id: 2, name: locale === "fr" ? "Mar" : "Tu" },
  { id: 3, name: locale === "fr" ? "Mer" : "We" },
  { id: 4, name: locale === "fr" ? "Jeu" : "Th" },
  { id: 5, name: locale === "fr" ? "Ven" : "Fr" },
  { id: 6, name: locale === "fr" ? "Sam" : "Sa" },
  { id: 7, name: locale === "fr" ? "Dim" : "Su" },
];

export const Week = memo(({ locale }: { locale?: LocaleType }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {getWeekName(locale).map((week) => (
        <View key={week.id} style={customStyle.day}>
          <Text style={{ color: "#aaaaaa" }}>
            {week.name.toLocaleUpperCase()}
          </Text>
        </View>
      ))}
    </View>
  );
});
