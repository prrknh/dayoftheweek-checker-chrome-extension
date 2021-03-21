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
  showCheckResult(checker);
  (e.target as HTMLElement).classList.add(
    `${checker.hasInvalid() ? "invalid" : "valid"}${mark}`
  );
}

function onFocus(e: Event) {
  (e.target as HTMLElement).classList.remove(`invalid${mark}`, `valid${mark}`);
}

function setStyle() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  if (styleElement.sheet) {
    styleElement.sheet?.insertRule(
      `textarea.invalid${mark} {border-color:red; border-width: thick;}`,
      0
    );
    styleElement.sheet?.insertRule(
      `textarea.valid${mark} {border-color:lime; border-width: thick;}`,
      0
    );
  }
}
