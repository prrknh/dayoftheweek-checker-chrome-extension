import { format } from "date-fns";
import { MatchedWithDOTW } from "./CheckedDateString";
import { DateWithoutDOTWString } from "./DateWithoutDOTWString";

export class DateWithDOTWString extends DateWithoutDOTWString {
  private readonly invalidDayOfTheWeek?: string;

  constructor(matched: MatchedWithDOTW) {
    super(matched);
    const isInvalid = this.validDayOfTheWeek !== matched.dotw;
    this.isInvalid = isInvalid;
    if (isInvalid) this.invalidDayOfTheWeek = matched.dotw;
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
