import DayOfTheWeekChecker from "../../lib/DayOfTheWeekChecker";
import showCheckResult from "./showResult";

const mark = "markedByCheckedOfTheWeekChromeExtension";

export default function listenInput() {
  setStyle();
  document.querySelectorAll("textarea").forEach((input) => {
    input.addEventListener("focusout", (ev) => onFocusOut(ev));
    input.addEventListener("focus", (ev) => onFocus(ev));
  });
}

function onFocusOut(e: Event) {
  const checker = new DayOfTheWeekChecker(
    (e.target as HTMLTextAreaElement).value
  );
  if (checker.getFoundCnt() > 0) {
    showCheckResult(checker);
    (e.target as HTMLElement).classList.add(mark);
  }
}

function onFocus(e: Event) {
  (e.target as HTMLElement).classList.remove(mark);
}

function setStyle() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  if (styleElement.sheet) {
    styleElement.sheet?.insertRule(
      `textarea.${mark} {border-color:red; border-width: thick;}`,
      0
    );
  }
}
