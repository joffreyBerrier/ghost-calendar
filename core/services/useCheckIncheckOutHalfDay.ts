import type { Booking, CheckInCheckOutHalfDay } from "../types";
import { getDayDiff, sortDates } from "../helpers";

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

export const useCheckIncheckOutHalfDay = (
  bookingDates: Booking[],
  bookedDatesProps: string[]
): CheckInCheckOutHalfDay => {
  const checkIncheckOutHalfDay: CheckInCheckOutHalfDay =
    createHalfDayDatesWithBookedDates(bookedDatesProps).checkIncheckOutHalfDay;

  bookingDates.forEach((booking: Booking) => {
    checkIncheckOutHalfDay[booking.checkInDate] = {
      checkIn: true,
    };
    checkIncheckOutHalfDay[booking.checkOutDate] = {
      checkOut: true,
    };
  });

  return checkIncheckOutHalfDay;
};
