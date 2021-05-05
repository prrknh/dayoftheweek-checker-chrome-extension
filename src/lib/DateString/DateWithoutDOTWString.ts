import { format, parse } from "date-fns";
import CheckedDateString, { Matched } from "./CheckedDateString";

const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

export class DateWithoutDOTWString implements CheckedDateString {
  public isInvalid = false;

  protected readonly isGuessed: boolean;
  protected readonly targetDate: Date;
  protected readonly validDayOfTheWeek: string;

  constructor(matched: Matched) {
    this.isGuessed = matched.year === "";
    const year = this.isGuessed
      ? guessYear(parseInt(matched.month), new Date())
      : matched.year;

    const dateFromYMD = parse(
      `${year}-${matched.month}-${matched.date}`,
      "yyyy-MM-dd",
      new Date()
    );
    this.targetDate = dateFromYMD;
    this.validDayOfTheWeek = dayOfWeeks[dateFromYMD.getDay()];
  }

  getId(): string {
    return "";
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

function guessYear(targetMonth: number, now: Date): string {
  if (targetMonth > 12) return now.getFullYear().toString();
  if (Math.abs(now.getMonth() - targetMonth) < 6) {
    return now.getFullYear().toString();
  } else if (now.getMonth() - targetMonth > 0) {
    return (now.getFullYear() + 1).toString();
  } else {
    return (now.getFullYear() - 1).toString();
  }
}
