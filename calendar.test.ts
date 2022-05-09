import { format } from "./plugins/day";
import { Calendar } from "./calendar";

test("Should return list of months", () => {
  const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
  const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
  const calendar = new Calendar(startDate, endDate);

  expect(calendar.months.length).toBe(12 * 4);
});

test("Should return checkIn", () => {
  const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
  const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
  const calendar = new Calendar(startDate, endDate);

  const dayDate = new Date();

  calendar.setCheckIn(dayDate);
  expect(calendar.checkIn).toBe(dayDate);

  const days = calendar.months.map((month) => month.days).flat();
  expect(days.find((x) => x.isCheckIn).formatDay).toBe(
    format(dayDate, "YYYY-MM-DD")
  );
});

test("Should return checkOut", () => {
  const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
  const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
  const calendar = new Calendar(startDate, endDate);

  const dayDate = new Date();

  calendar.setCheckOut(dayDate);
  expect(calendar.checkOut).toBe(dayDate);

  const days = calendar.months.map((month) => month.days).flat();
  expect(days.find((x) => x.isCheckOut).formatDay).toBe(
    format(dayDate, "YYYY-MM-DD")
  );
});
