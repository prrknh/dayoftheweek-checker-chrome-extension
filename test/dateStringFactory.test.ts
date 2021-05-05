import DateWithoutDOTWString, {
  guessYear,
} from "../src/lib/dateString/dateWithoutDOTWString";
import DateStringFactory from "../src/lib/dateString/dateStringFactory";
import DateWithDOTWString from "../src/lib/dateString/dateWithDOTWString";

test("handle invalid", () => {
  expect(DateStringFactory.create({} as RegExpMatchArray)).toBe(undefined);
  expect(DateStringFactory.create({ groups: {} } as RegExpMatchArray)).toBe(
    undefined
  );
  expect(
    DateStringFactory.create({
      groups: { year: "", month: "02", date: "30" } as unknown,
    } as RegExpMatchArray)
  ).toBe(undefined);
});

test.each([
  ["", "02", "02"],
  ["", "2", "2"],
  ["2021", "02", "02"],
  ["2021", "2", "2"],
])("create DateWithoutDOTW", (year, month, date) => {
  expect(
    DateStringFactory.create(({
      groups: { year: year, month: month, date: date },
    } as unknown) as RegExpMatchArray)
  ).toBeInstanceOf(DateWithoutDOTWString);
});

test.each([
  ["", "02", "02"],
  ["", "2", "2"],
  ["2021", "02", "02"],
  ["2021", "2", "2"],
])("create DateWithDOTW", (year, month, date) => {
  expect(
    DateStringFactory.create(({
      groups: { year: year, month: month, date: date, dotw: "水" },
    } as unknown) as RegExpMatchArray)
  ).toBeInstanceOf(DateWithDOTWString);
});

test.each([
  [1, new Date(2021, 12 - 1, 5), "2022"],
  [5, new Date(2021, 3 - 1, 5), "2021"],
  [11, new Date(2021, 1 - 1, 5), "2020"],
])("guess year from month", (targetMonth, now, expectedYear) => {
  expect(guessYear(targetMonth, now)).toEqual(expectedYear);
});
