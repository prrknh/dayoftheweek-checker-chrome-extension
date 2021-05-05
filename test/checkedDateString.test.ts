import DateWithoutDOTWString from "../src/lib/dateString/dateWithoutDOTWString";
import DateWithDOTWString from "../src/lib/dateString/dateWithDOTWString";

test("construct DateWithoutDOTWString with year", (): void => {
  const t = new DateWithoutDOTWString({
    year: "2021",
    month: "02",
    date: "28",
  });
  expect(t.isInvalid).toBe(false);
  expect((t as any).isGuessed).toBe(false);
  expect((t as any).targetDate.valueOf()).toEqual(
    new Date(2021, 2 - 1, 28, 0, 0, 0).valueOf()
  );
  expect((t as any).validDayOfTheWeek).toBe("日");
});

test("construct DateWithoutDOTWString without year", (): void => {
  const t = new DateWithoutDOTWString({
    year: "",
    month: "02",
    date: "28",
  });
  expect(t.isInvalid).toBe(false);
  expect((t as any).isGuessed).toBe(true);
});

test("construct DateWithDOTWString (valid)", (): void => {
  const t = new DateWithDOTWString({
    year: "2021",
    month: "02",
    date: "28",
    dotw: "日",
  });
  expect(t.isInvalid).toBe(false);
  expect((t as any).isGuessed).toBe(false);
  expect((t as any).targetDate.valueOf()).toEqual(
    new Date(2021, 2 - 1, 28, 0, 0, 0).valueOf()
  );
  expect((t as any).validDayOfTheWeek).toBe("日");
  expect((t as any).invalidDayOfTheWeek).toBe(undefined);
});

test("construct DateWithDOTWString (invalid)", (): void => {
  const t = new DateWithDOTWString({
    year: "2021",
    month: "02",
    date: "28",
    dotw: "月",
  });
  expect(t.isInvalid).toBe(true);
  expect((t as any).isGuessed).toBe(false);
  expect((t as any).targetDate.valueOf()).toEqual(
    new Date(2021, 2 - 1, 28, 0, 0, 0).valueOf()
  );
  expect((t as any).validDayOfTheWeek).toBe("日");
  expect((t as any).invalidDayOfTheWeek).toBe("月");
});
