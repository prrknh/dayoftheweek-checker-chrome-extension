import { format } from "date-fns";
import CheckedDateString, { MatchedWithDOTW } from "./checkedDateString";
import DateWithoutDOTWString from "./dateWithoutDOTWString";

export default class DateWithDOTWString extends DateWithoutDOTWString {
  private readonly invalidDayOfTheWeek?: string;

  constructor(matched: MatchedWithDOTW) {
    super(matched);

    const isInvalid = this.validDayOfTheWeek !== matched.dotw;
    this.isInvalid = isInvalid;
    if (isInvalid) this.invalidDayOfTheWeek = matched.dotw;
  }

  getMessage(): string {
    return `
            ${this.isInvalid ? "NG: " : "OK: "}
            ${format(
              this.targetDate,
              this.isGuessed
                ? `${this.targetDate.getFullYear()}年のMM月dd日は`
                : "yyyy年MM月dd日は"
            )}
            ${this.isInvalid ? `${this.invalidDayOfTheWeek}曜日ではなく` : ""}
            ${this.validDayOfTheWeek}曜日です
            `;
  }
}
