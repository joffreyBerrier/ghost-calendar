export type TypeBookingFormatted = "other" | "owner" | "option" | "contract";

export type TypeBooking =
  | "Bookings::Admin"
  | "Bookings::Calendar"
  | "Bookings::Clientoption"
  | "Bookings::Contract"
  | "Bookings::External"
  | "Bookings::Owner"
  | "Bookings::Salesoption";

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
  id?: string;
  ownerPrice?: number;
  clientFirstname?: string;
  clientLastname?: string;
  currencyTrigram?: string;
  otherType?: TypeBooking;
  contractId?: string;
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
  id?: string;
  otherType?: TypeBooking;
};

export type ContractInfo = {
  contractId?: string;
  ownerPrice?: number;
  clientFirstname?: string;
  clientLastname?: string;
  currencyTrigram?: string;
};

export type BookingInfo = Array<Required<Period> & ContractInfo>;

export type LocaleType = "fr" | "en" | undefined;

export type BookingColorType = {
  [key: string]: { startEnd: string; beetween: string };
};
