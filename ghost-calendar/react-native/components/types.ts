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
  paddingTop: number;
  paddingBottom: number;
  fontSize: number;
};

export type rightBookingStyleType = {
  flexDirection: flexDirectionType;
  flexWrap: flexWrapType;
  right: number;
  position: positionType;
  top: number;
  borderTopWidth: number;
  borderRightWidth: number;
  borderRightColor: string;
};

export type leftBookingStyleType = {
  flexDirection: flexDirectionType;
  flexWrap: flexWrapType;
  left: number;
  position: positionType;
  top: number;
  borderBottomWidth: number;
  borderLeftWidth: number;
  borderLeftColor: string;
};
