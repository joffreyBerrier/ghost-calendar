export type TypeBookingFormatted = "other" | "owner" | "option" | "contract";

export type DayType = {
  bookingType?: TypeBookingFormatted;
  day?: string;
  dayNumber?: string;
  isBooking?: boolean;
  isRangeDate?: boolean;
  isCurrentDay?: boolean;
  isEndDate?: boolean;
  isPastDay?: boolean;
  isStartDate?: boolean;
  checkInTime?: number;
  checkOutTime?: number;
  period?: { checkIn: string; checkOut: string };
  isHalfDay?: boolean;
  bookingColor?: string;
};

export type MonthType = {
  days: DayType[];
  id?: string;
  monthKey?: number;
  yearKey?: number;
  monthName?: string;
};

export type Period = {
  startDate?: string | undefined;
  endDate?: string | undefined;
  type?: TypeBookingFormatted | undefined;
  checkInTime?: number;
  checkOutTime?: number;
};

export type LocaleType = "fr" | "en" | undefined;
