import showCheckResult from "./actions/showResult";
import listenInput from "./actions/listenInput";

listenInput();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message.id) {
    case "fromContextMenuWithSelectedText":
      sendResponse(showCheckResult(request.message.selectedText));
  }
});
