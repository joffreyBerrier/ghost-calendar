import { Calendar } from "./calendar";

test("Should return a success message if digit code is ok", () => {
  const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
  const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
  const ludo = new Calendar(startDate, endDate);

  console.log(ludo.months.length);
});
