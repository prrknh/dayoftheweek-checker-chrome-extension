import { DateString, DateStringFactory } from "./DateString/DateString";

export const regExp = new RegExp(
  "(?<year>([0-9]{4})?)[年\\/]?(?<month>[0-9]{1,2})[月\\/](?<date>[0-9]{1,2})日?[s]?[(（]?(?<dayoftheweek>[日月火水木金土]?)[)）]?",
  "g"
);

export default class Checker {
  private readonly foundList: DateString[];

  constructor(input: string) {
    const matchDateWithDayOfTheWeeks: IterableIterator<RegExpMatchArray> = input.matchAll(
      regExp
    );

    const list: DateString[] = [];
    console.log({ matchDateWithDayOfTheWeeks: matchDateWithDayOfTheWeeks });
    for (let matched of matchDateWithDayOfTheWeeks) {
      const dt: DateString | undefined = DateStringFactory.create(matched);
      if (dt) {
        list.push(dt);
      }
    }

    console.log({ list: list });

    const uniqList: DateString[] = [];
    list.forEach((w) => {
      if (!uniqList.find((s) => s.getId() === w.getId())) uniqList.push(w);
    });

    this.foundList = uniqList.sort((a, b) => (a.isInvalid ? -1 : 1));
  }

  public getHtmlMessage(): string {
    if (this.isNotFound()) return "曜日文字列は見つかりませんでした。";
    return this.foundList.map((s) => s.getMessage()).join("</br>");
  }

  public getFoundList(): DateString[] {
    return this.foundList;
  }

  public isNotFound(): boolean {
    return this.foundList.length == 0;
  }

  public hasInvalid(): boolean {
    return this.foundList.filter((s) => s.isInvalid).length > 0;
  }
}
