import { format, parse } from "date-fns";

const regExp = new RegExp(
  "(?<year>[0-9]{4})[年\\/](?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（](?<dayoftheweek>[日月火水木金土])[)）]",
  "g"
);
const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

type InvalidDayOfTheWeek = {
  invalidDayOfTheWeek: string;
  validDayOfTheWeek: string;
  targetDate: Date;
  targetDateStr: string;
};

export default function getInvalidDayOfTheWeekList(
  text: string
): InvalidDayOfTheWeek[] {
  const matchDateWithDayOfTheWeeks: IterableIterator<RegExpMatchArray> = text.matchAll(
    regExp
  );

  const list: InvalidDayOfTheWeek[] = [];
  for (let matched of matchDateWithDayOfTheWeeks) {
    if (!matched.groups) {
      console.warn("no matched groups!");
      return [];
    }

    const dateFromYMD = parse(
      `${matched.groups.year}-${matched.groups.month}-${matched.groups.date}`,
      "yyyy-MM-dd",
      new Date()
    );
    const dayOfWeekFromYMD = dayOfWeeks[dateFromYMD.getDay()];

    if (dayOfWeekFromYMD !== matched.groups.dayoftheweek) {
      list.push({
        invalidDayOfTheWeek: matched.groups.dayoftheweek,
        targetDate: dateFromYMD,
        targetDateStr: format(dateFromYMD, "yyyy/MM/dd"),
        validDayOfTheWeek: dayOfWeekFromYMD,
      });
    }
  }
  return list;
}
