import { DateWithDOTWString } from "./DateWithDOTWString";
import { DateWithoutDOTWString } from "./DateWithoutDOTWString";
import CheckedDateString from "./CheckedDateString";

export default class DateStringFactory {
  static create(matched: RegExpMatchArray): CheckedDateString | undefined {
    if (!matched.groups) return undefined;

    return matched.groups.dayoftheweek
      ? new DateWithDOTWString({
          month: matched.groups.month,
          dotw: matched.groups.dayoftheweek,
          date: matched.groups.date,
          year: matched.groups.year,
        })
      : new DateWithoutDOTWString({
          year: matched.groups.year,
          date: matched.groups.date,
          month: matched.groups.month,
        });
  }
}
