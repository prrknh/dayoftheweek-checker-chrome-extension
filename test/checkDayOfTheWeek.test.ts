import getInvalidDayOfTheWeekList from "../src/lib/CheckDayOfTheWeek";

test("test", (): void => {
  const r = {
    invalidDayOfTheWeek: "水",
    validDayOfTheWeek: "月",
    targetDate: new Date(2021, 2, 8),
    targetDateStr: "2021/03/08",
  };
  expect(
    getInvalidDayOfTheWeekList(`
      2021/03/08(水)
      2021/03/08(月)
      2021/3/8(水)
      2021/3/8(月)
      2021年03月08日（水）
      2021年03月08日（月）
      2021年3月8日（水）
      2021年3月8日（月）
      `)
  ).toStrictEqual([r, r, r, r]);
});
