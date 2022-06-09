import Day from "../Day";

describe("Day", () => {
  test("Should return full date", () => {
    const day = new Day(new Date("2022-05-18")).getDate().build();

    expect(day).toEqual({ day: "2022-05-18" });
  });

  test("Should return number of day", () => {
    const day = new Day(new Date("2022-05-18")).getDayNumber().build();

    expect(day).toEqual({ dayNumber: "18" });
  });

  test("Should notify if day is current day", () => {
    const day = new Day(new Date()).isCurrentDay(new Date()).build();

    expect(day).toEqual({ isCurrentDay: true });
  });

  test("Should not notify if day is not current day", () => {
    const day = new Day(new Date())
      .isCurrentDay(new Date("2020-01-01"))
      .build();

    expect(day).toEqual({});
  });

  test("Should notify if day is past", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isPast(new Date())
      .build();

    expect(day).toEqual({ day: "2022-05-17", isPastDay: true });
  });

  test("Should not notify day is undefined", () => {
    const day = new Day(new Date("2022-05-17")).isPast(new Date()).build();

    expect(day).toEqual({});
  });

  test("Should notify if day is a start date", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isStartDate("2022-05-17")
      .build();

    expect(day).toEqual({ day: "2022-05-17", isStartDate: true });
  });

  test("Should not notify if day is a start date if day is undefined", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isStartDate(undefined)
      .build();

    expect(day).toEqual({ day: "2022-05-17" });
  });

  test("Should notify if day is a start end", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isEndDate("2022-05-17")
      .build();

    expect(day).toEqual({ day: "2022-05-17", isEndDate: true });
  });

  test("Should not notify if day is a end date if day is undefined", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isEndDate(undefined)
      .build();

    expect(day).toEqual({ day: "2022-05-17" });
  });

  test("Should notify marker if start date and and date is defined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setBookingMarker({ startDate: "2022-05-17", endDate: "2022-05-19" })
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      isBookingMarker: true,
    });
  });

  test("Should notify marker if day is not between period", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .setBookingMarker({ startDate: "2022-05-17", endDate: "2022-05-19" })
      .build();

    expect(day).toEqual({
      day: "2022-05-17",
    });
  });

  test("Should not notify marker if period is undefined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setBookingMarker()
      .build();

    expect(day).toEqual({ day: "2022-05-18" });
  });

  test("Should not notify booking if range is undefined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .isBooking(undefined)
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
    });
  });

  test("Should notify if day is booking", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .isBooking([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      isBooking: true,
    });
  });

  test("Should notify if start day is booking", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .isBooking([
        {
          startDate: "2022-05-18",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      isStartDate: true,
      isBooking: true,
    });
  });

  test("Should notify if end day is booking", () => {
    const day = new Day(new Date("2022-05-19"))
      .getDate()
      .isBooking([
        {
          startDate: "2022-05-18",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-19",
      isEndDate: true,
      isBooking: true,
    });
  });

  test("Should notify if day has check in time and check out time", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setCheckInOutTimes([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      checkInTime: 17,
      checkOutTime: 10,
    });
  });

  test("Should notify if start day has check in time and check out time", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isStartDate("2022-05-17")
      .setCheckInOutTimes([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-17",
      isStartDate: true,
      checkInTime: 17,
      checkOutTime: 10,
    });
  });

  test("Should notify if end day has check in time and check out time", () => {
    const day = new Day(new Date("2022-05-19"))
      .getDate()
      .isEndDate("2022-05-19")
      .setCheckInOutTimes([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-19",
      isEndDate: true,
      checkInTime: 17,
      checkOutTime: 10,
    });
  });

  test("Should notify if day has period", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setPeriod([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      period: { checkIn: "2022-05-17", checkOut: "2022-05-19" },
    });
  });

  test("Should notify if start day has period", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isStartDate("2022-05-17")
      .setPeriod([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-17",
      isStartDate: true,
      period: { checkIn: "2022-05-17", checkOut: "2022-05-19" },
    });
  });

  test("Should notify if end day has period", () => {
    const day = new Day(new Date("2022-05-19"))
      .getDate()
      .isEndDate("2022-05-19")
      .setPeriod([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-19",
      isEndDate: true,
      period: { checkIn: "2022-05-17", checkOut: "2022-05-19" },
    });
  });

  test("Should notify if day has booking type", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setBookingType([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
      bookingType: "other",
    });
  });

  test("Should notify if start day has booking type", () => {
    const day = new Day(new Date("2022-05-17"))
      .getDate()
      .isStartDate("2022-05-17")
      .setBookingType([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-17",
      isStartDate: true,
      bookingType: "other",
    });
  });

  test("Should notify if end day has booking type", () => {
    const day = new Day(new Date("2022-05-19"))
      .getDate()
      .isEndDate("2022-05-19")
      .setBookingType([
        {
          startDate: "2022-05-17",
          endDate: "2022-05-19",
          type: "other",
          checkInTime: 17,
          checkOutTime: 10,
        },
      ])
      .build();

    expect(day).toEqual({
      day: "2022-05-19",
      isEndDate: true,
      bookingType: "other",
    });
  });

  test("Should not notify booking type if range is undefined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setBookingType(undefined)
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
    });
  });

  test("Should not notify checkInOutTime type if range is undefined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setCheckInOutTimes(undefined)
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
    });
  });

  test("Should not notify period type if range is undefined", () => {
    const day = new Day(new Date("2022-05-18"))
      .getDate()
      .setPeriod(undefined)
      .build();

    expect(day).toEqual({
      day: "2022-05-18",
    });
  });
});
