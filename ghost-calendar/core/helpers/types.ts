export type TypeBookingFormatted = "other" | "owner" | "option" | "contract";

export type TypeBooking =
  | "Bookings::Admin"
  | "Bookings::Calendar"
  | "Bookings::ClientOption"
  | "Bookings::Contract"
  | "Bookings::External"
  | "Bookings::Owner"
  | "Bookings::SalesOption";

export type DayType = {
  bookingColor?: string;
  bookingType?: TypeBookingFormatted;
  checkInTime?: number;
  checkOutTime?: number;
  clientFirstname?: string;
  clientLastname?: string;
  contractId?: string;
  currencyTrigram?: string;
  day?: string;
  dayNumber?: string;
  id?: string;
  isBooking?: boolean;
  isCurrentDay?: boolean;
  isEndDate?: boolean;
  isHalfDay?: boolean;
  isManualySignedContract?: boolean;
  isPastDay?: boolean;
  isRangeDate?: boolean;
  isSelectedDate?: boolean;
  isStartDate?: boolean;
  otherType?: TypeBooking;
  ownerPrice?: number;
  ownerPrivateToken?: string | null;
  ownerUploadYousignFileToken?: string | null;
  period?: { checkIn: string; checkOut: string };
  privateNote?: string;
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
  clientFirstname?: string;
  clientLastname?: string;
  contractId?: string;
  currencyTrigram?: string;
  isManualySignedContract?: boolean;
  ownerPrice?: number;
  ownerPrivateToken?: string | null;
  ownerUploadYousignFileToken?: string | null;
};

export type OwnerInfo = {
  privateNote?: string;
};

export type BookingInfo = Array<Required<Period> & ContractInfo & OwnerInfo>;

export type LocaleType = "fr" | "en" | undefined;

export type BookingColorType = {
  [key: string]: { startEnd: string; beetween: string };
};
