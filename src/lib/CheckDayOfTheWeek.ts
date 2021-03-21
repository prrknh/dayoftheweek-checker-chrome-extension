import { format, parse } from "date-fns";

const regExp = new RegExp(
  "(?<year>[0-9]{4})[年\\/](?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（](?<dayoftheweek>[日月火水木金土])[)）]",
  "g"
);
const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

type InvalidDayOfTheWeek = {
  isInvalid: boolean;
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

    list.push({
      isInvalid: dayOfWeekFromYMD !== matched.groups.dayoftheweek,
      invalidDayOfTheWeek: matched.groups.dayoftheweek,
      targetDate: dateFromYMD,
      targetDateStr: format(dateFromYMD, "yyyy/MM/dd"),
      validDayOfTheWeek: dayOfWeekFromYMD,
    });
  }
  return list;
}

export function getHtmlMessage(list: InvalidDayOfTheWeek[]): string {
  if (list.length == 0) return "曜日文字列は見つかりませんでした。";
  return list
    .map((s) => {
      if (s.isInvalid) {
        return `<span style="color: red">NG: ${s.targetDateStr}は${s.invalidDayOfTheWeek}曜日ではなく${s.validDayOfTheWeek}曜日です</span>`;
      } else {
        return `OK: ${s.targetDateStr}は${s.validDayOfTheWeek}曜日で合ってます`;
      }
    })
    .join("</br>");
}
