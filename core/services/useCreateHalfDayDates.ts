import type {
  Booking,
  BookingColor,
  CheckInCheckOutHalfDay,
  FlatBooking,
} from "../types";
import {
  getDayDiff,
  getDatesBetweenTwoDates,
  sortDates,
  sortDatesObj,
} from "../helpers";

const createHalfDayDatesWithBookedDates = (
  dates: string[]
): {
  checkIncheckOutHalfDay: CheckInCheckOutHalfDay;
  bookedDates: string[];
} => {
  const checkIncheckOutHalfDay: CheckInCheckOutHalfDay = {};
  const bookedDates = sortDates([...dates]) as string[];

  for (let i = 0; i < bookedDates.length; i++) {
    const newDate = bookedDates[i] as string;
    const newDateIncrementOne = bookedDates[i + 1] as string;

    if (i === 0) {
      checkIncheckOutHalfDay[newDate] = {
        checkIn: true,
      };
    }

    if (
      !checkIncheckOutHalfDay[newDate] &&
      bookedDates[i + 1] &&
      getDayDiff(newDate, newDateIncrementOne) > 1
    ) {
      checkIncheckOutHalfDay[newDate] = {
        checkOut: true,
      };
      checkIncheckOutHalfDay[newDateIncrementOne] = {
        checkIn: true,
      };
    }

    if (i === bookedDates.length - 1) {
      checkIncheckOutHalfDay[newDate] = {
        checkOut: true,
      };
    }
  }

  return {
    bookedDates,
    checkIncheckOutHalfDay,
  };
};

const createBookingDatesWithHalfDayDates = (
  checkIncheckOutHalfDay: CheckInCheckOutHalfDay,
  bookingDatesProps: Booking[]
): Booking[] => {
  const bookingDates = new Set() as Set<Booking>;
  let increment = 0 as number;
  const booking = {} as Booking;

  Object.keys(checkIncheckOutHalfDay).forEach((date: string, i: number) => {
    increment = i;

    if (checkIncheckOutHalfDay[date].checkIn) booking.checkInDate = date;
    if (checkIncheckOutHalfDay[date].checkOut) booking.checkOutDate = date;

    if (increment % 2 === 1) {
      bookingDates.add({
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
      });
    }
  });

  return sortDatesObj([
    ...bookingDatesProps,
    ...bookingDates,
  ]) as unknown as Booking[];
};

export const useCreateHalfDayDates = (
  bookingDates: Booking[],
  bookedDatesProps: string[],
  bookingColor: BookingColor,
  formattingFormat: string
): {
  flatBookingDates: FlatBooking[];
  checkIncheckOutHalfDay: CheckInCheckOutHalfDay;
  disabledDates: string[];
  newBookingDates: Booking[];
} => {
  let disabledDates: string[] = [];
  // Set DisabledDates to []
  const flatBookingDates: FlatBooking[] = [];
  // Field DisabledDates whith BookingDates
  const bookingTypeAndDates: {
    [key: string]: string[];
  } = {};

  // Create halfDay dates with booked dates
  const bookedDates: string[] =
    createHalfDayDatesWithBookedDates(bookedDatesProps).bookedDates;
  const checkIncheckOutHalfDay: CheckInCheckOutHalfDay =
    createHalfDayDatesWithBookedDates(bookedDatesProps).checkIncheckOutHalfDay;

  // Create bookingDates with halfDay
  const newBookingDates: Booking[] = createBookingDatesWithHalfDayDates(
    checkIncheckOutHalfDay,
    bookingDates
  );

  bookingDates.forEach((booking: Booking) => {
    checkIncheckOutHalfDay[booking.checkInDate] = {
      checkIn: true,
    };
    checkIncheckOutHalfDay[booking.checkOutDate] = {
      checkOut: true,
    };

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

  // Field DisabledDates whith BookedDates
  disabledDates = flatBookingDates.map((b) => b.value).flat();
  disabledDates.push(...bookedDates);
  disabledDates = sortDates(disabledDates);

  return {
    flatBookingDates,
    checkIncheckOutHalfDay,
    disabledDates,
    newBookingDates,
  };
};
