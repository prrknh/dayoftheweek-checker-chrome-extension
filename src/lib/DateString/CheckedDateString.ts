export default interface CheckedDateString {
  getId(): string;
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
