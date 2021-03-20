import getInvalidDayOfTheWeekList from "./CheckDayOfTheWeek";

const mark = "markedByCheckedOfTheWeekChromeExtension";

function onFocusOut(e: Event) {
  const list = getInvalidDayOfTheWeekList(
    (e.target as HTMLTextAreaElement).value
  );
  list.forEach((s) => {
    console.log(
      `${s.targetDateStr}は${s.invalidDayOfTheWeek}ではなく${s.validDayOfTheWeek}です`
    );
  });
  if (list.length > 0) {
    (e.target as HTMLElement).classList.add(mark);
  }
}

function onFocus(e: Event) {
  (e.target as HTMLElement).classList.remove(mark);
}

export function listen() {
  document.querySelectorAll("textarea").forEach((input) => {
    input.addEventListener("focusout", (ev) => onFocusOut(ev));
    input.addEventListener("focus", (ev) => onFocus(ev));
  });
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

setStyle();
listen();
