import CheckedDateString from "./DateString/CheckedDateString";
import DateStringFactory from "./DateString/DateStringFactory";

export const regExp = new RegExp(
  "(?<year>([0-9]{4})?)[年\\/]?(?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（]?(?<dayoftheweek>[日月火水木金土]?)[)）]?",
  "g"
);

export default class Checker {
  private readonly foundList: CheckedDateString[];

  constructor(input: string) {
    const matchDateWithDayOfTheWeeks: IterableIterator<RegExpMatchArray> = input.matchAll(
      regExp
    );

    const list: CheckedDateString[] = [];
    console.log({ matchDateWithDayOfTheWeeks: matchDateWithDayOfTheWeeks });
    for (let matched of matchDateWithDayOfTheWeeks) {
      const dt = DateStringFactory.create(matched);
      if (dt) {
        list.push(dt);
      }
    }

    const uniqList: CheckedDateString[] = [];
    list.forEach((w) => {
      if (!uniqList.find((s) => s.getId() === w.getId())) uniqList.push(w);
    });

    this.foundList = uniqList.sort((a, b) => (a.isInvalid ? -1 : 1));
  }

  public getHtmlMessage(): string {
    if (this.isNotFound()) return "日付文字列は見つかりませんでした。";
    return this.foundList.map((s) => s.getMessage()).join("</br>");
  }

  public getFoundList(): CheckedDateString[] {
    return this.foundList;
  }

  public isNotFound(): boolean {
    return this.foundList.length == 0;
  }

  public hasInvalid(): boolean {
    return this.foundList.filter((s) => s.isInvalid).length > 0;
  }
}
