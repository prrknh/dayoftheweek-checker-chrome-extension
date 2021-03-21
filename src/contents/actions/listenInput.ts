import getInvalidDayOfTheWeekList from "../../lib/CheckDayOfTheWeek";
import createFloating from "./createFloating";

const mark = "markedByCheckedOfTheWeekChromeExtension";

export default function listenInput() {
  setStyle();
  document.querySelectorAll("textarea").forEach((input) => {
    input.addEventListener("focusout", (ev) => onFocusOut(ev));
    input.addEventListener("focus", (ev) => onFocus(ev));
  });
}

function onFocusOut(e: Event) {
  const list = getInvalidDayOfTheWeekList(
    (e.target as HTMLTextAreaElement).value
  );
  if (list.length > 0) {
    const message = list
      .map((s) => {
        return `${s.targetDateStr}は${s.invalidDayOfTheWeek}ではなく${s.validDayOfTheWeek}です`;
      })
      .join("</br>");
    createFloating(message);
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
