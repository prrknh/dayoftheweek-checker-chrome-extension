import Checker, { regExp } from "../src/lib/Checker";

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
    new Checker(`
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
    new Checker(`
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
  expect((new Checker("") as any).guessYear(targetMonth, now)).toEqual(
    expectedYear
  );
});

test.each([
  ["2021/04/01(月)", "2021", "04", "01", "月"],
  ["04/01(月)", "", "04", "01", "月"],
  ["04/01", "", "04", "01", ""],
])("regex test", (input, year, month, date, dotw) => {
  const matchDateWithDayOfTheWeeks = [...input.matchAll(regExp)];
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.year).toEqual(year);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.month).toEqual(month);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.date).toEqual(date);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.dayoftheweek).toEqual(dotw);
});
