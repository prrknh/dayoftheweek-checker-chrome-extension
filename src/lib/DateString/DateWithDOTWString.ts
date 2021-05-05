import { format, parse } from "date-fns";
import {
  DateString,
  dayOfWeeks,
  guessYear,
  MatchedWithDOTW,
} from "./DateString";

export class DateWithDOTWString implements DateString {
  invalidDayOfTheWeek: string;
  isInvalid: boolean;
  isGuessed: boolean;
  targetDate: Date;
  validDayOfTheWeek: string;

  constructor(matched: MatchedWithDOTW) {
    const year =
      matched.year !== ""
        ? matched.year
        : guessYear(parseInt(matched.month), new Date());

    const dateFromYMD = parse(
      `${year}-${matched.month}-${matched.date}`,
      "yyyy-MM-dd",
      new Date()
    );
    // if (isNaN(dateFromYMD.getDate())) return;

    const dayOfWeekFromYMD = dayOfWeeks[dateFromYMD.getDay()];

    this.isInvalid = dayOfWeekFromYMD !== matched.dotw;
    this.isGuessed = matched.year === "";
    this.targetDate = dateFromYMD;
    this.invalidDayOfTheWeek = matched.dotw;
    this.validDayOfTheWeek = dayOfWeekFromYMD;
  }

  getId(): string {
    return new Date().getTime().toString();
  }

  getMessage(): string {
    return `
      ${this.isInvalid ? "NG" : "OK"}
                    ${this.isGuessed ? "?:" : ":"}
                      ${
                        this.isGuessed
                          ? `${this.targetDate.getFullYear()}年の`
                          : ""
                      }
            ${format(
              this.targetDate,
              this.isGuessed ? "MM/ddは" : "yyyy/MM/ddは"
            )}
            ${this.isInvalid ? this.invalidDayOfTheWeek + "曜日ではなく" : ""}
            ${this.validDayOfTheWeek}曜日
            ${this.isInvalid ? "です" : "で合ってます"}
            `;
  }
}
