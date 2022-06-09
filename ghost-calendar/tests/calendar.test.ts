import Calendar from "../core/Calendar";
import { CalendarPresenter } from "../core/CalendarPresenter";
import { Period } from "../core/helpers/types";

const Periods: Required<Period>[] = [
  {
    startDate: "2022-06-01",
    endDate: "2022-06-07",
    type: "other",
    checkInTime: 17,
    checkOutTime: 10,
  },
];

describe("Calendar", () => {
  const presenter = new CalendarPresenter();
  const calendar = new Calendar(12, Periods);
  calendar.build(presenter);

  const presenterB = new CalendarPresenter();
  const calendarB = new Calendar(12, Periods);
  calendarB.build(presenterB);

  const presenterC = new CalendarPresenter();
  const calendarC = new Calendar(12, Periods);
  calendarC.build(presenterC);

  const presenterD = new CalendarPresenter();
  const calendarD = new Calendar(12, Periods);
  calendarD.build(presenterD);

  const presenterE = new CalendarPresenter();
  const calendarE = new Calendar(12, Periods);
  calendarE.build(presenterE);

  test("Should not return start date if selected day is start date", () => {
    calendar.setPeriod(
      presenter,
      {
        day: "2022-11-22",
        dayNumber: "22",
        isCurrentDay: false,
        isStartDate: true,
        isBooking: true,
      },
      "",
      ""
    );

    presenter.subscribeVM((vm) => {
      expect(vm.startDate).toBe("");
    });
  });

  test("Should not return start date if selected day is booking date", () => {
    calendar.setPeriod(
      presenter,
      {
        day: "2022-11-22",
        dayNumber: "22",
        isCurrentDay: false,
        isBooking: true,
      },
      "",
      ""
    );

    presenter.subscribeVM((vm) => {
      expect(vm.startDate).toBe("");
    });
  });

  test("Should not return start date if selected day is a disable date", () => {
    calendar.setPeriod(
      presenter,
      {
        day: "2022-11-22",
        dayNumber: "22",
        isCurrentDay: false,
        isPastDay: true,
      },
      "",
      ""
    );

    presenter.subscribeVM((vm) => {
      expect(vm.startDate).toBe("");
    });
  });

  test("Should return start date if selected day is a end date", () => {
    const presenterT = new CalendarPresenter();
    const calendarT = new Calendar(12, Periods);

    calendarT.build(presenterT);

    calendarT.setPeriod(
      presenterT,
      {
        day: "2022-11-22",
        dayNumber: "22",
        isCurrentDay: false,
        isBooking: true,
        isEndDate: true,
      },
      "",
      ""
    );

    presenterT.subscribeVM((vm) => {
      expect(vm.startDate).toBe("2022-11-22");
    });
  });

  test("Should change start date if selected day is a past date", () => {
    presenterB.displayStartDate("2022-11-22");

    calendarB.setPeriod(
      presenterB,
      {
        day: "2022-11-21",
        dayNumber: "21",
        isCurrentDay: false,
      },
      "2022-11-22",
      ""
    );

    presenterB.subscribeVM((vm) => {
      expect(vm.startDate).toBe("2022-11-21");
    });
  });

  test("Should not change start date if selected day is a future date", () => {
    presenterC.displayStartDate("2022-11-22");

    calendarC.setPeriod(
      presenterC,
      {
        day: "2022-11-24",
        dayNumber: "21",
        isCurrentDay: false,
      },
      "2022-11-22",
      ""
    );

    presenterC.subscribeVM((vm) => {
      expect(vm.startDate).toBe("2022-11-22");
    });
  });

  test("Should return end date if selected day is a future date", () => {
    presenterD.displayStartDate("2022-11-22");

    calendarD.setPeriod(
      presenterD,
      {
        day: "2022-11-24",
        dayNumber: "21",
        isCurrentDay: false,
      },
      "2022-11-22",
      ""
    );

    presenterD.subscribeVM((vm) => {
      expect(vm.startDate).toBe("2022-11-22");
      expect(vm.endDate).toBe("2022-11-24");
    });
  });

  test("Should notify if start day and end day is completed", () => {
    presenterE.displayStartDate("2022-11-22");

    calendarE.setPeriod(
      presenterE,
      {
        day: "2022-11-22",
        dayNumber: "21",
        isCurrentDay: false,
      },
      "2022-11-22",
      ""
    );

    presenterE.displayEndDate("2022-11-24", "2022-11-22");

    calendarE.setPeriod(
      presenterE,
      {
        day: "2022-11-24",
        dayNumber: "21",
        isCurrentDay: false,
      },
      "2022-11-22",
      "2022-11-24"
    );

    presenterE.subscribeVM((vm) => {
      expect(vm.startDate).toBe("2022-11-24");
      expect(vm.endDate).toBe("2022-11-24");
    });
  });
});
