import { format, parse } from "date-fns";
import CheckedDateString, { Matched } from "./checkedDateString";

const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

export default class DateWithoutDOTWString implements CheckedDateString {
  public isInvalid = false;

  protected readonly isGuessed: boolean;
  protected readonly targetDate: Date;
  protected readonly validDayOfTheWeek: string;

  constructor(matched: Matched) {
    this.isGuessed = matched.year === "";
    const month = parseInt(matched.month);
    if (month > 12) throw new Error(`月が不正でした=> ${matched.month}`);
    const year = this.isGuessed ? guessYear(month, new Date()) : matched.year;

    const dateFromYMD = parse(
      `${year}-${matched.month}-${matched.date}`,
      "yyyy-MM-dd",
      new Date()
    );
    if (isNaN(dateFromYMD.getDate()))
      throw new Error(`日付を不正でした=>${matched.month}/${matched.date}`);

    this.targetDate = dateFromYMD;
    this.validDayOfTheWeek = dayOfWeeks[dateFromYMD.getDay()];
  }

  equals(obj: CheckedDateString): boolean {
    return obj.getMessage() === this.getMessage();
  }

  getMessage(): string {
    return `
       ${format(
         this.targetDate,
         this.isGuessed ? "yyyy年のMM月dd日" : "yyyy年M月d日"
       )}=> ${this.validDayOfTheWeek}曜日
    `;
  }
}

export function guessYear(targetMonth: number, now: Date): string {
  if (targetMonth > 12) return now.getFullYear().toString();
  if (Math.abs(now.getMonth() - targetMonth) < 6) {
    return now.getFullYear().toString();
  } else if (now.getMonth() - targetMonth > 0) {
    return (now.getFullYear() + 1).toString();
  } else {
    return (now.getFullYear() - 1).toString();
  }
}
