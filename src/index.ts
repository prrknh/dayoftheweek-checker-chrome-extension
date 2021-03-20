import getInvalidDayOfTheWeekList from "./CheckDayOfTheWeek";

const mark = "markedByCheckedOfTheWeekChromeExtension";

function onChanged(e: Event) {
  const list = getInvalidDayOfTheWeekList(
    (e.target as HTMLTextAreaElement).value
  );
  list.forEach((s) => {
    console.log(
      `${s.targetDateStr}は${s.invalidDayOfTheWeek}ではなく${s.validDayOfTheWeek}です`
    );
  });
  if (list.length > 0) {
    (e.target as HTMLElement).setAttribute("id", mark);
  }
}

export function listen() {
  document.querySelectorAll("textarea").forEach((input) => {
    input.addEventListener("change", (ev) => onChanged(ev));
  });
}

function setStyle() {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  if (styleElement.sheet) {
    styleElement.sheet?.insertRule(
      `textarea#${mark} {border-color:red; border-width: thick;}`,
      0
    );
  }
}

setStyle();
listen();
