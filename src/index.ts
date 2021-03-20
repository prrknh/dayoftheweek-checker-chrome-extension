import getInvalidDayOfTheWeekList from "./CheckDayOfTheWeek";

function onChanged(e: Event) {
  getInvalidDayOfTheWeekList((e.target as HTMLTextAreaElement).value).forEach(
    (s) => {
      console.log(
        `${s.targetDateStr}は${s.invalidDayOfTheWeek}ではなく${s.validDayOfTheWeek}です`
      );
    }
  );
}

export function listen() {
  document.querySelectorAll("textarea").forEach((input) => {
    input.addEventListener("change", (ev) => onChanged(ev));
  });
}

listen();
