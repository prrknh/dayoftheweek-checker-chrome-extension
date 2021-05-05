export default interface CheckedDateString {
  equals(obj: CheckedDateString): boolean;
  getMessage(): string;
  isInvalid: boolean;
}

export interface Matched {
  year?: string;
  month: string;
  date: string;
}

export interface MatchedWithDOTW extends Matched {
  dotw: string;
}
