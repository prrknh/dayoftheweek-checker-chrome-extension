import showCheckResult, { loadCssScript } from "./actions/showResult";
import listenInput from "./actions/listenInput";
import Checker from "../lib/Checker";

loadCssScript();
listenInput();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message.id) {
    case "fromContextMenuWithSelectedText":
      sendResponse(showCheckResult(new Checker(request.message.selectedText)));
  }
});
