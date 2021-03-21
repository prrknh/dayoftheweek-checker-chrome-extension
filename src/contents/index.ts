import showCheckResult from "./actions/showResult";
import listenInput from "./actions/listenInput";
import DayOfTheWeekChecker from "../lib/DayOfTheWeekChecker";

listenInput();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message.id) {
    case "fromContextMenuWithSelectedText":
      sendResponse(
        showCheckResult(new DayOfTheWeekChecker(request.message.selectedText))
      );
  }
});
