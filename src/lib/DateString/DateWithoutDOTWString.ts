import { format, parse } from "date-fns";
import { DateString, dayOfWeeks, guessYear, Matched } from "./DateString";

export class DateWithoutDOTWString implements DateString {
  isGuessed: boolean;
  targetDate: Date;
  isInvalid: boolean;
  validDayOfTheWeek: string;

  constructor(matched: Matched) {
    this.isGuessed = matched.year == "";
    const year =
      matched.year !== ""
        ? matched.year
        : guessYear(parseInt(matched.month), new Date());

    const dateFromYMD = parse(
      `${year}-${matched.month}-${matched.date}`,
      "yyyy-MM-dd",
      new Date()
    );
    this.targetDate = dateFromYMD;
    this.isInvalid = false;
    this.validDayOfTheWeek = dayOfWeeks[dateFromYMD.getDay()];
  }

  getId(): string {
    return "";
  }

  getMessage(): string {
    return `
       ${
         this.isGuessed
           ? format(this.targetDate, "yyyy年のMM月dd日")
           : format(this.targetDate, "yyyy年M月d日")
       }=> ${this.validDayOfTheWeek}曜日
    `;
  }
}
