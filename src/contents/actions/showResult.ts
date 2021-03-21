import createFloating from "./createFloating";
import DayOfTheWeekChecker from "../../lib/DayOfTheWeekChecker";

export default function showCheckResult(input: string) {
  const checker = new DayOfTheWeekChecker(input);
  createFloating(
    checker.getHtmlMessage(),
    checker.getFoundCnt() == 0 ? 1 : checker.getFoundCnt()
  );
}
