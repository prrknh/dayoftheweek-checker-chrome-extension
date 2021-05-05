import Checker, { regExp } from "../src/lib/checker";
import CheckedDateString from "../src/lib/dateString/checkedDateString";

test("can get foundList", (): void => {
  const checker = new Checker("");
  Object.defineProperty(checker, "foundList", {
    value: [{ id: 1 }, { id: 2 }],
  });
  expect(checker.getFoundList()).toStrictEqual([{ id: 1 }, { id: 2 }]);
});

test.each([
  [[], true],
  [[{ isInvalid: false }] as CheckedDateString[], false],
  [[{ isInvalid: false }, { isInvalid: false }] as CheckedDateString[], false],
])("check isNotFound method", (list: CheckedDateString[], result: boolean) => {
  const checker = new Checker("");
  Object.defineProperty(checker, "foundList", {
    value: list,
  });
  expect(checker.isNotFound()).toStrictEqual(result);
});

test.each([
  [[], false],
  [[{ isInvalid: false }, { isInvalid: false }] as CheckedDateString[], false],
  [[{ isInvalid: true }, { isInvalid: false }] as CheckedDateString[], true],
  [[{ isInvalid: true }, { isInvalid: true }] as CheckedDateString[], true],
])("check hasInvalid method", (list: CheckedDateString[], result: boolean) => {
  const checker = new Checker("");
  Object.defineProperty(checker, "foundList", {
    value: list,
  });
  expect(checker.hasInvalid()).toStrictEqual(result);
});

test.each([
  ["2021/04/01(月)", "2021", "04", "01", "月"],
  ["2021-04-01 (月)", "2021", "04", "01", "月"],
  ["04-01", "", "04", "01", ""],
  ["2021-4-1", "2021", "4", "1", ""],
  ["04/01(月)", "", "04", "01", "月"],
  ["04/01", "", "04", "01", ""],
])("regex test", (input, year, month, date, dotw) => {
  const matchDateWithDayOfTheWeeks = [...input.matchAll(regExp)];
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.year).toEqual(year);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.month).toEqual(month);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.date).toEqual(date);
  expect(matchDateWithDayOfTheWeeks[0]?.groups?.dotw).toEqual(dotw);
});
