export type justifyContentType =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | undefined;

export type flexDirectionType =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse"
  | undefined;

export type flexWrapType = "wrap" | "nowrap" | "wrap-reverse" | undefined;

export type positionType = "absolute" | "relative" | undefined;

export type communStyleType = {
  width: string;
  flexDirection: flexDirectionType;
  justifyContent: justifyContentType;
  paddingTop: string;
  height: number;
  fontSize: number;
  margin: number;
  color: string;
};

export type RangeType = {
  startDate: string;
  endDate: string;
  resetCalendar: () => void;
};
