import CheckedDateString from "./checkedDateString";
import DateWithDOTWString from "./dateWithDOTWString";
import DateWithoutDOTWString from "./dateWithoutDOTWString";

export default class DateStringFactory {
  static create(matched: RegExpMatchArray): CheckedDateString | undefined {
    if (!matched.groups) return undefined;
    if (!matched.groups.month || !matched.groups.date) return undefined;

    let checked: CheckedDateString;
    try {
      checked = matched.groups.dotw
        ? new DateWithDOTWString({
            month: matched.groups.month,
            dotw: matched.groups.dotw,
            date: matched.groups.date,
            year: matched.groups.year,
          })
        : new DateWithoutDOTWString({
            year: matched.groups.year,
            date: matched.groups.date,
            month: matched.groups.month,
          });
    } catch (e) {
      console.log(e.message);
      return undefined;
    }
    return checked;
  }
}
