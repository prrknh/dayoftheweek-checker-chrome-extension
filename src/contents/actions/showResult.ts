import createFloating from "./createFloating";
import getInvalidDayOfTheWeekList from "../../lib/CheckDayOfTheWeek";

export default function showCheckResult(input: string) {
  const message = getInvalidDayOfTheWeekList(input)
    .map((s) => {
      return `${s.targetDateStr}は${s.invalidDayOfTheWeek}ではなく${s.validDayOfTheWeek}です`;
    })
    .join("</br>");

  createFloating(message);
}
