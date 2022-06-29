import { memo } from "react";
import { View } from "react-native";
import { DayType } from "../../core";

import { style } from "./style";

export const CheckIn = memo(({ day }: { day: DayType }) => {
  switch (day.bookingType) {
    case "other":
      return <View style={style.startDateOther} />;
    case "option":
      return <View style={style.startDateOption} />;
    case "contract":
      return <View style={style.startDateContract} />;
    default:
      return <View style={style.startDateOwner} />;
  }
});

export const CheckOut = memo(({ day }: { day: DayType }) => {
  switch (day.bookingType) {
    case "other":
      return <View style={style.endDateOther} />;
    case "option":
      return <View style={style.endDateOption} />;
    case "contract":
      return <View style={style.endDateContract} />;
    default:
      return <View style={style.endDateOwner} />;
  }
});

export const CheckInCheckOut = ({
  tomorrow,
  yesterday,
}: {
  yesterday: DayType;
  tomorrow: DayType;
}) => {
  if (tomorrow.bookingType === "owner" && yesterday.bookingType === "other") {
    return (
      <>
        <View style={style.endDateOther} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "owner" &&
    yesterday.bookingType === "contract"
  ) {
    return (
      <>
        <View style={style.endDateContract} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (tomorrow.bookingType === "other" && yesterday.bookingType === "owner") {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOther} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "other" &&
    yesterday.bookingType === "contract"
  ) {
    return (
      <>
        <View style={style.endDateContract} />
        <View style={style.startDateOther} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "contract" &&
    yesterday.bookingType === "contract"
  ) {
    return (
      <>
        <View style={style.endDateContract} />
        <View style={style.startDateContract} />
      </>
    );
  }

  if (tomorrow.bookingType === "owner" && yesterday.bookingType === "option") {
    return (
      <>
        <View style={style.endDateOption} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (tomorrow.bookingType === "option" && yesterday.bookingType === "owner") {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOption} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "contract" &&
    yesterday.bookingType === "other"
  ) {
    return (
      <>
        <View style={style.endDateOther} />
        <View style={style.startDateContract} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "contract" &&
    yesterday.bookingType === "option"
  ) {
    return (
      <>
        <View style={style.endDateOption} />
        <View style={style.startDateContract} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "contract" &&
    yesterday.bookingType === "owner"
  ) {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateContract} />
      </>
    );
  }

  if (
    tomorrow.bookingType === "option" &&
    yesterday.bookingType === "contract"
  ) {
    return (
      <>
        <View style={style.endDateContract} />
        <View style={style.startDateOption} />
      </>
    );
  }

  if (tomorrow.bookingType === "other" && !yesterday.bookingType) {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOther} />
      </>
    );
  }

  if (tomorrow.bookingType === "owner" && !yesterday.bookingType) {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (tomorrow.bookingType === "contract" && !yesterday.bookingType) {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateContract} />
      </>
    );
  }

  if (!tomorrow.bookingType && yesterday.bookingType === "other") {
    return (
      <>
        <View style={style.endDateOther} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (!tomorrow.bookingType && yesterday.bookingType === "contract") {
    return (
      <>
        <View style={style.endDateContract} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (!tomorrow.bookingType && yesterday.bookingType === "owner") {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  if (tomorrow.bookingType === "option" && !yesterday.bookingType) {
    return (
      <>
        <View style={style.endDateOwner} />
        <View style={style.startDateOption} />
      </>
    );
  }

  if (!tomorrow.bookingType && yesterday.bookingType === "option") {
    return (
      <>
        <View style={style.endDateOption} />
        <View style={style.startDateOwner} />
      </>
    );
  }

  return null;
};
