import { memo } from "react";
import { View, Text } from "react-native";
import { LocaleType } from "ghost-calendar";

import { useStyle } from "../hooks/useStyle";

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
  const style = useStyle();

  return (
    <View style={style("flex-row flex-wrap justify-center w-full")}>
      {getWeekName(locale).map((week) => (
        <View key={week.id} style={customStyle.day}>
          <Text style={style("text-gray-400")}>
            {week.name.toLocaleUpperCase()}
          </Text>
        </View>
      ))}
    </View>
  );
});
