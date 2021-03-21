import { format, parse } from "date-fns";

const regExp = new RegExp(
  "(?<year>[0-9]{4})[年\\/](?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（](?<dayoftheweek>[日月火水木金土])[)）]",
  "g"
);
const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

type checkedResult = {
  isInvalid: boolean;
  invalidDayOfTheWeek: string;
  validDayOfTheWeek: string;
  targetDate: Date;
  targetDateStr: string;
};

export default class DayOfTheWeekChecker {
  private readonly foundList: checkedResult[];

  constructor(input: string) {
    const matchDateWithDayOfTheWeeks: IterableIterator<RegExpMatchArray> = input.matchAll(
      regExp
    );

    const list: checkedResult[] = [];
    for (let matched of matchDateWithDayOfTheWeeks) {
      if (!matched.groups) {
        console.warn("no matched groups!");
        this.foundList = [];
        return;
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

    const uniqList: checkedResult[] = [];
    list.forEach((w) => {
      if (
        !uniqList.find(
          (s) =>
            s.targetDateStr === w.targetDateStr &&
            s.invalidDayOfTheWeek === w.invalidDayOfTheWeek
        )
      )
        uniqList.push(w);
    });

    this.foundList = uniqList;
  }

  getHtmlMessage(): string {
    if (this.foundList.length == 0) return "曜日文字列は見つかりませんでした。";
    return this.foundList
      .map((s) => {
        if (s.isInvalid) {
          return `NG: ${s.targetDateStr}は${s.invalidDayOfTheWeek}曜日ではなく${s.validDayOfTheWeek}曜日です`;
        } else {
          return `OK: ${s.targetDateStr}は${s.validDayOfTheWeek}曜日で合ってます`;
        }
      })
      .join("</br>");
  }

  getFoundList(): checkedResult[] {
    return this.foundList;
  }

  getFoundCnt(): number {
    return this.foundList.length;
  }

  hasInvalid(): boolean {
    return this.foundList.filter((s) => s.isInvalid).length > 0;
  }
}
