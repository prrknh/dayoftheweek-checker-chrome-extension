import { format, parse } from "date-fns";

const regExp = new RegExp(
  "(?<year>([0-9]{4})?)[年\\/]?(?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（](?<dayoftheweek>[日月火水木金土])[)）]",
  "g"
);
const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

type checkedResult = {
  isInvalid: boolean;
  isGuessed: boolean;
  invalidDayOfTheWeek: string;
  validDayOfTheWeek: string;
  targetDate: Date;
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

      const year =
        matched.groups.year !== ""
          ? matched.groups.year
          : this.guessYear(parseInt(matched.groups.month), new Date());

      const dateFromYMD = parse(
        `${year}-${matched.groups.month}-${matched.groups.date}`,
        "yyyy-MM-dd",
        new Date()
      );
      if (isNaN(dateFromYMD.getDate())) break;

      const dayOfWeekFromYMD = dayOfWeeks[dateFromYMD.getDay()];

      list.push({
        isInvalid: dayOfWeekFromYMD !== matched.groups.dayoftheweek,
        isGuessed: matched.groups.year === "",
        targetDate: dateFromYMD,
        invalidDayOfTheWeek: matched.groups.dayoftheweek,
        validDayOfTheWeek: dayOfWeekFromYMD,
      });
    }

    const uniqList: checkedResult[] = [];
    list.forEach((w) => {
      if (
        !uniqList.find(
          (s) =>
            format(s.targetDate, "yyyyMMdd") ===
              format(w.targetDate, "yyyyMMdd") &&
            s.invalidDayOfTheWeek === w.invalidDayOfTheWeek
        )
      )
        uniqList.push(w);
    });

    this.foundList = uniqList.sort((a, b) => (a.isInvalid ? -1 : 1));
  }

  private guessYear(targetMonth: number, now: Date): string {
    if (Math.abs(now.getMonth() - targetMonth) < 6) {
      return now.getFullYear().toString();
    } else if (now.getMonth() - targetMonth > 0) {
      return (now.getFullYear() + 1).toString();
    } else {
      return (now.getFullYear() - 1).toString();
    }
  }

  public getHtmlMessage(): string {
    if (this.isNotFound()) return "曜日文字列は見つかりませんでした。";
    return this.foundList
      .map((s) => {
        return `
            ${s.isInvalid ? "NG" : "OK"}
            ${s.isGuessed ? "?:" : ":"}
            ${s.isGuessed ? `${s.targetDate.getFullYear()}年の` : ""}
            ${format(s.targetDate, s.isGuessed ? "MM/ddは" : "yyyy/MM/ddは")}
            ${s.isInvalid ? s.invalidDayOfTheWeek + "曜日ではなく" : ""}
            ${s.validDayOfTheWeek}曜日
            ${s.isInvalid ? "です" : "で合ってます"}
            `;
      })
      .join("</br>");
  }

  public getFoundList(): checkedResult[] {
    return this.foundList;
  }

  public isNotFound(): boolean {
    return this.foundList.length == 0;
  }

  public hasInvalid(): boolean {
    return this.foundList.filter((s) => s.isInvalid).length > 0;
  }
}
