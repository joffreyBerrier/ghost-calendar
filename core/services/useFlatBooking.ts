import type { Booking, BookingColor, FlatBooking } from "../types";
import { getDatesBetweenTwoDates } from "../helpers";

export const useFlatBooking = (
  bookingDates: Booking[],
  bookingColor: BookingColor,
  formattingFormat: string
): FlatBooking[] => {
  const flatBookingDates: FlatBooking[] = [];
  const bookingTypeAndDates: {
    [key: string]: string[];
  } = {};

  bookingDates.forEach((booking: Booking) => {
    const flatBookingDatesString: string[] = getDatesBetweenTwoDates(
      new Date(booking.checkInDate),
      new Date(booking.checkOutDate),
      formattingFormat
    );

    if (booking.type) {
      if (bookingTypeAndDates[booking.type]) {
        bookingTypeAndDates[booking.type].push(...flatBookingDatesString);
      } else {
        bookingTypeAndDates[booking.type] = flatBookingDatesString;
      }
    }
  });

  const objectArray = Object.entries(bookingTypeAndDates) as unknown as [
    string,
    string[]
  ][];

  objectArray.forEach(([key, value]) => {
    flatBookingDates.push({
      color: bookingColor[key] || "#000000",
      key,
      value,
    });
  });

  return flatBookingDates;
};
