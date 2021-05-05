import Toastify from "toastify-js";
import Checker from "../../lib/checker";

export function loadCssScript() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
  document.head.appendChild(link);
}

export default function showCheckResult(checker: Checker) {
  Toastify({
    text: checker.getHtmlMessage(),
    position: "left",
    backgroundColor: getColor(checker),
  }).showToast();
}

function getColor(checker: Checker): string {
  if (checker.isNotFound()) return "#d0d0d0";
  if (checker.hasInvalid())
    return "linear-gradient(to right, #ff5f6d, #ffc371)";
  return "linear-gradient(to right, #00b09b, #96c93d)";
}
