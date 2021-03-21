import createFloating from "./createFloating";
import getInvalidDayOfTheWeekList, {
  getHtmlMessage,
} from "../../lib/CheckDayOfTheWeek";

export default function showCheckResult(input: string) {
  const list = getInvalidDayOfTheWeekList(input);
  const message = getHtmlMessage(list);
  createFloating(message, list.length == 0 ? 1 : list.length);
}
