import { DateWithoutDOTWString } from "./DateWithoutDOTWString";
import { DateWithDOTWString } from "./DateWithDOTWString";

export const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

export interface DateString {
  getId(): string;
  isInvalid: boolean;
  targetDate: Date;
  isGuessed: boolean;
  validDayOfTheWeek: string;
  getMessage(): string;
}

export interface Matched {
  year?: string;
  month: string;
  date: string;
}
export interface MatchedWithDOTW extends Matched {
  dotw: string;
}

export class DateStringFactory {
  static create(matched: RegExpMatchArray): DateString | undefined {
    console.log({ matched: matched });
    if (!matched.groups) return undefined;
    if (matched.groups.dayoftheweek) {
      return new DateWithDOTWString({
        month: matched.groups.month,
        dotw: matched.groups.dayoftheweek,
        date: matched.groups.date,
        year: matched.groups.year,
      });
    } else {
      return new DateWithoutDOTWString({
        year: matched.groups.year,
        date: matched.groups.date,
        month: matched.groups.month,
      });
    }
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
