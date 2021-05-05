import Checker from "../../lib/checker";
import showCheckResult from "./showResult";
import { browser } from "webextension-polyfill-ts";

const mark = "markedByCheckedOfTheWeekChromeExtension";

// check setting, then do nothing if disabled.
export default function listenInput() {
  browser.storage.local
    .get(["disabledAutoCheck", "onlyWhiteList", "whiteList"])
    .then((ob) => {
      if (ob.disabledAutoCheck) return;
      if (ob.onlyWhiteList && ob.whiteList.indexOf(location.hostname) < 0)
        return;

      setStyle();
      document.querySelectorAll("textarea").forEach((input) => {
        input.addEventListener("focusout", (ev) => onFocusOut(ev));
        input.addEventListener("focus", (ev) => onFocus(ev));
      });
    });
}

function onFocusOut(e: Event) {
  const checker = new Checker((e.target as HTMLTextAreaElement).value);

  showCheckResult(checker);

  if (checker.isNotFound()) {
    (e.target as HTMLElement).classList.remove(
      `invalid${mark}`,
      `valid${mark}`
    );
  } else {
    (e.target as HTMLElement).classList.add(
      `${checker.hasInvalid() ? "invalid" : "valid"}${mark}`
    );
  }
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
