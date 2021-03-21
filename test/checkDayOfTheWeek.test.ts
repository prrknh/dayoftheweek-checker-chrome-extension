import DayOfTheWeekChecker from "../src/lib/DayOfTheWeekChecker";

const ng = {
  isInvalid: true,
  invalidDayOfTheWeek: "水",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
  targetDateStr: "2021/03/08",
};
const ok = {
  isInvalid: false,
  invalidDayOfTheWeek: "月",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
  targetDateStr: "2021/03/08",
};

test("test", (): void => {
  expect(
    new DayOfTheWeekChecker(`
      2021/03/08(水)
      2021/03/08(月)
      2021/3/8(水)
      2021/3/8(月)
      2021年03月08日（水）
      2021年03月08日（月）
      2021年3月8日（水）
      2021年3月8日（月）
      `).getFoundList()
  ).toStrictEqual([ng, ok]);
});

test("test without year", (): void => {
  expect(
    new DayOfTheWeekChecker(`
      03/08(水)
      03/08(月)
      `).getFoundList()
  ).toStrictEqual([ng, ok]);
});

test.each([
  [1, new Date(2021, 12 - 1, 5), "2022"],
  [5, new Date(2021, 3 - 1, 5), "2021"],
  [11, new Date(2021, 1 - 1, 5), "2020"],
])("guess year from month", (targetMonth, now, expectedYear) => {
  expect(
    (new DayOfTheWeekChecker("") as any).guessYear(targetMonth, now)
  ).toEqual(expectedYear);
});
