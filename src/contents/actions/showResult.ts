import Toastify from "toastify-js";
import DayOfTheWeekChecker from "../../lib/DayOfTheWeekChecker";

export default function showCheckResult(checker: DayOfTheWeekChecker) {
  Toastify({
    text: checker.getHtmlMessage(),
    position: "left",
    backgroundColor: getColor(checker),
  }).showToast();
}

function getColor(checker: DayOfTheWeekChecker): string {
  if (checker.getFoundCnt() == 0) return "#d0d0d0";
  if (checker.hasInvalid())
    return "linear-gradient(to right, #ff5f6d, #ffc371)";
  return "linear-gradient(to right, #00b09b, #96c93d)";
}
