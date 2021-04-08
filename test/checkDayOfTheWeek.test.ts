import DayOfTheWeekChecker from "../src/lib/DayOfTheWeekChecker";

const ng = {
  isInvalid: true,
  isGuessed: false,
  invalidDayOfTheWeek: "水",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
};
const ok = {
  isInvalid: false,
  isGuessed: false,
  invalidDayOfTheWeek: "月",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
};

test("test", (): void => {
  expect(
    new DayOfTheWeekChecker(`
      2021/03/08(水)
      2021/03/08(月)
      `).getFoundList()
  ).toStrictEqual([ng, ok]);
});

const maybeNg = {
  isInvalid: true,
  isGuessed: true,
  invalidDayOfTheWeek: "水",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
};
const maybeOk = {
  isInvalid: false,
  isGuessed: true,
  invalidDayOfTheWeek: "月",
  validDayOfTheWeek: "月",
  targetDate: new Date(2021, 2, 8),
};

test("test without year", (): void => {
  expect(
    new DayOfTheWeekChecker(`
      03/08(水)
      03/08(月)
      `).getFoundList()
  ).toStrictEqual([maybeNg, maybeOk]);
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
